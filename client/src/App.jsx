import { Footer, Greetings, Loader, NavBar,Services, Transactions } from "./components"
const App = () => {

  return (
    <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <NavBar />
          <Greetings />
        </div>
        <Services />
        <Transactions />
        <Footer />
    </div>
  )
}

export default App
