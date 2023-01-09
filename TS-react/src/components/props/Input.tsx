type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// PARAMS ARE DESTRUCTED
// EVENT HANDLER (onChange) MUST PAIR WITH EVENT: React.ChangeEvent<HTMLInputElement>
export const Input = ({ value, handleChange }: InputProps) => {
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event)
  // }
  return <input type='text' value={value} onChange={handleChange} />
}
