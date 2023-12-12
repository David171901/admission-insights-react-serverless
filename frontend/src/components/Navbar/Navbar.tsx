import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react';

interface NavbarProps {
  navItems: string[];
  handleDrawerToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle, navItems }) => {
  return (
    <AppBar component="nav">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          UNMSM
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          {navItems.map((item) => (
            <Button key={item} sx={{ color: '#fff' }}>
              {item}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  )
}