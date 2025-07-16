// src/pages/DashboardAdmin.js
import { mockStudent } from '../mockStudent';
import { mockProjects } from '../mockProjects';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SettingsIcon from '@mui/icons-material/Settings';

export default function DashboardPage() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  //const handlePopupOpen = () => setPopupOpen(true);
  //const handlePopupClose = () => setPopupOpen(false);

  const drawerWidth = 300;
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  // ----------------------------------------------------------------------------
  const [createProjectOpen, setCreateProjectOpen] = useState(false);
  const [myProfileOpen, setMyProfileOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null);
  const handleCreateProjectOpen = () => setCreateProjectOpen(true);
  const handleCreateProjectClose = () => setCreateProjectOpen(false);
  const handleMyProfileOpen = () => { handleMenuClose(); setMyProfileOpen(true) };
  const handleMyProfileClose = () => setMyProfileOpen(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    handleMenuClose();
    navigate('/');
  };

  const [projects, setProjects] = useState([]);


  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>

      {/* Maroon Top Bar */}
      <AppBar position="static" sx={{ bgcolor: "#800035" }}>
        <Toolbar sx={{ height: 90, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

          <Box sx={{ width: 200, display: { xs: 'none', md: 'block' } }}>
            <Typography variant="h5" align="center">
              (VT Logo)
            </Typography>
          </Box>

          <Typography variant="h5" align="center" sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            DraftDay
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button color="inherit" onClick={handleMenuOpen}>
              {mockStudent.name} <ArrowDropDownIcon />
            </Button>
          </Box>

        </Toolbar>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMyProfileOpen}>My Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
          <MenuItem onClick={handleLogout}>Log Out</MenuItem>
        </Menu>
      </AppBar>


      {/* Main Content */}
      <Box sx={{ display: "flex", flexGrow: 1 }}>

        {/* Pink Sidebar */}
        {!open && (<IconButton onClick={handleDrawerOpen}><MenuIcon /></IconButton>)}
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
              top: '90px',
              backgroundColor: 'pink',
            },
          }}
        >
          <List>
            <Divider />
            <ListItem><ListItemText primary="Account Settings" primaryTypographyProps={{
              sx: {
                fontWeight: 700,
                color: 'white',
                textAlign: 'center',
                gap: 0
              }
            }} /><SettingsIcon sx={{ color: 'white' }} /></ListItem>
            <Divider />
            <ListItem button onClick={() => setPopupOpen(true)}><ListItemText primary="+ Create Project" primaryTypographyProps={{
              sx: {
                fontWeight: 700,
                color: 'white',
                textAlign: 'center'
              }
            }}
            /></ListItem>
            <Divider />
            <ListItem button><ListItemText primary="MATCH" primaryTypographyProps={{
              sx: {
                fontWeight: 700,
                color: 'green',
                textAlign: 'center'
              }
            }}
            /> </ListItem>
            <Divider />
          </List>
        </Drawer>


        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Button sx={{
              fontWeight: '700',
              justifyContent: 'center',
              border: '1px solid gray',
              borderRadius: '8px',
            }} onClick={() => setPopupOpen(true)} color="inherit">+ Add Semester</Button>
            <TextField size="small" placeholder="Search Project.." sx={{ bgcolor: "white", borderRadius: 1 }} />
            <TextField size="small" placeholder="Filter Semester" sx={{ bgcolor: "white", borderRadius: 1 }} />
          </Box>

          {/* Cards Area */}
          {/* ---------------------------------------------------------------------------------- */}
          <Box sx={{ flexGrow: 1, p: 3 }}>
            {/* Project Cards */}
            <Box sx={{ p: 3 }}>
              <Grid container spacing={2}>
                {mockProjects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <Card sx={{ height: 220, backgroundColor: "#1976d2", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                      onClick={() => setSelectedProject(project)}
                    >
                      <CardContent>
                        <Typography color="white" variant="h6" align="center">{project.projectName}</Typography>
                        <Typography color="white">{project.description}</Typography>
                        <Typography color="white">Skills: {project.requiredSkills.join(', ')}</Typography>
                        <Typography color="white">
                          Members: {project.currentMembers} {project.full ? "(Full)" : "(Open)"}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Project Detail */}
            <Box sx={{ mt: 4 }}>
              {selectedProject ? (
                <Box>
                  <Typography variant="h5" gutterBottom>{selectedProject.projectName}</Typography>
                  <Typography gutterBottom>{selectedProject.description}</Typography>
                  <Typography gutterBottom>
                    Required Skills: {selectedProject.requiredSkills.join(", ")}
                  </Typography>
                  <Typography gutterBottom>
                    Current Members: {selectedProject.currentMembers} {selectedProject.full ? "(Full)" : "(Open)"}
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h6" sx={{ mt: 2 }}>Select a project to view details.</Typography>
              )}
            </Box>
          </Box>

          {/* Create Project Pop-up Window */}
          <Dialog open={createProjectOpen} onClose={handleCreateProjectClose}>
            <DialogTitle>Create Project</DialogTitle>
            <DialogContent>
              <TextField fullWidth label="Project Name" margin="normal" />
              <TextField fullWidth multiline rows={4} label="Description" margin="normal" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateProjectClose}>Cancel</Button>
              <Button variant="contained" onClick={handleCreateProjectClose}>Create</Button>
            </DialogActions>
          </Dialog>

          {/* My Profile Pop-up Window */}
          <Dialog open={myProfileOpen} onClose={handleMyProfileClose}>
            <DialogTitle align="center" variant="h6">My Profile</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1"><strong>Name:</strong> {mockStudent.name}</Typography>
              <Typography variant="subtitle1"><strong>VT Username:</strong> {mockStudent.vtUsername}</Typography>
              <Typography variant="subtitle1"><strong>Email:</strong> {mockStudent.email}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleMyProfileClose}>Cancel</Button>
              <Button variant="contained" onClick={handleMyProfileClose}>OK</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box >
    </Box >
  );
}