import { Button, Card, CardContent, Grid, IconButton, Paper, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { ColorModeContext } from '../theme/AppTheme'
import { Brightness4, Brightness7 } from '@mui/icons-material'

const Login = () => {
  const theme = useContext(ColorModeContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(e)
  }

  return (
      <Grid container sx={{justifyContent: "center", alignItems: "center", minHeight: "100vh"}}>
        <IconButton sx={{ position: "fixed", right: "2rem", top: "1rem" }} onClick={theme.toggleColorMode} color="inherit">
          {theme.mode === 'dark' ? <Brightness7/> : <Brightness4 />}
        </IconButton>
        <Grid item xs={11} md={6} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
          <Card component="article" sx={{maxWidth: "500px", minHeight: 350}}>
            <CardContent sx={{textAlign: "center", py: 5, display: "flex", flexDirection: "column"}}>
              <Typography variant='h5' component="h2" sx={{mb: 2}}>Login</Typography>
              <form onSubmit={handleSubmit}>
                <Typography>Email</Typography>
                <TextField sx={{my: 2, px: 5}} fullWidth/>
                <Typography>Password</Typography>
                <TextField sx={{my: 2, px: 5}} fullWidth type='password'/>
                <Button variant='contained' type='submit'>Login</Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
  )
}

export default Login