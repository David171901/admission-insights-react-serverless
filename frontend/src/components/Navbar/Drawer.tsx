import { Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import DrawerMUI from '@mui/material/Drawer';

interface DrawerProps {
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  navItems: string[];
}

export const Drawer: React.FC<DrawerProps> = ({ container, mobileOpen, handleDrawerToggle, navItems }) => {
  const drawerWidth = 240;
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <DrawerMUI
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      {drawer}
    </DrawerMUI>
  )
}
