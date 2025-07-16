// src/components/MySkillsDialog.js
import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    ListItemText,
    Checkbox,
    Typography,
    TextField,
    Box
} from '@mui/material';

export default function MySkillsDialog({ open, onClose, userId, skills, userSkills }) {
    const [selectedSkillIds, setSelectedSkillIds] = useState([]);
    const [customSkills, setCustomSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    useEffect(() => {
        if (open) {
            const initial = userSkills
                .filter(us => us.user_id === userId)
                .map(us => us.skill_id);
            setSelectedSkillIds(initial);
            setCustomSkills([]);
            setNewSkill("");
        }
    }, [open, userId, userSkills]);

    const handleToggle = (skillId) => {
        setSelectedSkillIds(prev =>
            prev.includes(skillId)
                ? prev.filter(id => id !== skillId)
                : [...prev, skillId]
        );
    };

    const handleAddCustomSkill = () => {
        const trimmed = newSkill.trim();
        if (trimmed && !customSkills.includes(trimmed)) {
            setCustomSkills([...customSkills, trimmed]);
            setNewSkill("");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle align="center" variant="h6">My Skills</DialogTitle>
            <DialogContent>
                {skills?.length ? (
                    <>
                        <List>
                            {skills.map(skill => (
                                <ListItem key={skill.id}>
                                    <Checkbox
                                        checked={selectedSkillIds.includes(skill.id)}
                                        onChange={() => handleToggle(skill.id)}
                                    />
                                    <ListItemText primary={skill.name} />
                                </ListItem>
                            ))}

                            {customSkills.map((skill, index) => (
                                <ListItem key={`custom-${index}`}>
                                    <Checkbox checked disabled />
                                    <ListItemText primary={skill} secondary="(custom)" />
                                </ListItem>
                            ))}
                        </List>

                        {/* Add new skill input */}
                        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                            <TextField
                                label="Add a Skill"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                size="small"
                                fullWidth
                            />
                            <Button variant="contained" sx={{ bgcolor: 'green', '&:hover': { bgcolor: 'darkgreen' } }} onClick={handleAddCustomSkill}>Add</Button>
                        </Box>
                    </>
                ) : (
                    <Typography>Loading...</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={onClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
