import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { Moon, Sun } from "lucide-react"


const ThemeToggle = ({closeMenu}) => {
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
       const savedTheme = localStorage.getItem("theme")

       if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
        setIsDark(true)
       }
    },[])

    const toggleTheme = () => {
        const newTheme = !isDark

        setIsDark(newTheme)

        if(newTheme) {
            document.documentElement.classList.add("dark")
            localStorage.setItem("theme" , "dark")
        } else {
            document.documentElement.classList.remove("dark")
            localStorage.setItem("theme", "light")
        }
    }
  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}  >
        {isDark ? <Sun size={18}/> : <Moon size={18}/>}
    </Button>
  )
}

export default ThemeToggle
