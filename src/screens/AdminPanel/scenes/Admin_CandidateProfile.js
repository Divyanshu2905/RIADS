import React, { useEffect, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Modal from '@material-ui/core/Modal';
import { Edit, Style } from '@mui/icons-material';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { where } from 'firebase/firestore';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import Background from 'hero-slider/dist/components/Slide/Background';
import { Controller, set, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import Spinner from '../../../components/Spinner';
import Form from '../../../components/ui/form';
import { useAuth } from '../../../contexts/AuthContext';
import { db, storage } from '../../../firebase';
import { mockDataRegistration } from '../data/mockData';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';

// import { Controller } from 'react-hook-form';

const TableRow = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  
  // variables and functions for modal
  const [approvalIsOpen, setApprovalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  function openApprovalModal() {
    setApprovalIsOpen(true);
  }

  function closeApprovalModal() {
    setApprovalIsOpen(false);
  }

  // -----------------------------------------

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // change the status to approved
  // update the database status to approved

  const updateID = async () => {
    if(startDate === '' || endDate === '') {
      alert('Please select both dates');
      return ;
    }

    const q = query(
      collection(db, 'users'),
      where('id', '==', data.id)
    );

    await getDocs(q).then(async (response) => {
      let data = response.docs.map((ele) => ({ ...ele.data() }));
      const ref = doc(db, 'users', response.docs[0].id);
      await updateDoc(ref, {
        status: 'Approved',
        batch_from: startDate,
        batch_to: endDate,
      });
      window.location.reload();
    });

  };


  return (
    <tr key={data.id}>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
          <div className='ml-4'>
            <div className='text-sm font-medium text-gray-900'>{data.id}</div>
          </div>
        </div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.name}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.fathersName}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.email}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.state}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.age}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.gender}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>{data.phoneNumber}</div>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>
          <button
            type='button'
            className='px-3 py-2 text-white'
            style={{
              backgroundColor: data.status === 'Pending' ? 'red' : 'green',
            }}
            onClick={openApprovalModal}
          >
            {data.status}
          </button>
        </div>

        <Modal onClose={closeApprovalModal} open={approvalIsOpen && data.status!=="Approved"}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 900,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              maxHeight: '80%', // Adjust this value as needed
              overflow: 'auto',
            }}
          >
            <div className='flex justify-center flex-col'>
              <div className='flex justify-center flex-col p-2'>
                <label>Select start date</label>
                <input type='date' onChange={(e)=>setStartDate(e.target.value)} id="start_date"/>
              </div>

              <div className='flex justify-center flex-col p-2'>
                <label>Select end date</label>
                <input type='date' onChange={(e)=>setEndDate(e.target.value)} id="end_date"/>
              </div>
              
              <button className='bg-green-400 text-white text-xl hover:bg-green-300 active:bg-green-400 p-2' onClick={updateID}>Approve</button>
            </div>
          </Box>
        </Modal>
      </td>
      <td className='px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-900'>
          <button
            className='px-3 py-2 text-white'
            onClick={handleOpen}
            style={{ backgroundColor: 'gray' }}
          >
            Edit Profile
          </button>
        </div>
        <Modal onClose={handleClose} open={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 900,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              maxHeight: '80%', // Adjust this value as needed
              overflow: 'auto',
            }}
          >
            <div>
              <Form uid={data.id} update={'true'} />
            </div>
          </Box>
        </Modal>
      </td>
    </tr>
  );
};


const EditProfileModal = ({data_id, handleClose, open}) => {
    return(
      <Modal onClose={handleClose} open={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 900,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            maxHeight: '80%', // Adjust this value as needed
            overflow: 'auto',
          }}
        >
          <div>
            <Form uid={data_id} update={'true'} />
          </div>
        </Box>
      </Modal>
    )
}

