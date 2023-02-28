
type ListProps<T> = {
  items: T[]
  clickHandler: (value: T) => void
}

// <T extends { id: number }> : SET GENERIC TYPE TO INCLUDE A PROPOERTY "ID", EG, ITEM.ID 
// <T extends {}> : ACCEPTS ANY
// ({items,onClick}: SET THE PROPS
// ListProps<T>: SET TYPE GENERIC TYPE T

export const GenericList = <T extends { id: number }> ({items,clickHandler}: ListProps<T>) => {
  return (
    <div>
      <h2>List of items</h2>
      {items.map(item => {
        return (
          <button 
          key={item.id} 
          onClick={() => clickHandler(item)}>
            {item.id}
          </button>
        )
      })}
    </div>
  )
}