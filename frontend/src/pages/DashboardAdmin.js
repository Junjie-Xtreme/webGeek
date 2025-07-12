// src/pages/Dashboard.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Grid,
  Card,
  CardContent,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Drawer,
  IconButton,
  Divider,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export default function DashboardPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handlePopupOpen = () => setPopupOpen(true);
  const handlePopupClose = () => setPopupOpen(false);

  const drawerWidth = 300;
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>

      {/* Maroon Top Bar */}
      <AppBar position="static" sx={{ bgcolor: "#800035" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}>

          <Box sx={{ width: 200 }}>
            <Typography variant="h5" align="center">
              VT Logo / VT
            </Typography>
          </Box>

          <Typography variant="h5" align="center" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            DraftDay
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button color="inherit" onClick={handleMenuOpen}>
              Welcome! (userName)
            </Button>
          </Box>

        </Toolbar>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
              <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
            </Menu>
      </AppBar>


      {/* Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>

        {/* Pink Sidebar */} 
        {!open && ( <IconButton onClick={handleDrawerOpen}><MenuIcon /></IconButton>)}
        <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            top: '64px', 
            backgroundColor: 'pink',
          },
        }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>

          <List>
            <Divider />
            <ListItem><ListItemText primary="Account Settings" /></ListItem>
            <Divider />
            <ListItem button onClick={() => setPopupOpen(true)}><ListItemText primary="+ Create Project" /></ListItem>
            <Divider />
            <ListItem button><ListItemText primary="MATCH" sx={{ color: "green" }} /></ListItem>
            <Divider />
          </List>
      </Drawer>


        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button onClick={() => setPopupOpen(true)} color="inherit">+ Add Semester</Button>
            <TextField size="small" placeholder="Search Project.." sx={{ bgcolor: "white", borderRadius: 1 }} />
            <TextField size="small" placeholder="Filter Semester" sx={{ bgcolor: "white", borderRadius: 1 }} />
          </Box>
          {/* Cards Area */}
          <Box sx={{ p: 3 }}>
            <Grid container spacing={2}>
              {[1, 2, 3].map((card) => (
                <Grid item xs={12} sm={6} md={4} key={card}>
                  <Card sx={{ minHeight: 150, backgroundColor: "#f9bebe" }}>
                    <CardContent>
                      <Typography variant="h6">Project Name...</Typography>
                      <Typography>Description.....</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Pop-up Window / Dialog */}
        <Dialog open={popupOpen} onClose={handlePopupClose}>
          <DialogTitle>Create Project</DialogTitle>
          <DialogContent>
            <TextField fullWidth label="Project Name" margin="normal" />
            <TextField fullWidth multiline rows={4} label="Description" margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePopupClose}>Cancel</Button>
            <Button variant="contained" onClick={handlePopupClose}>Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
