# Getting Started with Create React App

SYNTAX FOR TYPE
- const [user, setUser] = useState<AuthUser | null>(null)
- export const UserContext = createContext({} as UserContextType)
- export const List = <T extends { id: number }>({items,clickHandler}: ListProps<T>)
- <div> {isPositive && 'positive'}  (optional chaining) </div>
- | Exclude<`${HorizontalPosition}-${VerticalPosition}`, 'center-center'> | 'center' : EXCLUDE CENTER-CENTER BUT INCLUDE CENTER