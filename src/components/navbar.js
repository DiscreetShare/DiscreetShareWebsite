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
            src="https://cdn.mycelium-ai.com/image.png"
            style={{
              maxWidth: "50%", // Set a maximum width for the image
              height: "auto",
              borderRadius: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block",
            }}
          />
          <Typography variant="h5" component="div" sx={{
            fontSize: "clamp(1rem, 4vw, 2rem)",
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