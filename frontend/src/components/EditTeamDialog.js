// src/components/EditTeamDialog.js
import React, { useState } from "react";
import ProfileDialog from './ProfileDialog';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput
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

  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMemberClick = (user) => {
    setSelectedMember(user);
    setProfileDialogOpen(true);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle align='center'>Edit Team</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mb: 4 }}
          fullWidth
          label="Team Name"
          margin="normal"
          value={project.teamName || '"UNDEFINED'}
          onChange={handleChange('teamName')}
        />
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Current Members (click chip to see profile) </InputLabel>
          <OutlinedInput
            readOnly
            label="Current Members"
            startAdornment={
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  p: '4px 0',
                  width: "100%"
                }}
              >
                {project.currentMembers?.map(user => (
                  <Chip
                    key={user.id}
                    label={user.username}
                    size="small"
                    clickable
                    onClick={() => handleMemberClick(user)}
                  />
                ))}
              </Box>
            }
          />
        </FormControl>

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
        <ProfileDialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)} user={selectedMember} />
      </DialogActions>
    </Dialog>
  );
}