import { useState } from 'react'

type AuthUser = {
  name: string
  email: string
}

// *******************
// BASIC
// *******************
// export const User = () => {
//   // STATE
//   const [user, setUser] = useState<AuthUser | null>(null)

//   // FUNC
//   const handleLogin = () => {
//     setUser({
//       name: 'Leon',
//       email: 'Leon@example.com'
//     })
//   }
//   const handleLogout = () => {
//     setUser(null)
//   }
//   return (
//     <div>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//       <div>User name is {user?.name}</div> {/* optional chaining */}
//     </div>
//   )
// }

// *******************
// TYPE ASSERTION 
// VALUE IS NEVER NULL, CANNOT LOGOUT SINCE NULL IS UNAVAILABLE, AND NO OPTIONAL CHAINING
// *******************

export const User = () => {
  // STATE
  const [user, setUser] = useState<AuthUser >({} as AuthUser)

  // FUNC
  const handleLogin = () => {
    setUser({
      name: 'Leon',
      email: 'Leon@example.com'
    })
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <div>User name is {user.name}</div> {/* optional chaining */}
    </div>
  )
}


