import { useState } from 'react';
import { Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
// import Admin_CandidateProfile from './Admin_CandidateProfile.js';


const Admin_Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div>
        <Topbar />
      </div>
      <div className='flex flex-1'>
        <div>
          <Sidebar isSidebar={isSidebar} />
        </div>

        <div className='flex-1 overflow-x-auto'>
          <div align='center'>
            <Typography
              variant='h4'
              color={colors.grey[100]}
              fontWeight='bold'
              sx={{ m: '0 0 5px 0' }}
            >
              WELCOME TO RIADS ADMIN DASHBOARD
            </Typography>
            <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
            <div class='flex justify-center'>
              <ul class='list-none text-left'>
                <li class='py-2'>
                  <a
                    href='/admin-candidateprofile'
                    class='text-neutral-600 dark:text-black no-underline hover:text-red-500 hover:ml-2 hover:text-lg'
                  >
                    View Registration
                  </a>
                </li>
                <li class='py-2'>
                  <a
                    href='/admin-study'
                    class='text-neutral-600 dark:text-black no-underline hover:text-red-500 hover:ml-2 hover:text-lg'
                  >
                    Study Material
                  </a>
                </li>
                <li class='py-2'>
                  <a
                    href='/admin-attendance'
                    class='text-neutral-600 dark:text-black no-underline hover:text-red-500 hover:ml-2 hover:text-lg'
                  >
                    Attendance
                  </a>
                </li>
                <li class='py-2'>
                  <button
                    onClick={handleLogout}
                    class='text-neutral-600 dark:text-black no-underline hover:text-red-500 hover:ml-2 hover:text-lg'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_Dashboard;
