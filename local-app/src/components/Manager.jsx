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
    try {
      let newPassword = [...display, { id: uuidv4(), input }]
      setDisplay(newPassword)
      setInput({ text: "", username: "", password: "" })
      saveToLS(newPassword)
    } catch (err) {
      console.log(err)
    }

  }

  function editEvent(_, id) {
    let edit = display.find((item) => {
      return item.id === id;
    });
    if (edit) {
      setInput(edit.input);
    }
    saveToLS(edit)
    deleteEvent(_, id);
  }

  const deleteEvent = (_, id) => {
    let newPassword = display.filter((item) => {
      return item.id !== id;
    })
    setDisplay(newPassword)
    saveToLS(newPassword)
  }

  return (
    <>
      <div className='min-h-[80vh] mx-[20vw]'>

        <div className='input'>
          <input className='border w-full rounded-full py-2 px-1.5 my-2.5' ref={focus} type="text" name='text' value={input.text} id="text" placeholder="Enter the URL..." onChange={handelChange} />
          <div className='flex justify-between gap-5'>
            <input className='border min-w-[30vw] rounded-full py-2 px-1.5 my-2.5' type="username" name="username" id="username" placeholder='Username' value={input.username} onChange={handelChange} />
            <input className='border w-[20vw] rounded-full py-2 px-1.5 my-2.5' type="password" name="password" id="password" placeholder='Password' value={input.password} onChange={handelChange} />
          </div>
          <button className='w-[80px] h-[40px] bg-blue-500 rounded-xl text-white text-bold' onClick={add}>Add</button>
        </div>
        <div className='border gap-5 flex justify-between rounded-full py-2 px-1.5 my-2.5'>
          <div>URL</div>
          <div>Username</div>
          <div>Password</div>
          <div></div>
        </div>
        {
          display.map((item, id) => {
            return (

              <div key={id}>

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

            )
          })
        }
      </div>
    </>
  )
}

export default Manager
