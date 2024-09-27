import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { mockDataContacts } from '../data/mockData';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import Spinner from '../../../components/Spinner';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

const Candidate_StudyMaterial = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'course',
      headerName: 'Name',
      width: 200,
      // editable: true,
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 200,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
    },
    {
      //link to download the file

      field: 'upload_documents',
      headerName: 'Download',
      width: 200,
      renderCell: (params) => (
        <a href={params.value}>Download</a>
      ),

      // editable: true,
    },
  ];

  const { currentUser } = useAuth();

  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    // fetch study material data from database

    console.log(currentUser.email);
    const getData = async () => {
      const q = query(
        collection(db, 'study'),
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        setData(data);
        console.log(data);
      });
    }
    const fetchData=async()=>{
      try {
        setLoading(true);
        await getData();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  return (
    <>
      {loading ? (
        <>
        <Spinner/>
        </>
      ):(
    <div className='flex flex-col h-screen bg-gray-100'>
      <div>
        <Topbar />
      </div>
      <div className='flex flex-1'>
        <div className='w-1/4'>
          <Sidebar isSidebar={isSidebar} />
        </div>
        <div className='flex-1 overflow-x-auto'>
          <Typography variant='h5' color={colors.greenAccent[400]}>
            Download study material
          </Typography>

          <div style={{ height: 600, width: '100%' }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              components={{
                Toolbar: GridToolbar,
              }}
            />

          </div>
        </div>
      </div>
    </div>)};
    </>
  );
};

export default Candidate_StudyMaterial;
