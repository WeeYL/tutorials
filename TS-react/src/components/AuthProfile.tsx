export type ProfileProps = {
  name: string
}

export const AuthProfile = ({ name }: ProfileProps) => {
  return <div>Private Profile component. Name is {name}</div>
}
