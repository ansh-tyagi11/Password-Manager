import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {

  const [input, setInput] = useState({ text: "", username: "", password: "" })
  const [display, setDisplay] = useState([])
  const focus = useRef(null)

  useEffect(() => {
    focus.current.focus()
  }, [])

  const saveToLS = (passwordArray) => {
    try {
      localStorage.setItem("display", JSON.stringify(passwordArray))
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("display"));
    if (saved) {
      setDisplay(saved)
    }
  }, [])

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("display"));
    if (saved) {
      setDisplay(saved)
    }
  }, [])

  const handelChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const save = () => {
    if (!input.text || !input.username || !input.password) {
      const missing = [];
      if (!input.text) missing.push("Web Address");
      if (!input.username) missing.push("User ID or Username");
      if (!input.password) missing.push("Password");
      alert(`Please fill: ${missing.join(", ")}`);
      return;
    }

    let newPassword = [...display, { id: uuidv4(), input }]
    setDisplay(newPassword)
    setInput({ text: "", username: "", password: "" })
    saveToLS(newPassword)

  }

  function editEvent(_, id) {
    let edit = display.find((item) => {
      return item.id === id;
    });
    if (edit) {
      setInput(edit.input);
      const newPassword = display.filter((item) => item.id !== id);
      setDisplay(newPassword);
      saveToLS(newPassword);
    }
  }

  const deleteEvent = (_, id) => {
    let c = confirm("Are you sure you want to delete this password?")
    if (!c) return;
    let newPassword = display.filter((item) => {
      return item.id !== id;
    })
    setDisplay(newPassword)
    saveToLS(newPassword)
  }

  const deleteAll = () => {
    let c = confirm("Are you sure you want to delete all these passwords? They cannot be restored once deleted.")
    if (!c) return;
    setDisplay([])
    saveToLS([])
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
          <input className='border w-full rounded-full py-2 px-1.5 my-2.5' ref={focus} type="text" name='text' value={input.text} id="text" placeholder="Enter web address" onChange={handelChange} />
          <div className='flex justify-between md:gap-5 md:flex-row flex-col'>
            <input className='border md:min-w-[30vw] rounded-full py-2 px-1.5 my-2.5' type="username" name="username" id="username" placeholder='User ID or Username' value={input.username} onChange={handelChange} />
            <input className='border md:w-[20vw] rounded-full py-2 px-1.5 my-2.5' type="password" name="password" id="password" placeholder='Password' value={input.password} onChange={handelChange} />
          </div>
          <span className='flex justify-between items-center'>
            <button className='w-[80px] h-[40px] bg-blue-500 rounded-xl text-white text-bold hover:cursor-pointer' onClick={save}>Save</button>
            <button className='w-[80px] h-[40px] bg-red-600 rounded-xl text-white text-bold hover:cursor-pointer' onClick={deleteAll}>Delete All</button>
          </span>
        </div>
        <div><h1 className="text-2xl font-bold my-4">Your Passwords</h1></div>

        {
          display.length === 0 ? (<div className="text-black mt-5">No passwords to show.</div>) : (
            <>

              <table className="table-auto w-full rounded-md mb-10 overflow-x hidden md:block ">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2 w-1/4">Web Address</th>
                    <th className="py-2 w-1/4">Username</th>
                    <th className="py-2 w-1/4">Password</th>
                    <th className="py-2 w-1/4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {display.map((item, id) => (
                    <tr key={id} className="bg-green-100 border-b text-center">
                      <td className="py-2 px-2 border border-white text-center">
                        <a href={item.input.text} target="_blank" rel="noopener noreferrer">{item.input.text}</a>
                      </td>
                      <td className="py-2 px-2 border border-white text-center">
                        <span>{item.input.username}</span>
                      </td>
                      <td className="py-2 px-2 border border-white text-center">
                        <span>{item.input.password}</span>
                      </td>
                      <td className="py-2 px-2 border border-white text-centre justify-between gap-4">
                        <span className="hover:cursor-pointer text-black p-1" onClick={(e) => editEvent(e, item.id)}>Edit</span>
                        <span className="hover:cursor-pointer text-black p-1" onClick={(e) => deleteEvent(e, item.id)}>Delete </span>
                      </td>
                    </tr>
                  )
                  )}
                </tbody>
              </table>

              <div className="md:hidden block">
                {display.map((item, id) => {
                  if (!item || typeof item !== "object" || !("input" in item)) return null;
                  return (
                    <div key={id} className="border rounded-2xl py-2 px-3 my-2.5">
                      <div>
                        <span className="inline-block w-[80px]">URL:</span>
                        <span>{item.input.text}</span>
                      </div>
                      <div>
                        <span className="inline-block w-[80px]">User ID:</span>
                        <span>{item.input.username}</span>
                      </div>
                      <div>
                        <span className="inline-block w-[80px]">Password:</span>
                        <span>{item.input.password}</span>
                      </div>
                      <div className="flex gap-5 justify-between mt-2">
                        <button className="border bg-blue-500 text-white py-0.5 px-4 rounded-[10px]" onClick={(e) => editEvent(e, item.id)}>Edit</button>
                        <button className="border bg-red-600 text-white py-0.5 px-4 rounded-[10px]" onClick={(e) => deleteEvent(e, item.id)}>Delete</button>
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