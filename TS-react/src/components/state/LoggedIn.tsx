import { useState } from 'react'

export const LoggedIn = () => {
  // STATE
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  // FUNCTION
  const handleLogin = () => {
    setIsLoggedIn(true) // SET STATE
  }
  const handleLogout = () => {
    setIsLoggedIn(false) // SET STATE
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User is {isLoggedIn ? 'logged in' : 'logged out'}</div>
    </div>
  )
}
