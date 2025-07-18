import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

export default function CreateProjectDialog({ open, onClose, onCreate }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    maxCapacity: '',
    skills: [],
    teamName: '',
  });

  useEffect(() => {
    if (open) {
      setNewProject({
        title: '',
        description: '',
        maxCapacity: '',
        skills: [],
        teamName: '',
      });
    }
  }, [open]);

  const handleChange = (field) => (e) => {
    setNewProject(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSkillChange = (e) => {
    const skillArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    setNewProject(prev => ({ ...prev, skills: skillArray }));
  };

  const handleCreate = () => {
    const { title, description, maxCapacity, skills } = newProject;
    const capacity = parseInt(maxCapacity);

    if (!title || !description || !skills.length || capacity < 1) {
      alert('Please fill in all fields');
      return;
    }

    onCreate({
      ...newProject,
      maxCapacity: capacity,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle align="center">Create New Project</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Project Title"
          margin="normal"
          value={newProject.title}
          onChange={handleChange('title')}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          margin="normal"
          value={newProject.description}
          onChange={handleChange('description')}
        />
        <TextField
          fullWidth
          label="Required Skills"
          margin="normal"
          value={newProject.skills.join(', ')}
          onChange={handleSkillChange}
        />
        <TextField
          fullWidth
          type="number"
          label="Max Student Capacity"
          margin="normal"
          value={newProject.maxCapacity}
          onChange={handleChange('maxCapacity')}
        />
        <TextField
          fullWidth
          label="Team Name (optional)"
          margin="normal"
          value={newProject.teamName}
          onChange={handleChange('teamName')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
