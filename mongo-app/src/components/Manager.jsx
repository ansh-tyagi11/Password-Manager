import React, { use } from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

  const [input, setInput] = useState({ text: "", username: "", password: "" })
  const [display, setDisplay] = useState([])
  const focus = useRef(null)

  useEffect(() => {
    focus.current.focus()
  }, [])

  useEffect(() => {
    getPasswords()
  }, [])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setDisplay(passwords)
  }

  const handelChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const save = async () => {
    if (!input.text || !input.username || !input.password) {
      const missing = [];
      if (!input.text) missing.push("Web Address");
      if (!input.username) missing.push("User ID or Username");
      if (!input.password) missing.push("Password");
      alert(`Please fill: ${missing.join(", ")}`);
      return;
    }

    let newEntry = {
      id: uuidv4(),
      input: {
        text: input.text,
        username: input.username,
        password: input.password
      }
    };
    let newPassword = [...display, newEntry]
    setDisplay(newPassword)
    setInput({ text: "", username: "", password: "" })

    const payload = {
      id: newEntry.id,
      input: {
        text: input.text,
        username: input.username,
        password: input.password
      }
    };

    onSubmit(payload)
  }

  const editEvent = async (id) => {
    let edit = display.find((item) => {
      return item.id === id;
    });

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })

    if (edit) {
      setInput(edit.input);
      const newPassword = display.filter((item) => item.id !== id);
      setDisplay(newPassword);
    }
  }

  const deleteEvent = async (id) => {
    let c = confirm("Are you sure you want to delete this password?")
    if (!c) return;
    let newPassword = display.filter((item) => {
      return item.id !== id;
    })
    setDisplay(newPassword)

    await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })

  }

  const handleCopy = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
  }

  const deleteAll = async () => {
    let c = confirm("Are you sure you want to delete all these passwords? They cannot be restored once deleted.")
    if (!c) return;

    try {
      const res = await fetch("http://localhost:3000/deleteAll", {
        method: "DELETE",
      })
      if (!res.ok) {
        alert("Failed to delete all passwords. Please try again.");
        return;
      }
      setDisplay([])
      alert("All passwords deleted successfully.");
    } catch (err) {
      alert("An error occurred while deleting all passwords. Please try again.");
    }
  }

  const safeHref = (raw) => {
    try {
      const url = new URL(raw);
      return (url.protocol === "http:" || url.protocol === "https:") ? raw : "#";
    } catch {
      return "#";
    }
  }

  const onSubmit = async (data) => {

    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    let res = await r.text()
  }

  return (
    <>
      <div className='min-h-[80vh] mx-[5vw] md:pb-[64px] md:px-[160px] md:mb-[18px] pb-[32px] mt-[10px] px-[40px]'>

        <h1 className='font-bold md:text-3xl text-xl text-center'>
          <span className='text-green-500'>&lt;</span>
          <span>MyPassword</span>
          <span className='text-green-500 font-bold md:text-3xl text-center text-xl'>Vault/&gt;</span>
        </h1>

        <div className='text-green-900 md:text-xl text-center'>A simple, secure vault for all your logins.</div>

        <div className='input'>
          <input className='border w-full rounded-full py-2 px-1.5 my-2.5'
            ref={focus}
            type="text"
            name='text'
            value={input.text}
            id="text"
            placeholder="Enter web address"
            onChange={handelChange} />

          <div className='flex justify-between md:gap-5 md:flex-row flex-col'>
            <input className='border md:min-w-[30vw] rounded-full py-2 px-1.5 my-2.5'
              type="username"
              name="username"
              id="username"
              placeholder='User ID or Username'
              value={input.username}
              onChange={handelChange} />

            <input className='border md:w-[20vw] rounded-full py-2 px-1.5 my-2.5'
              type="password"
              name="password"
              id="password"
              placeholder='Password'
              value={input.password}
              onChange={handelChange} />

          </div>

          <span className='group flex justify-between items-center'>

            <button className='flex items-center bg-green-400 w-fit h-[40px] md:py-2 md:px-8 px-4 rounded-full border border-black text-bold group-hover:cursor-pointer hover:bg-green-300' onClick={save}>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover" >
              </lord-icon>
              Save
            </button>

            <button className='w-fit md:py-2 md:px-8 px-4 h-[40px] bg-red-600 rounded-full border border-black text-white text-bold hover:cursor-pointer' onClick={deleteAll}>Delete All</button>

          </span>

        </div>

        <div>
          <h1 className="text-2xl font-bold my-4">Your Passwords</h1>
        </div>

        {
          display.length === 0 ? (<div className="text-black mt-5">No passwords to show.</div>) : (
            <>

              <table className="table-fixed w-full rounded-md mb-10 hidden md:table">
                <colgroup>
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '25%' }} />
                  <col style={{ width: '25%' }} />
                </colgroup>

                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 px-2 text-centre">Web Address</th>
                    <th className="py-2 px-2 text-centre">Username</th>
                    <th className="py-2 px-2 text-centre">Password</th>
                    <th className="py-2 px-2 text-centre">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {display.map((item, id) => {

                    return (
                      <tr key={id} className="bg-green-100 border-b align-top">

                        <td className="relative py-2 px-2 border border-white text-center break-words whitespace-normal max-w-[1px]">
                          <a className="break-words text-centre" href={safeHref(item.input.text)} target="_blank" rel="noopener noreferrer">{item.input.text}</a>
                          <span className='group hover:cursor-pointer absolute right-0' onClick={() => handleCopy(item.input.text)}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                            <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                          </span>
                        </td>

                        <td className="relative  py-2 px-2 border border-white text-center max-w-[150px] break-words">
                          <span className="break-words w-full overflow-hidden text-center whitespace-wrap">{item.input.username}</span>
                          <span className='group hover:cursor-pointer absolute right-0' onClick={() => handleCopy(item.input.username)}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                            <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                          </span>
                        </td>

                        <td className="relative py-2 px-2 border border-white text-center max-w-[150px] break-words">
                          <span className="w-full overflow-hidden text-center whitespace-wrap">{"*".repeat(item.input.password.length)}</span>
                          <span className='group hover:cursor-pointer absolute right-0' onClick={() => handleCopy(item.input.password)}>
                            <lord-icon
                              style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover" >
                            </lord-icon>
                            <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                          </span>
                        </td>

                        <td className="py-2 px-2 border border-white text-center">
                          <span className="relative hover:cursor-pointer text-black p-1 group" onClick={() => editEvent(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/gwlusjdu.json"
                              trigger="hover"
                              style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                            <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Edit</span>
                          </span>

                          <span className="group relative hover:cursor-pointer text-black p-1" onClick={() => deleteEvent(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ "width": "25px", "height": "25px" }}>
                            </lord-icon>
                            <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Delete</span>
                          </span>
                        </td>
                      </tr>
                    )
                  }
                  )}
                </tbody>
              </table>

              <div className="md:hidden block">
                {display.map((item, id) => {

                  return (
                    <div key={id} className="border rounded-2xl py-2 px-3 my-2.5">

                      <div className='relative' >
                        <span className="inline-table w-[100px]">Web Address:</span>
                        <a className="break-all" href={safeHref(item.input.text)} target="_blank" rel="noopener noreferrer">{item.input.text}</a>
                        <span className='hover:cursor-pointer group absolute right-0' onClick={() => handleCopy(item.input.text)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                          <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                        </span>
                      </div>

                      <div className='relative'>
                        <span className="inline-table w-[70px]">User ID:</span>
                        <span className='break-all'>{item.input.username}</span>
                        <span className='hover:cursor-pointer pl-[50px] group absolute right-0' onClick={() => handleCopy(item.input.username)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                          <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                        </span>
                      </div>

                      <div className='relative'>
                        <span className="inline-block w-[70px]">Password:</span>
                        <span className='break-all'>{"*".repeat(item.input.password.length)}</span>
                        <span className='hover:cursor-pointer group pl-[50px] absolute right-0' onClick={() => handleCopy(item.input.password)}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                          <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Copy</span>
                        </span>
                      </div>

                      <div className="flex gap-5 justify-between mt-2">

                        <button className="group relative bg-green-400  py-0.5 px-4 rounded-[10px]" onClick={() => editEvent(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                          <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Edit</span>
                        </button>

                        <button className="group relative bg-red-600 py-0.5 px-4 rounded-[10px]" onClick={() => deleteEvent(item.id)}>
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ "width": "25px", "height": "25px" }}>
                          </lord-icon>
                          <span className='hidden absolute right-[20px] bottom-[30px] group-hover:inline-block ml-1 text-xs bg-gray-200 px-1 rounded'>Delete</span>
                        </button>

                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )
        }
      </div >
    </>
  )
}

export default Manager