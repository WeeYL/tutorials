import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

// USECONTEXT TO ACCESS THE VALUES ONLY
export const Box = () => {
  const theme = useContext(ThemeContext)
  return (
    <div
      style={{
        backgroundColor: theme.primary.main,
        color: theme.primary.text
      }}>
      Theme context
    </div>
  )
}
