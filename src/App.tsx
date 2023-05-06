import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './scss/app.scss'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza'
import MainLayout from './layouts/MainLayout'
import React, { Suspense } from 'react'
import Loading from './components/Loading'

const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizza/:id" element={<FullPizza />} />
          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  )
}

export default App
