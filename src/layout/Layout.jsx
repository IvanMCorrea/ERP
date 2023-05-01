import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
   <Grid container>
    <Grid item xs={12}>
        {/* Nav */}
    </Grid>
    <Grid item xs={4}>
        {/* Sidebar */}
    </Grid>
    <Grid item xs={8}>
        <Outlet />
    </Grid>
   </Grid>
  )
}

export default Layout