import { useContext } from 'react';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Box, IconButton, useTheme } from '@mui/material';
import InputBase from '@mui/material/InputBase';

import { ColorModeContext, tokens } from '../../theme';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display='flex' justifyContent='flex-start' p={1}>
      
      <Box>
        <Link to="/">
        <IconButton type='button' size='large'>
          <HomeOutlinedIcon />
        </IconButton>
        </Link>
      </Box>
      <Box>
        <p className='text-3xl font-normal text-green'
          style={{ marginTop: '5px', marginRight: '10px' }}
          margin-bottom='0'> | </p>
      </Box>
      <Box>
        <p
          className='text-2xl font-bold'
          style={{ marginTop: '8px' }}
          margin-bottom='0'
        >
            Admin Portal
        </p>
      </Box>
    </Box>
  );
};

export default Topbar;