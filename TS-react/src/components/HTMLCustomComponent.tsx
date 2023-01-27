import React from 'react'
import { Greet } from '../Greet'

// TYPEOF GETS THE TYPE FROM THE GREET COMPONENT
// export const CustomComponent = (props: React.ComponentProps<typeof Greet>) => {
//   return <div>{props.name}</div>
// }

export const HTMLCustomComponent = (props: Omit<React.ComponentProps<typeof Greet>,"isLoggedIn">) => {
  return <div>{props.name}</div>
}
