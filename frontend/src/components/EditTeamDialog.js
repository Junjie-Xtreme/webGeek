// src/components/EditTeamDialog.js
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
} from '@mui/material';

export default function EditTeamDialog({
  open,
  onClose,
  onSave,
  project,
  setProject,
}) {

  const handleChange = (field) => (e) => {
    setProject(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSkillChange = (e) => {
    const skillArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setProject(prev => ({ ...prev, skills: skillArray }));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle align='center'>Edit Team</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Team Name"
          margin="normal"
          value={project.teamName || '"UNDEFINED'}
          onChange={handleChange('teamName')}
        />
        <TextField
          fullWidth
          label="Current Members"
          margin="normal"
        //value={project.skills?.join(', ') || '"UNDEFINED"'}
        //onChange={}
        />
        <TextField
          fullWidth
          label="Add Member"
          margin="normal"
        //value={project.skills?.join(', ') || '"UNDEFINED"'}
        //onChange={}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={() => onSave(project)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}