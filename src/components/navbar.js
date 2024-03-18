import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="static" sx={{ background: "transparent" }} elevation={0}>
        <Toolbar>
          <img
            src="https://cdn.discreetshare.com/65c55e0952319df41011cd60"
            width={50}
            height={50}
            style={{
              borderRadius: "50%",
              marginLeft: "auto",
            }}
          />
          <Typography variant="h5" component="div" sx={{
            marginLeft: "1%",
            marginRight: "auto",
            fontWeight: "bolder"
          }}>
            DiscreetShare
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
