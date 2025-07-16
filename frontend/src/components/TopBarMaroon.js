import React from 'react';
import {
    AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem
} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function TopBarMaroon({ username, anchorEl, onMenuOpen, onMenuClose, onMyProfileOpen, onLogout }) {
    return (
        <AppBar position="static" sx={{ bgcolor: "#861F41" }}>
            <Toolbar sx={{ height: 75, display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                <Box sx={{ width: 200, display: { xs: 'none', md: 'block' } }}>
                    <Typography variant="h5" align="center">
                        (VT Logo)
                    </Typography>
                </Box>

                <Typography
                    variant="h5"
                    align="center"
                    noWrap
                    sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}
                >
                    DraftDay
                </Typography>

                <Box sx={{ ml: 'auto' }}>
                    <Button color="inherit" onClick={onMenuOpen}>
                        {username} <ArrowDropDownIcon />
                    </Button>
                </Box>

            </Toolbar>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
                <MenuItem onClick={onMyProfileOpen}>My Profile</MenuItem>
                <MenuItem onClick={onLogout}>Log Out</MenuItem>
            </Menu>
        </AppBar>
    );
}