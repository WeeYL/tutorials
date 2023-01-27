type ButtonProps = {
  // SPECIFIY OWN FUNCTION AT APP LEVEL
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void 
  handleMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void 
}
export const Button = (props: ButtonProps) => {
  return <button 
  onClick={props.handleClick} // for onClick use function
  onMouseOver={props.handleMouseOver}
  >Click</button>
}
