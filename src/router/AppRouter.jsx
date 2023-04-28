import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from "./routes"
import Login from '../pages/Login'

const AppRouter = () => {
  return (
    <Routes>
      <Route exact path={routes.login} element={<Login />} />
      <Route path={"/*"} element={<Navigate to={routes.login} />} />
    </Routes>
  )
}

export default AppRouter