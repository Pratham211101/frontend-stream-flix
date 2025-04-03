import React,{useState} from 'react'
import { Route, Routes } from 'react-router-dom'


//Routing
import Home from './Pages/Home'
import Video from './Pages/Video'


//componnets
import Navbar from './components/Navbar'


const App = () => {
  const [sidebar,setSidebar] = useState(true)
  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/video/:catgeoryId/:videoId' element={<Video sidebar={sidebar}/>} />
      </Routes>
    </div>
  )
}

export default App