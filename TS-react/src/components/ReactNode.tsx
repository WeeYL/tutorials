type NodeProps = {
  children: React.ReactNode
}

export const ReactNode = (props: NodeProps) => {
  return <div style={{border: '1px solid red', padding:'1rem', fontSize:"30px"}}>{props.children}</div>
}
