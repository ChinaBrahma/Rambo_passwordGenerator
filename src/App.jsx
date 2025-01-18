import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [Length, setlength] = useState(12)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setpassword] = useState("")
  // useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '~!@#$%^&*()_{}:<>?|/\\'

    for (let i = 1; i <= Length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setpassword(pass)
  },
    [Length, numberAllowed, charAllowed, setpassword]);

  useEffect(() => {
    passwordGenerator()
  },
    [Length, numberAllowed, charAllowed, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);   // it helps limited range of text
    window.navigator.clipboard.writeText(password)
  }, [password])

  return (
    <>
      <div className="w-full h-auto max-w-md mx-auto shadow-md rounded-lg px-4 my-10 text-orange-500 bg-gray-700">
        <h1 className='text-center text-white'>Rambo building password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-3'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-1 px-2'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className='pl-2 pr-2 shrink-0 bg-black' >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2 pb-2'>
          <div className='flex items-center gap-x-1'>
            <input type='range'
              min={6} max={100}
              value={Length}
              className='cursor-pointer'
              onChange={(e) => {
                setlength(e.target.value);
                passwordGenerator()
              }}
            />
            <label>Lengh: {Length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setnumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>

        </div>

      </div>


    </>
  )
}

export default App
