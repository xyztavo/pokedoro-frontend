import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home.tsx'
import App from './App.tsx'
import { Pokedex } from './pages/pokedex.tsx'
import User from './pages/user.tsx'
import { ProtectedRoute } from './components/protected-route.tsx'
import { RegisterPage } from './pages/register-page.tsx'
import { LoginPage } from './pages/login-page.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/user' element={<User />} />
          </Route>
          <Route path='/pokedex' element={<Pokedex />} />
          <Route path='/*' element={<Navigate to={'/'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
