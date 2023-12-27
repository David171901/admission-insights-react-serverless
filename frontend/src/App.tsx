import './App.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import { SearchForm } from './components/SearchForm';
import { Drawer, Navbar } from './components/Navbar';
import { Table } from './components/Table';
// import StickyHeadTable from './components/Table';

interface Props {
  window?: () => Window;
}

const navItems = ['Home', 'About', 'Contact'];

export default function App(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} navItems={navItems}></Navbar>
      <Drawer handleDrawerToggle={handleDrawerToggle} container={container} mobileOpen={mobileOpen} navItems={navItems}></Drawer>
      <Box component="main" sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        <SearchForm></SearchForm>
        <Table></Table>
      </Box>
    </Box>
  );
}