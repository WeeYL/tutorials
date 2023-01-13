import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'
import { UserContext } from './UserContext'


export const User = () => {
  const userContext = useContext(UserContext)
  const theme = useContext(ThemeContext)
  const handleLogin = () => {
    userContext.setUser({
      name: 'Vishwas',
      email: 'asd@asd.com'
    })
  }
  const handleLogout = () => {
    userContext.setUser(null)
  }
  return (
    <div style={{
        backgroundColor: theme.primary.main,
        color: theme.primary.text
      }}>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
      <div>User name is {userContext.user?.name}</div>
      <>{userContext.printName(userContext.user?.name)}</> {/* only in the html will the function work*/}
      <div>User email is {userContext.user?.email}</div>
    </div>
  )
}
