import { Toaster } from "sonner"
import Navbar from "../components/navbar"


const MainLayout = ({children}) => {
  return (
    <>
    <nav>
      <Navbar/>
    </nav>
    <Toaster richColors/>
    <main >
      {children}
    </main>
    </>
  )
}

export default MainLayout
