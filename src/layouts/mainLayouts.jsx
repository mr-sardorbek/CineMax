import { Toaster } from "sonner"
import Navbar from "../components/navbar"
import { Footer } from "@/components"


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
      <Footer/>
    </>
  )
}

export default MainLayout
