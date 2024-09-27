import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {  Box,Grid, TextField, Typography, useTheme } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc
} from 'firebase/firestore';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Modal from '@material-ui/core/Modal';
import { db } from '../../../firebase';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import Spinner from '../../../components/Spinner';
const schema = yup.object().shape({
  Email: yup.string().required('Email is required'),
});

export default function Admin_Enrollments() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [open1,setOpen1]=useState(false);
  const[open2,setOpen2]=useState(false);
  const [data, setData] = useState([]);
  const [user,setUser]=useState([]);
  const [course,setCourses]=useState([]);
  const [loading,setLoading]=useState(true);
  const[toenroll,setToenroll]=useState([]);
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'users'));
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        setData(data);
      });
    };
    const getData4 = async () => {
        const q = query(collection(db, 'Courses'));
        await getDocs(q).then((response) => {
          let data = response.docs.map((ele) => ({ ...ele.data() }));
          setToenroll(data);
        });
      };
    const fetchData=async()=>{
      try {
        setLoading(true);
        await getData();
        await getData4();
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
  } = useForm();

  const f = new Intl.DateTimeFormat('en-uk', {
    dateStyle: 'short',
  });

  function onSubmit(dat) {
    const getData = async () => {
        const q = query(collection(db, 'users'),where('email', '==', dat.Email) );
        await getDocs(q).then((response) => {
          let data = response.docs.map((ele) => ({ ...ele.data() }));
          setData(data);
          console.log("here");
        });
      };
      const getData2 = async () => {
        const q = query(collection(db, 'users'));
        await getDocs(q).then((response) => {
          let data = response.docs.map((ele) => ({ ...ele.data() }));
          setData(data);
          console.log("here");
        });
      };
      const fetchData=async()=>{
        try {
          setLoading(true);
          if(dat.Email==''){
            await getData2();
          }
          else{
            await getData();
          }
          console.log(toenroll);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
  }
  const getData3 = async (email) => {
    const q = query(collection(db, 'test-results'),where('email', '==', email));
    await getDocs(q).then((response) => {
      let data = response.docs.map((ele) => ({ ...ele.data() }));
      setCourses(data);
      console.log("here");
    });
  };
  const handleOpen1= async(user)=>{
    try{
        await getData3(user.email);
        console.log(course);
        setOpen1(true);
    }
    catch (error) {
        console.error(error);
    }
  }
  const handleOpen2= async(dat)=>{
    setUser(dat);
    setOpen2(true);
  }
  const handleClose1 = () => {
    setOpen1(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const onSubmit1=async(e)=>{
    const array=[];
    const timestamp=new Date();
    e.preventDefault();
    const query = await db.collection('test-results').where('email', '==', user.email).where('Course', '==', e.target.Choose.value).get();
    if (!query.empty) {
        toast.success(`Already Enrolled`);
    } else {
        const uploadData = async () => {
            try {
              const docRef = await addDoc(collection(db, 'test-results'), {
                Course:e.target.Choose.value,
                email:user.email,
                id:user.id,
                name:user.name,
                Score:array,
                Enrolledat:timestamp
              });
              console.log('Document written with ID: ', docRef.id);
            } catch (e) {
              console.error('Error adding document: ', e);
            }
          };
        uploadData();
        toast.success(`Successfully Enrolled`);
    }
    window.location.reload();
  } 
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
        <div className='flex-1 overflow-x-auto'>
          <div className='text-center'>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              View and Edit enrollments
            </Typography>
          </div>
          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-4 flex gap-4 items-center justify-start flex-col md:flex-row'>
              <div className='flex items-start justify-center'>
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    name='Email'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Email'
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </div>
              {/* <div className='flex items-start justify-center'>
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    name='batchTo'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Batch to'
                        type='date'
                        error={!!errors.batchTo}
                        helperText={errors.batchTo?.message}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </div>
              <div className='flex items-start justify-center'>
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    name='attendanceDate'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Attendance date'
                        type='date'
                        error={!!errors.attendanceDate}
                        helperText={errors.attendanceDate?.message}
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                  />
                </Grid>
              </div> */}
              <div className='flex items-start justify-center'>
                <button
                  type='submit'
                  class='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div className='flex flex-col'>
            <div className='-my-4 overflow-x-auto '>
              <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                <div className='shadow  border-b border-gray-200 rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          UID
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Candidate Name
                        </th>

                        {/* <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider '
                          rowspan='2'
                        >
                          Batch Date
                          <tr>
                            <th
                              scope='col'
                              className='px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              From
                            </th>
                            <th
                              scope='col'
                              className='px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                            >
                              To
                            </th>
                          </tr>
                        </th> */}

                        <th
                          scope='col'
                          className='px-10 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          View-Courses
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Enroll
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {data.map((user) => (
                        <tr key={user.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {user.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {user.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {user.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          {/* <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex justify-center flex-col'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  <div className='flex justify-start items-center gap-20'>
                                    <div>{f.format(batchFrom)}</div>
                                    <div>{f.format(batchTo)}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td> */}
                          {/* <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {f.format(attendanceDate)}
                                </div>
                              </div>
                            </div>
                          </td> */}
                          <td className='px-6 py-4 whitespace-nowrap'>
                          <div className='flex items-center'>
                            <div className='flex flex-row justify-between'>
                                <button
                                className='bg-[#c54545] px-3 py-2 text-white mx-20'
                                onClick={()=>handleOpen1(user)}
                                >
                                View
                                </button>
                            </div>
                            </div>
                          </td>

                          <Modal onClose={handleClose1} open={open1}>
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
                                Student is Enrolled in These Courses
                            </Typography>
                            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                            <Grid container spacing={6}> 
                            {course.map((data,index) => (
                                <Grid item xs={12} sm={4}>
                                    <span>{index+1}. {data.Course}</span>
                                </Grid>
                            ))};
                            </Grid>
                            </Typography>
                            <div className='flex flex-row justify-between my-4'>
                                <Button  onClick={()=>handleClose1()}>
                                     Close
                                </Button>
                            </div>
                            </Box>
                        </Modal>

                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                            <div className='flex flex-row justify-between'>
                                <button
                                className='bg-[#c54545] px-3 py-2 text-white mx-20'
                                onClick={()=>handleOpen2(user)}
                                >
                                Enroll
                                </button>
                            </div>
                            </div>
                          </td>
                          <Modal onClose={handleClose2} open={open2}>
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
                                Courses Open For Enrollment
                            </Typography>
                            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                            <form onSubmit={(onSubmit1)}>
                                <Grid container spacing={6}>
                                {toenroll.map((data,index) => (
                                    <Grid item xs={12} sm={4}>
                                    <input type="radio" id={data.Name} name="Choose" value={data.Name}/>
                                        <label for={data.Name}>{data.Name}</label>
                                    </Grid>
                                ))}; 
                                </Grid>
                                <div className='flex flex-row my-4'>
                                    <Button  type='submit' style={{ marginRight: '10px' }}>
                                        Enroll
                                    </Button>
                                    <Button  onClick={()=>handleClose2()}>
                                         Close
                                     </Button>
                                </div>
                            </form>
                            </Typography>
                            </Box>
                        </Modal>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>)};
    </>
  );
}