import { AuthLogin } from './AuthLogin'
import { ProfileProps } from './AuthProfile'

// TYPE FOR COMPONENT TYPE
// IMPORT AND SET PROFILEPROPS TO COMPONENT 
type PrivateProps = {
  isLoggedIn: boolean
  component: React.ComponentType<ProfileProps>
}

// component:MyComponent > DESTRUCT"component" from "PrivateProps" AND RENAME AS "MyComponent"
// COMPONENT TO BE UPPERCASE
export const AuthPrivate = ({ isLoggedIn, component:MyComponent }: PrivateProps) => {
  if (isLoggedIn) {
    return <MyComponent name='Vishwas' />
  } else {
    return <AuthLogin />
  }
}
