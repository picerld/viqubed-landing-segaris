import { Route, Routes } from "react-router-dom"
import { RootLayout } from "./components/layout/RootLayout"
import { Home } from "./pages/Home"
import Product from "./pages/Product"
import { Features } from "./pages/Features"
import { Solutions } from "./pages/Solutions"
import { SolutionDetail } from "./pages/SolutionDetail"
import { Pricing } from "./pages/Pricing"
import { Contact } from "./pages/Contact"



function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/features" element={<Features />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/solutions/:slug" element={<SolutionDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  )
}

export default App