const Admin_CandidateProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const columns = [
    { field: 'column1', flex: 0.5 },
    { field: 'column2', flex: 0.5 },
  ];

  const column1Data = [
    'Candidate Name',
    'UID',
    'Father Name',
    'Age',
    'Gender',
    'Payment Status',
    'Batch',
    'Contact No.',
    'Email',
    'Course Selected',
    'Course Online/Offline',
  ];

  const rows = column1Data.map((item, index) => ({
    id: index,
    column1: item,
    column2: mockDataRegistration[index],
  }));

  const { currentUser } = useAuth();
  // console.log(currentUser.multiFactor.user.email);
  const emailRef = currentUser.multiFactor.user.email;

  // console.log(currentUser.multiFactor.user.uid);

  // Fetching data from database
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'users'));
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        setData(data);
        // console.log(data);
      });
    };
    getData();
  }, []);

  // console.log(data);

  // modal variables and functions
  const [open, setOpen] = useState(false);
  const [approvalIsOpen, setApprovalIsOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [data_id, setData_id] = useState(0); // to show the modal of that particular id


  function openApprovalModal(row_data_id) {
    setApprovalIsOpen(true);
    setData_id(row_data_id);
  }

  function closeApprovalModal() {
    setApprovalIsOpen(false);
  }

  // -----------------------------------------

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (row_data_id) => {
    setData_id(row_data_id);
    setOpen(true);
  };

  // change the status to approved
  // update the database status to approved

  const updateID = async (data_id) => {
    if(startDate === '' || endDate === '') {
      alert('Please select both dates');
      return ;
    }

    const q = query(
      collection(db, 'users'),
      where('id', '==', data_id)
    );

    await getDocs(q).then(async (response) => {
      let data = response.docs.map((ele) => ({ ...ele.data() }));
      const ref = doc(db, 'users', response.docs[0].id);
      await updateDoc(ref, {
        status: 'Approved',
        batch_from: startDate,
        batch_to: endDate,
      });
      window.location.reload();
    });

  };
  // ------------------------------------------------------------

  // grid data schema
  const dataColumns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'name',
      headerName: 'NAME',
      width: 200,
    },
    {
      field: 'fathersName',
      headerName: "FATHER'S NAME",
      width: 200,
    },
    {
      field: 'email',
      headerName: "EMAIL",
      width: 200,
    },
    {
      field: 'state',
      headerName: "STATE",
      width: 200,
    },
    {
      field: 'age',
      headerName: "AGE",
      width: 200,
    },
    {
      field: 'batch_from',
      headerName: "BATCH START DATE",
      width: 200,
      sortable: false,
      disableColumnMenu:true,
      renderCell: (params) =>{
        return (
          <div>
          {
            params?.value in ["", " ", undefined, null] ? 
            
            <div>Not Approved</div> 
            : 
            <div>{params?.value?.toLocaleString('en-IN')}</div>
          }
          </div>
        )
      },
    },
    {
      field: 'batch_to',
      headerName: "BATCH END DATE",
      width: 200,
      sortable: false,
      disableColumnMenu:true,
      renderCell: (params) =>{
        return (
          <div>
          {
            params?.value in ["", " ", undefined, null] ? 
            
            <div>Not Approved</div> 
            : 
            <div>{params?.value}</div>
          }
          </div>
        )
      },
    },
    {
      field: 'gender',
      headerName: "GENDER",
      width: 200,
    },
    {
      field: 'phoneNumber',
      headerName: "PHONE NUMBER",
      width: 200,
    },
    {
      field: 'status',
      headerName: "STATUS",
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) =>
          params ? 
          <button onClick={() => openApprovalModal(params.row.id)}>
            {params?.value }
          </button>
          : null
    },
    {
      field: 'editProfile',
      headerName: "EDIT PROFILE",
      width: 200,
      sortable: false,
      disableColumnMenu:true,
      renderCell: (params) =>{
        return (
        <button onClick={() => handleOpen(params.row.id)}>
          Edit Profile
        </button>
        )
      },
    },
    
  ];

  // console.log(data)

  return (
    <div className='flex flex-col h-screen bg-gray-100'>
      <div>
        <Topbar />
      </div>
      <div className='flex flex-1'>
        <div className='w-1/4'>
          <Sidebar isSidebar={isSidebar} />
        </div>
        <div className='flex-1 overflow-x-auto'>
          <div>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              View & Edit Candidate Profiles
            </Typography>
          </div>
          <hr className='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
          {/*make table data */}
          <div className='flex flex-col'>
            <div className='-my-4 overflow-x-auto '>
              <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                <div className='shadow  border-b border-gray-200 rounded-lg'>
                <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={data}
                  columns={dataColumns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  components={{
                    Toolbar: GridToolbar,
                  }}
                />

                  <Modal onClose={closeApprovalModal} open={approvalIsOpen}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 900,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        maxHeight: '80%', // Adjust this value as needed
                        overflow: 'auto',
                      }}
                    >
                      <div className='flex justify-center flex-col'>
                        <div className='flex justify-center flex-col p-2'>
                          <label>Select start date</label>
                          <input type='date' onChange={(e)=>setStartDate(e.target.value)} id="start_date"/>
                        </div>

                        <div className='flex justify-center flex-col p-2'>
                          <label>Select end date</label>
                          <input type='date' onChange={(e)=>setEndDate(e.target.value)} id="end_date"/>
                        </div>
                        
                        <button className='bg-green-400 text-white text-xl hover:bg-green-300 active:bg-green-400 p-2' onClick={()=>{updateID(data_id)}}>Approve</button>
                      </div>
                    </Box>
                  </Modal>

                <Modal onClose={handleClose} open={open}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 900,
                      bgcolor: 'background.paper',
                      border: '2px solid #000',
                      boxShadow: 24,
                      p: 4,
                      maxHeight: '80%', // Adjust this value as needed
                      overflow: 'auto',
                    }}
                  >
                    <div>
                      <Form uid={data_id} update={'true'} />
                    </div>
                  </Box>
                </Modal>

                </div>
                  {/* <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          UID
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Candidate Name
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Father Name
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Email
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          State
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Age
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Gender
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Phone number
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Status
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Edit Profile
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {data.map((ele) => (
                        <TableRow data={ele} />
                      ))}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin_CandidateProfile;
