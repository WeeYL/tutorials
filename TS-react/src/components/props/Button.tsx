type ButtonProps = {
  // SPECIFIY OWN FUNCTION AT APP LEVEL
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void 
  // mouseOver: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void 
}

export const Button = (props: ButtonProps) => {
  return <button onClick={event => props.handleClick(event, 1)}>Click</button>
}
