// src/pages/DashboardStudent.js
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
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DashboardPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [myProfileOpen, setMyProfileOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState(null);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);


    const handleMyProfileOpen = () => { handleMenuClose(); setMyProfileOpen(true) };
    const handleMyProfileClose = () => setMyProfileOpen(false);

    const navigate = useNavigate();

    const handleLogout = () => {
        handleMenuClose();
        navigate('/');
    };

    return (
        <Box sx={{ display: "flex", height: "100vh", flexDirection: "column" }}>

            {/* Maroon Top Bar */}
            <AppBar position="static" sx={{ bgcolor: "#800035" }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                    <Box
                        sx={{
                            width: 200,
                            display: { xs: 'none', md: 'block' }
                        }}
                    >
                        <Typography variant="h5" align="center">
                            (VT Logo)
                        </Typography>
                    </Box>

                    <Typography variant="h5" align="center" noWrap sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
                        DraftDay (Summer 2025)
                    </Typography>

                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Button color="inherit" onClick={handleMenuOpen}>
                            {mockStudent.name} <ArrowDropDownIcon />
                        </Button>
                    </Box>

                </Toolbar>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={handleMyProfileOpen}>My Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                </Menu>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ display: "flex", flexGrow: 1 }}>
                {/* Pink Sidebar */}
                <Box sx={{ width: 240, bgcolor: "#f9c2ff", p: 2, flexShrink: 0 }}>
                    <List>
                        <ListItem button onClick={handleMyProfileOpen} sx={{ cursor: "pointer" }}>
                            <ListItemText primary="My Profile" />
                        </ListItem>
                        <ListItem button sx={{ cursor: "pointer" }}>
                            <ListItemText primary="My Skills" />
                        </ListItem>
                    </List>
                </Box>

                {/* Main Content */}
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
    );
}
