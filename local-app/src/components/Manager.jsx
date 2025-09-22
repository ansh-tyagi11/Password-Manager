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
    localStorage.setItem("display", JSON.stringify(passwordArray))
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("display"));
    if (saved) {
      setDisplay(saved)
    }
  }, [])

  const handelChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const add = () => {
    if (!input.text || !input.username || !input.password) {
      const missing = [];
      if (!input.text) missing.push("URL");
      if (!input.username) missing.push("Username");
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
      <div className='min-h-[80vh] md:mx-[20vw] mx-[5vw]'>

        <div className='input'>
          <input className='border w-full rounded-full py-2 px-1.5 my-2.5' ref={focus} type="text" name='text' value={input.text} id="text" placeholder="Enter the URL..." onChange={handelChange} />
          <div className='flex justify-between md:gap-5 md:flex-row flex-col'>
            <input className='border md:min-w-[30vw] rounded-full py-2 px-1.5 my-2.5' type="username" name="username" id="username" placeholder='Username' value={input.username} onChange={handelChange} />
            <input className='border md:w-[20vw] rounded-full py-2 px-1.5 my-2.5' type="password" name="password" id="password" placeholder='Password' value={input.password} onChange={handelChange} />
          </div>
          <span className='flex justify-between items-center'>
            <button className='w-[80px] h-[40px] bg-blue-500 rounded-xl text-white text-bold ' onClick={add}>Add</button>
            <button className='w-[80px] h-[40px] bg-red-600 rounded-xl text-white text-bold ' onClick={deleteAll}>Delete All</button>
          </span>
        </div>
        <div className='md:border gap-5 flex justify-between rounded-full py-2 px-1.5 my-2.5'>
          <div className='md:block hidden'>URL</div>
          <div className='md:block hidden'>Username</div>
          <div className='md:block hidden'>Password</div>
          <div className='md:block hidden'></div>
        </div>
        {
          display.map((item, id) => {
            return (

              <div key={id}>
                <div className='md:block hidden'>
                  <div className='border flex justify-between rounded-full py-2 px-1.5 my-2.5'>
                    <div>{item.input.text}</div>
                    <div>{item.input.username}</div>
                    <div>{item.input.password}</div>
                    <div className='flex gap-5'>
                      <button onClick={(e) => editEvent(e, item.id)}>Edit</button>
                      <button onClick={(e) => deleteEvent(e, item.id)}>Delete</button>
                    </div>
                  </div>
                </div>

                <div className='md:hidden block'>
                  <div className='border rounded-2xl py-2 px-1.5 my-2.5'>
                    <div>
                      <span className='inline-block w-[80px]'>URL:</span>
                      <span>{item.input.text}</span>
                    </div>
                    <div>
                      <span className='inline-block w-[80px]'>Username:</span>
                      <span>{item.input.username}</span>
                    </div>
                    <div>
                      <span className='inline-block w-[80px]'>Password:</span>
                      <span>{item.input.password}</span>
                    </div>
                    <div className='flex gap-5 justify-between'>
                      <button className='border bg-blue-500 text-white py-0.5 px-4 rounded-[10px]' onClick={(e) => editEvent(e, item.id)}>Edit</button>
                      <button className='border bg-red-600 text-white py-0.5 px-4 rounded-[10px]' onClick={(e) => deleteEvent(e, item.id)}>Delete</button>
                    </div>
                  </div>
                </div>

              </div>

            )
          })
        }
      </div >
    </>
  )
}

export default Manager
