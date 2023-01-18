import { Login } from './Login'
import { ProfileProps } from './Profile'

// TYPE FOR COMPONENT TYPE
// IMPORT AND SET PROFILEPROPS TO COMPONENT 
type PrivateProps = {
  isLoggedIn: boolean
  component: React.ComponentType<ProfileProps>
}

// component:MyComponent > TO KEEP PROPS IN LOWERCASE
// COMPONENT TO BE UPPERCASE
export const Private = ({ isLoggedIn, component:MyComponent }: PrivateProps) => {
  if (isLoggedIn) {
    return <MyComponent name='Vishwas' />
  } else {
    return <Login />
  }
}
