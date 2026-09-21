import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false)

    const toggleTheme = () => {
        setDarkMode((prev) => !prev)
    }

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode)
    }, [darkMode])

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}