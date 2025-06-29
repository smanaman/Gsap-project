import AboutHeadphones from './Pages/AboutHeadphones'
import HeadphoneStore from './Pages/HeadphoneStore'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App=()=> {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/shop' element={<HeadphoneStore/>}/>
        <Route path='/about' element={<AboutHeadphones/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
