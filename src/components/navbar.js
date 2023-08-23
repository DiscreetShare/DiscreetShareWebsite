import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1, borderRadius: "2%" }}>
      <AppBar position="static" sx={{ background: "transparent" }}>
        <Toolbar>
          <img
            src="https://media.discordapp.net/attachments/854578580381892619/1143945141451755530/shushing-face_1f92b.jpg"
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