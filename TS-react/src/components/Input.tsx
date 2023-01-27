type InputProps = {
  value: string
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

// PARAMS ARE DESTRUCTED
export const Input = ({ value, handleChange }: InputProps) => {
  return <input type='text' value={value} onChange={handleChange} />
}
