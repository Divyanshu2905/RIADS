import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Controller, set, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';
import Collapse from '@mui/material/Collapse';
import Modal from '@material-ui/core/Modal';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import Spinner from '../../../components/Spinner';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
const schema = yup.object().shape({
  Email: yup.string().required('Email is required'),
  Course: yup.string().required('Course Name is required'),
  Reference: yup.string().required('Reference Number is required'),
  Date: yup.string().required('Date of Payment is required'),
});

export default function Candidate_Courses() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const { currentUser } = useAuth();

  const [open, setOpen] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [openRowId1, setOpenRowId1] = useState(null)

  const handleRowClick1 = (RowId1) => {
    setOpenRowId1(openRowId1 === RowId1 ? null : RowId1)
  }
  const [error, setError] = useState('');
  const [openRowId, setOpenRowId] = useState(null)

  const handleRowClick = (RowId) => {
    setOpenRowId(openRowId === RowId ? null : RowId)
  }
  const [data2,setData2]=useState([]);
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    // fetch attendance data from database

    console.log(currentUser.email);
    const getData = async () => {
      const q = query(
        collection(db, 'Courses'),
      );
      await getDocs(q).then((response) => {
        console.log("Course data : ");
        console.log(response);
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        console.log(data);
        setData(data);
      });
    }
    const getData2 = async () => {
      const q = query(
        collection(db, 'test-results'), where('email', '==', currentUser.email)
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        console.log(data);
        setData2(data);
      });
    }
    const fetchData=async()=>{
      try {
        setLoading(true);
        await getData();
        await getData2();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const handleTest = () => {
    console.log("clicked on test")
    navigate('/candidate-test');
  }
  
  const handleEnroll = (e) => {
    console.log("clicked on enroll")
    window.open(e);
  }
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const onSubmit = async (dat, e) => {
    try {
      console.log(dat);
      setOpen(false);

      setError('');
      setLoading(true);

      dat.id = uuidv4();

      const uploadData = async () => {
        const timestamp=new Date();
        const verdict="Pending";
        try {
          const docRef = await addDoc(collection(db, 'Active-Payments'), {
            Email:dat.Email,
            Course:dat.Course,
            Reference:dat.Reference,
            Date:dat.Date,
            Timestamp:timestamp,
            Verdict:verdict
          });
          console.log('Document written with ID: ', docRef.id);
          toast.success("Successfully Submitted")

        } catch (e) {
          console.error('Error adding document: ', e);
        }
      };
      uploadData();
      // try {
      //   console.log('heyy');

      //   const noticeData = ref(storage, `admin-images/notice/${data.id}`);
      //   await uploadBytes(noticeData, e.target.upload_documents.files[0])
      //     .then((snapshot) => {
      //       console.log(snapshot);
      //       getDownloadURL(snapshot.ref).then(async (doc_URL) => {
      //         console.log(doc_URL);
      //         data.upload_documents = doc_URL;
      //         await uploadData();
      //       });
      //     })
      //     .catch((er) => {
      //       window.alert("Couldn't upload notice");
      //       console.log(er);
      //     });

      //   console.log('uploading notice');
      // } catch (e) {
      //   console.error('Error uploading notice: ', e);
      //   setError('Failed to upload notice');
      // }

      // console.log("uploading data to firestore");
      // console.log(data);

      // refresh the page
      // window.location.reload();

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };


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
        <div>
          <Sidebar isSidebar={isSidebar} />
        </div>
        <div className='flex-1 overflow-x-auto flex flex-col'>
          {/* First Table Name */}
          <div className='text-left ml-10'>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              Courses Available
            </Typography>
          </div>
          <hr class='h-px my-3 bg-gray-200 border-2 dark:bg-gray-700'></hr>
          <div className='text-left ml-10'>
            <Typography variant='h6' color={colors.redAccent[400]}>
              After Enrollling Please Fill this Form
            </Typography>
          </div>
          <div className='flex flex-row justify-between'>
            <button
              className='bg-[#c54545] px-3 py-2 text-white mx-20'
              onClick={handleOpen}
            >
              Submit Details
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
              }}
            >
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Submit Details
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='Email'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Email'
                            error={!!errors.office_order}
                            helperText={errors?.office_order?.message}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='Course'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Course Name'
                            error={!!errors.date}
                            helperText={errors?.date?.message}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='Reference'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Reference Number'
                            error={!!errors.title}
                            helperText={errors?.title?.message}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='Date'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Date of Payment'
                            type='date'
                            error={!!errors.title}
                            helperText={errors?.title?.message}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <div className='flex flex-row justify-between my-4'>
                    <Button  type='submit'>
                      Submit
                    </Button>
                  </div>
                </form>
              </Typography>
            </Box>
          </Modal>
          {/* Divider */}
          <div className='flex-1 overflow-x-auto flex flex-col'>

            {/* First Table Start */}
            {/* <hr class='h-px my-3 bg-gray-200 border-2 dark:bg-gray-700'></hr> */}
            <div className='flex flex-col'>
              <div className='-my-4 overflow-x-auto'>
                <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>


                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table" className='min-w-full divide-y divide-gray-200'>
                        <TableHead className='bg-gray-100'>
                          <TableRow>
                            <TableCell><strong>COURSE NAME</strong></TableCell>
                            {/* <TableCell align="right"><strong>START DATE</strong></TableCell> */}
                            <TableCell align="right"><strong>PRICE</strong></TableCell>
                            <TableCell align="right"><strong>Description</strong></TableCell>
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(data) && data.map((item, index) => {
                            const RowId1 = `Row-${index}`
                            const IsOpen1 = openRowId1 === RowId1

                            console.log(item)
                            return (
                              <>
                                <React.Fragment key={RowId1}>
                                  <TableRow aria-label="expand row" size="small"
                                     sx={{ '& > *': { borderBottom: 'unset' } }}>

                                    <TableCell component="th" scope="row" >{item.Name}</TableCell>
                                    {/* <TableCell align="right">{item.StartDate}</TableCell> */}
                                    <TableCell align="right">{item.Price}</TableCell>
                                    <TableCell align="right">
                                      <Button onClick={()=>handleEnroll(item.Payment)}>Enroll Now</Button>
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick1(RowId1)}>
                                      <IconButton>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow style={{ backgroundColor: 'lightgray' }} >
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                      <Collapse in={IsOpen1} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                          <Typography variant="p" gutterBottom component="div">
                                          {item.Description}
                                          </Typography>
                                        </Box>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              </>
                            )
                          }
                          )
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            {/* First Table End */}
          </div>

          {/* First Table Name */}
          <div className='text-left ml-10 mt-10'>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              Enrolled Courses
            </Typography>
          </div>

          {/* Divider */}
          <div className='flex-1 overflow-x-auto flex flex-col'>

            {/* Second Table Start */}
            <hr class='h-px my-3 bg-gray-200 border-2 dark:bg-gray-700'></hr> {/* Divider */}
            <div className='flex flex-col'>
              <div className='-my-4 overflow-x-auto'>
                <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>


                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table" className='min-w-full divide-y divide-gray-200'>
                        <TableHead className='bg-gray-100'>
                          <TableRow>
                            <TableCell><strong>COURSE NAME</strong></TableCell>
                            {/* <TableCell align="right"><strong>START DATE</strong></TableCell> */}
                            <TableCell align="right"><strong>Enrolled on</strong></TableCell>
                            <TableCell align="right" ><strong>Test</strong></TableCell>
                            <TableCell />
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(data2) && data2.map((item, index) => {
                            console.log(item)

                            const RowId = `Row-${index}`
                            const IsOpen = openRowId === RowId
  
                            return (
                              <>
                                <React.Fragment key={RowId}>
                                  <TableRow aria-label="expand row" size="small"
                                     sx={{ '& > *': { borderBottom: 'unset' } }}>

                                    <TableCell component="th" scope="row" >{item.Course}</TableCell>
                                    {/* <TableCell align="right">{item.StartDate}</TableCell> */}
                                    <TableCell align="right">{item.Enrolledat.toDate().toISOString().split('T')[0]}</TableCell>
                                    <TableCell align="right">
                                      <Button onClick={handleTest}>Take Test Now</Button>
                                    </TableCell>
                                    <TableCell onClick={() => handleRowClick(RowId)}>
                                      <IconButton>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                  <TableRow style={{ backgroundColor: 'lightgray' }} >
                                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                      <Collapse in={IsOpen} timeout="auto" unmountOnExit>
                                        <Box sx={{ margin: 1 }}>
                                          <Typography variant="p" gutterBottom component="div">
                                          Give the test To get Your Certificate in Result Section
                                          </Typography>
                                        </Box>
                                      </Collapse>
                                    </TableCell>
                                  </TableRow>
                                </React.Fragment>
                              </>
                            )
                          }
                          )
                          }
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            {/* Second Table End*/}
          </div>
        </div>
      </div>
    </div>
      )}
    </>
  );
};
