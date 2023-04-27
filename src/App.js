import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import './scss/app.scss'
import Cart from './pages/Cart'
import { useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
})

function App() {
  const [searchValue, setSearchValue] = useState('')

  return (
    <UserContext.Provider value={{ searchValue, setSearchValue }}>
      <div className="App">
        <div className="wrapper">
          <Header />

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
