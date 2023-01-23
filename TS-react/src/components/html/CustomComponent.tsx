import React from 'react'
import { Greet } from '../props/Greet'

// TYPEOF GETS THE TYPE FROM THE GREET COMPONENT
// export const CustomComponent = (props: React.ComponentProps<typeof Greet>) => {
//   return <div>{props.name}</div>
// }

export const CustomComponent = (props: Omit<React.ComponentProps<typeof Greet>,"isLoggedIn">) => {
  return <div>{props.name}</div>
}
