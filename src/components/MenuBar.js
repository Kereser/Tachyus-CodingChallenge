// Mui Components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const MenuBar = () => {
  const pages = ['Grid', 'Visualization', 'Map']

  const handleAnchorClick = () => {
    document.querySelectorAll("a[href^='#']").forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
        })
      })
    })
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { md: 'flex', xs: 'flex' } }}
          >
            Tachyus
          </Typography>
          <Box sx={{ flexGrow: 15, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                href={`#${page}`}
                onClick={handleAnchorClick}
                sx={{
                  my: 2,
                  color: 'hsl(var(--hue1), 61%, 24%)',
                  display: 'block',
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default MenuBar
