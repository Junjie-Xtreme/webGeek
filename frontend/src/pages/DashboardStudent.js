// src/pages/DashboardStudent.js
import mockData from '../mockdatafrommike';
// components
import TopBarMaroon from '../components/TopBarMaroon';
import MySkillsDialog from '../components/MySkillsDialog';
// hooks
import React, { useState } from "react";
// loginPage.js navigate
import { useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Box, List, ListItem, ListItemText, Menu, MenuItem, Grid, Card, CardContent, TextField,
    Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, Divider
} from "@mui/material";
// student array 0 is jdoe, 1 is asmith, 2 is bjohnson; NOTE: i (start from 0) is not id (start from 1)
const i = 0;


export default function DashboardPage() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [myProfileOpen, setMyProfileOpen] = useState(false)
    const [mySkillsOpen, setMySkillsOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);


    const handleMyProfileOpen = () => { handleMenuClose(); setMyProfileOpen(true) };
    const handleMyProfileClose = () => setMyProfileOpen(false);

    const handleMySkillsOpen = () => { handleMenuClose(); setMySkillsOpen(true); };
    const handleMySkillsClose = () => setMySkillsOpen(false);

    const navigate = useNavigate();
    const handleLogout = () => {
        handleMenuClose();
        navigate('/');
    };

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
                {/* Orange Sidebar */}
                <Box sx={{ width: 200, bgcolor: "#E5751F", p: 2, flexShrink: 0 }}>
                    <List>
                        <ListItem button onClick={handleMyProfileOpen} sx={{ cursor: "pointer" }}>
                            <ListItemText primary="My Profile"
                                sx={{ textAlign: "center" }} />
                        </ListItem>
                        <Divider />
                        <ListItem button onClick={handleMySkillsOpen} sx={{ cursor: "pointer" }}>
                            <ListItemText primary="My Skills"
                                sx={{ textAlign: "center" }} />
                        </ListItem>
                        <Divider />
                    </List>
                </Box>

                {/* Main Content */}
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
                                <Typography gutterBottom>Description: {selectedProject.description}</Typography>
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

                {/* My Profile Pop-up Window */}
                <Dialog open={myProfileOpen} onClose={handleMyProfileClose}>
                    <DialogTitle align="center" variant="h6">My Profile</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle1"><strong>Name:</strong> {mockData.users[i].name || "UNDEFINED in mockData"}</Typography>
                        <Typography variant="subtitle1"><strong>VT Username:</strong> {mockData.users[i].username}</Typography>
                        <Typography variant="subtitle1"><strong>Email:</strong> {mockData.users[i].edupersonprincipalname}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleMyProfileClose}>Cancel</Button>
                        <Button variant="contained" onClick={handleMyProfileClose}>OK</Button>
                    </DialogActions>
                </Dialog>

                {/* My Skills Pop-up Window (referred from components) */}
                <MySkillsDialog
                    open={mySkillsOpen}
                    onClose={handleMySkillsClose}
                    skills={mockData?.skills}
                    userSkills={mockData?.user_skills}
                    userId={mockData?.users?.[i]?.id}
                />

            </Box>
        </Box >
    );
}
