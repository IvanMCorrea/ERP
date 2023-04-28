import { Button, Card, CardContent, Grid, IconButton, Paper } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../theme/AppTheme'
import { Brightness4, Brightness7 } from '@mui/icons-material'

const Login = () => {
  const theme = useContext(ColorModeContext)
  console.log(theme)
  return (
      <Grid container sx={{justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
        <IconButton sx={{ position: "fixed", right: "2rem", top: "1rem" }} onClick={theme.toggleColorMode} color="inherit">
          {theme.mode === 'dark' ? <Brightness7/> : <Brightness4 />}
        </IconButton>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{maxWidth: "900px"}} color='card'>
            <CardContent>
              <h1>Login</h1>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default Login