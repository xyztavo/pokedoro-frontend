import { ThemeProvider } from "@/components/ui/theme-provider"
import { Navbar } from "./components/navbar"
import { Outlet } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./lib/queryClient"
import { Toaster } from "sonner"

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider >
        <Navbar />
        <Outlet />
        <Toaster richColors />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
