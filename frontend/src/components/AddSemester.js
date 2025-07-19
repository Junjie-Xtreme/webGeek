import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';

export default function CreateSemesterDialog({ open, onClose, onAdd }) {
  const [semester, setSemester] = useState({
    displayName: '',
    semesterStartDate: '',
    semesterEndDate: '',
  });

  useEffect(() => {
    if (open) {
      setSemester({
        displayName: '',
        semesterStartDate: '',
        semesterEndDate: '',
      });
    }
  }, [open]);

  const handleChange = (field) => (e) => {
    setSemester(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreate = () => {
    const { displayName, semesterStartDate, semesterEndDate } = semester;

    if (!displayName || !semesterStartDate || !semesterEndDate) {
      alert('Please fill out required fields.');
      return;
    }

    onAdd({
      ...semester,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle align="center">Add a New Semester</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Semester Name"
          margin="normal"
          value={semester.displayName}
          onChange={handleChange('displayName')}
        />
        <TextField
          fullWidth
          type="date"
          label="Start Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={semester.semesterStartDate}
          onChange={handleChange('semesterStartDate')}
        />
        <TextField
          fullWidth
          type="date"
          label="End Date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={semester.semesterEndDate}
          onChange={handleChange('semesterEndDate')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
