// **********************
// INPUT FULL IMPLEMENTATION
// **********************

import { Children } from "react"

type InputProps = React.ComponentProps<'input'>
export const HTMLInput = (props: InputProps) => {
  return <input {...props} />
}

// **********************
// BUTTONS FULL IMPLEMENTATION
// **********************
type ButtonProps = {
  variant: 'primary' | 'secondary'
  children: string
} & Omit<React.ComponentProps<'button'>, 'children'>

export const HTMLButton = ({ variant, children, ...rest }: ButtonProps) => {
  return (
    <button className={`class-with-${variant}`} {...rest}>
      {children}
    </button>
  )
}
// **********************
// BREAKDOWN BUTTON IMPLEMENTATION
// **********************

// EXTEND THE MYBUTTONPROPS SO THAT THE COMPONENT CAN HAVE THE ATTRIBUTE OF A BUTTON
type MyButtonProps = {
  variant: 'primary' | 'secondary'
} & React.ComponentProps<"button">

// SET CHILDREN STRING TO BUTTON
type MyButtonPropsChildren = {
  children: string
} 

export const MyHTMLButton = ({children, ...rest }:MyButtonProps & MyButtonPropsChildren ) => {
  return (
    <button {...rest}>
        {children}
    </button>
  )
}

