import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField, Typography, useTheme } from '@mui/material';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { db } from '../../../firebase';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import Spinner from '../../../components/Spinner';
const schema = yup.object().shape({
  batchFrom: yup.date().required('Batch from date is required'),
  batchTo: yup.date().required('Batch to date is required'),
  attendanceDate: yup.date().required('Attendance date is required'),
});

export default function Admin_Attendance() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [batchFrom, setBatchFrom] = useState(new Date());
  const [batchTo, setBatchTo] = useState(new Date());
  const [attendanceDate, setAttendanceDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, 'users'));
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        setData(data);
      });
    };
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

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const f = new Intl.DateTimeFormat('en-uk', {
    dateStyle: 'short',
  });

  function onSubmit(data) {
    setBatchFrom(data.batchFrom);
    setAttendanceDate(data.attendanceDate);
    setBatchTo(data.batchTo);
  }

  const toggleAttendance = async (userId) => {
    const updatedUsers = data.map((user) => {
      if (user.id === userId) {
        if (!user.attendance) {
          user.attendance = [];
        }

        user.attendance.push(f.format(attendanceDate));
      }

      return user;
    });

    setData(updatedUsers);

    try {
      // Fetch the user document ID from Firestore
      const q = query(collection(db, 'users'), where('id', '==', userId));
      const querySnapshot = await getDocs(q);
      const userDocumentId = querySnapshot.docs[0].id;

      // Update the attendance property of the user document
      const userDocRef = doc(db, 'users', userDocumentId);
      await updateDoc(userDocRef, {
        attendance: updatedUsers.find((user) => user.id === userId).attendance,
      });
    } catch (error) {
      alert('Firebase error updating attendance 🥺');
      console.error('Error updating attendance:', error);
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
        <div className='flex-1 overflow-x-auto'>
          <div className='text-center'>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              Attendance
            </Typography>
          </div>
          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-4 flex gap-4 items-center justify-start flex-col md:flex-row'>
              <div className='flex items-start justify-center'>
                <Grid item xs={12} sm={4}>
                  <Controller
                    control={control}
                    name='batchFrom'
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label='Batch from'
                        type='date'
                        error={!!errors.batchFrom}
                        helperText={errors.batchFrom?.message}
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
              </div>
              <div className='flex items-start justify-center'>
                <button
                  type='submit'
                  class='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'
                >
                  Submit
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
                        </th>

                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Day
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Attendance
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
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {f.format(attendanceDate)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {user.attendance &&
                                  user.attendance.find(
                                    (entry) =>
                                      entry === f.format(attendanceDate)
                                  ) ? (
                                    <button
                                      type='button'
                                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                                    >
                                      Attendance marked!
                                    </button>
                                  ) : (
                                    <button
                                      type='button'
                                      className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                                      onClick={() => toggleAttendance(user.id)}
                                    >
                                      Mark attendance
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
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
