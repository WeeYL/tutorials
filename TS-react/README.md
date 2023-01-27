# Getting Started with Create React App

SYNTAX FOR TYPE
- type NodeProps = {
  children: React.ReactNode
}
- type ButtonProps = {
  handleMouseOver: (event: React.MouseEvent<HTMLButtonElement>) => void 
}
- const [user, setUser] = useState<AuthUser | null>(null)
- export const UserContext = createContext({} as UserContextType)
- export const List = <T extends { id: number }>({items,clickHandler}: ListProps<T>)
- <div> {isPositive && 'positive'}  (optional chaining) </div>
- | Exclude<`${HorizontalPosition}-${VerticalPosition}`, 'center-center'> | 'center' (for type)
- Omit<React.ComponentProps<'button'>, 'children'>    (for component props)
- component: React.ComponentType<ProfileProps>
- export const CustomComponent = (props: React.ComponentProps<typeof Greet>)


