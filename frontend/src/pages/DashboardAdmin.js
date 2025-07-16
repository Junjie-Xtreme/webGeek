// src/pages/DashboardAdmin.js
import mockData from '../mockdatafrommike';
//import { mockStudent } from '../mockStudent';
import { mockProjects } from '../mockProjects';

// components
import TopBarMaroon from '../components/TopBarMaroon';
import EditProjectDialog from '../components/EditProjectDialog';

// hooks
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
import SettingsIcon from '@mui/icons-material/Settings';

// student array 0 is jdoe, 1 is asmith, 2 is bjohnson; NOTE: i (start from 0) is not id (start from 1)
const i = 0;

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

  const [editProjectOpen, setEditProjectOpen] = useState(false);
  const [editableProject, setEditableProject] = useState(null);

  return (
    <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      {/* Maroon Top Bar */}
      <TopBarMaroon
        username={mockData.users[i].username}
        anchorEl={anchorEl}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onMyProfileOpen={handleMyProfileOpen}
        onLogout={handleLogout}
      />

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
                {mockData.projects.map((project) => {
                  const relatedSkills = mockData.project_skills
                    .filter(ps => ps.project_id === project.id)
                    .map(ps => {
                      const skill = mockData.skills.find(s => s.id === ps.skill_id);
                      return skill?.name || 'UNDEFINED';
                    });

                  return (
                    <Grid item xs={12} sm={6} md={4} key={project.id} sx={{ width: 'flex' }}>
                      <Card sx={{ width: '100%', backgroundColor: "#1976d2", cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", flexGrow: 1 }}
                        onClick={() => setSelectedProject(project)}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography color="white" variant="h6" align="center">{project.title}</Typography>
                          <Typography color="white"><strong>Description:</strong> {project.description}</Typography>
                          <Typography color="white"><strong>Skills:</strong> {relatedSkills.join(', ') || 'None'}</Typography>
                          <Typography color="white"><strong>Team Name:</strong> {project.teamName || '"UNDEFINED"'}</Typography>
                          <Typography color="white">
                            <strong>Capacity:</strong>{' '}
                            {mockData.project_users.filter(pu => pu.project_id === project.id).length}
                            /{project.maxCapacity}
                            {
                              mockData.project_users.filter(pu => pu.project_id === project.id).length === project.maxCapacity
                                ? ' (Full)'
                                : ' (Open)'
                            }
                          </Typography>
                        </CardContent>
                        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ backgroundColor: "white", color: "#1976d2", fontWeight: 'bold' }}
                            onClick={() => {
                              // Extract the array of skill names
                              const relatedSkillNames = mockData.project_skills
                                .filter(ps => ps.project_id === project.id)
                                .map(ps => {
                                  const skill = mockData.skills.find(s => s.id === ps.skill_id);
                                  return skill?.name || 'UNDEFINED';
                                });
                              setEditableProject({ ...project, skills: relatedSkillNames });
                              setEditProjectOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                        </Box>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>

            {/* Project Detail */}
            <Box sx={{ mt: 4 }}>
              {selectedProject ? (
                <Box>
                  <Typography variant="h5" gutterBottom>{selectedProject.title}</Typography>
                  <Typography gutterBottom>{selectedProject.description}</Typography>
                  <Typography gutterBottom>
                    Skills: {
                      mockData.project_skills
                        .filter(ps => ps.project_id === selectedProject.id)
                        .map(ps => {
                          const skill = mockData.skills.find(s => s.id === ps.skill_id);
                          return skill?.name;
                        })
                        .filter(Boolean)
                        .join(', ') || 'None'
                    }
                  </Typography>
                  <Typography gutterBottom>Team Name: {selectedProject.teamName || '"UNDEFINED"'}</Typography>
                  <Typography gutterBottom>
                    Capacity: {
                      mockData.project_users.filter(pu => pu.project_id === selectedProject.id).length
                    }/{selectedProject.maxCapacity}
                    {
                      mockData.project_users.filter(pu => pu.project_id === selectedProject.id).length === selectedProject.maxCapacity
                        ? ' (Full)'
                        : ' (Open)'
                    }
                  </Typography>
                </Box>
              ) : (
                <Typography variant="h6" sx={{ mt: 2 }}>Select a project to view details.</Typography>
              )}
            </Box>
          </Box>

          {/* Create Project (Pop-up Window) */}
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

          {/* My Profile (Pop-up Window) */}
          <Dialog open={myProfileOpen} onClose={handleMyProfileClose}>
            <DialogTitle align="center" variant="h6">My Profile</DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1"><strong>Name:</strong> {mockData.users[i].name || '"UNDEFINED'}</Typography>
              <Typography variant="subtitle1"><strong>VT Username:</strong> {mockData.users[i].username}</Typography>
              <Typography variant="subtitle1"><strong>Email:</strong> {mockData.users[i].edupersonprincipalname}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleMyProfileClose}>Cancel</Button>
              <Button variant="contained" onClick={handleMyProfileClose}>OK</Button>
            </DialogActions>
          </Dialog>

          {/* Edit Selected Project (Pop-up Window) */}
          <EditProjectDialog
            open={editProjectOpen}
            onClose={() => setEditProjectOpen(false)}
            project={editableProject || {}}
            setProject={setEditableProject}
            onSave={(updatedProject) => {
              console.log("Saving updated project:", updatedProject);
              setEditProjectOpen(false);
            }}
          />
        </Box>
      </Box >
    </Box >
  );
}