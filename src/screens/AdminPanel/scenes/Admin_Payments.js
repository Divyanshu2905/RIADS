import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, TextField, Typography, useTheme } from '@mui/material';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc
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

export default function Admin_Payments() {
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
      const q = query(collection(db, 'Active-Payments'));
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        data.sort((a, b) => b.TimeStamp - a.TimeStamp);
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
  const handleApprove=async(user)=>{
    const array=[];
    const timestamp=new Date();
    console.log(user);
    let dat=[];
    let s = query(collection(db, 'Active-Payments'),where('Email', '==', user.Email),where('Course', '==', user.Course));
    let q = query(collection(db, 'test-results'),where('email', '==', user.Email),where('Course', '==', user.Course));
      await getDocs(q).then((response) => {
        dat = response.docs.map((ele) => ({ ...ele.data() }));
    });
    let mat=[]
     const t = query(collection(db, 'users'),where('email', '==', user.Email) );
        await getDocs(t).then((response) => {
          mat = response.docs.map((ele) => ({ ...ele.data() }));
    });
    if (dat.length === 0 && mat.length>0) {
        const uploadData = async () => {
            try {
              const docRef = await addDoc(collection(db, 'test-results'), {
                Course:user.Course,
                email:user.Email,
                id:mat[0].id,
                name:mat[0].name,
                Score:array,
                Enrolledat:timestamp
              });
              const docRef2=await addDoc(collection(db,'Payment-Record'),{
                Email:user.Email,
                Course:user.Course,
                Reference:user.Reference,
                Date:user.Date,
                Timestamp:timestamp,
                Verdict:"Enrolled"
              })
            } catch (e) {
              console.error('Error adding document: ', e);
            }
          };
        uploadData();
        toast.success(`Successfully Enrolled`);
    } 
    else {
        try{
            const docRef2=await addDoc(collection(db,'Payment-Record'),{
                Email:user.Email,
                Course:user.Course,
                Reference:user.Reference,
                Date:user.Date,
                Timestamp:timestamp,
                Verdict:"Already Enrolled"
              })
            toast.success(`Already Enrolled`);
        }catch (e) {
            console.error('Error adding document: ', e);
        }
    }
    try{
        await getDocs(s)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref)
            });
        })
        .catch((error) => {
            console.error('Error executing query:', error);
        });
    }catch (e) {
        console.error('Error adding document: ', e);
    }
    window.location.reload();
  }
  const handleDisApprove=async(user)=>{
    const timestamp=new Date();
    const docRef2=await addDoc(collection(db,'Payment-Record'),{
        Email:user.Email,
        Course:user.Course,
        Reference:user.Reference,
        Date:user.Date,
        Timestamp:timestamp,
        Verdict:"Rejected"
    })
    const s = query(collection(db, 'Active-Payments'),where('Email', '==', user.Email),where('Course', '==', user.Course));
    await getDocs(s)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log("deleted");
        deleteDoc(doc.ref)
        });
    })
    .catch((error) => {
        console.error('Error executing query:', error);
    });
    toast.error(`Rejected`);
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
              Approve Enrollment Requests
            </Typography>
          </div>
          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
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
                          Reference No.
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Payment Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Course
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Approve
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          DisApprove
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
                                  {user.Reference}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {user.Email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex justify-center flex-col'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  <div className='flex justify-start items-center gap-20'>
                                  {user.Date}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex justify-center flex-col'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  <div className='flex justify-start items-center gap-20'>
                                  {user.Course}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-20 py-4 whitespace-nowrap'>
                            <div className='flex justify-center flex-col'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  <div className='flex justify-start items-center gap-20'>
                                  <button
                                    className='bg-[#90EE90] px-3 py-2 text-white mx-20'
                                    onClick={()=>handleApprove(user)}
                                    >
                                    Approve
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex justify-center flex-col'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  <div className='flex justify-start items-center gap-20'>
                                  <button
                                    className='bg-[#c54545] px-3 py-2 text-white mx-20'
                                    onClick={()=>handleDisApprove(user)}
                                    >
                                    DisApprove
                                    </button>
                                  </div>
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