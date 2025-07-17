// src/components/EditProjectDialog.js
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

export default function EditProjectDialog({
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
      <DialogTitle align='center'>Edit Selected Project</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Project Name"
          margin="normal"
          value={project.title || '"UNDEFINED"'}
          onChange={handleChange('title')}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          margin="normal"
          value={project.description || '"UNDEFINED"'}
          onChange={handleChange('description')}
        />
        <TextField
          fullWidth
          label="Required Skills"
          margin="normal"
          value={project.skills?.join(', ') || '"UNDEFINED"'}
          onChange={handleSkillChange}
        />
        <TextField
          fullWidth
          type="number"
          label="Max Capacity"
          margin="normal"
          value={project.maxCapacity}
          onChange={(e) => {
            setProject(prev => ({
              ...prev,
              maxCapacity: e.target.value,
            }));
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            const val = project.maxCapacity;
            if (!Number.isInteger(val) || val < 1) {
              alert("Please enter a valid integer ≥ 1 for Max Capacity");
              return;
            }
            onSave({ ...project, maxCapacity: val });
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}