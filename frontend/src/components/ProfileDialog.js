// src/components/ProfileDialog.js
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

export default function ProfileDialog({ open, onClose, user }) {
  if (!user) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle align="center">Profile</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1"><strong>Name:</strong> {user.name || "UNDEFINED"}</Typography>
        <Typography variant="subtitle1"><strong>Username:</strong> {user.username}</Typography>
        <Typography variant="subtitle1"><strong>Email:</strong> {user.edupersonprincipalname}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}