import { Outlet } from 'react-router'
import './App.css'
import Dashboard from './sections/dashboard/dashboard'

function App() {

  return (
    <div className="wrapper">
      <Outlet/>
    </div>
  )
}

export default App
