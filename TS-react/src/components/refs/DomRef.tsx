import { useRef, useEffect } from 'react'

// USEFEF IS TO 
export const DomRef = () => {
  const inputRef = useRef<HTMLInputElement>(null!) //  ! is to specify that is will be present
  useEffect(() => {
    inputRef.current.focus()
  }, [])
  return (
    <div>
      <input type='text' ref={inputRef} onChange={()=>
        console.log(inputRef.current, inputRef.current.value)}/>
    </div>
  )
}
