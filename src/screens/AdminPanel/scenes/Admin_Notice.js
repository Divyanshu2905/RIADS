import { Component, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// import * as firebase from "firebase";
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import { useForm } from 'react-hook-form';
import { Controller, set, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

import { db, storage } from '../../../firebase';
import { mockDataResult } from '../data/mockData';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import Spinner from '../../../components/Spinner';
// import { Controller } from 'react-hook-form';

const schema = yup.object().shape({
  office_order: yup.string().required('Office Order Number is required'),
  date: yup.string().required('Date is required'),
  title: yup.string().required('Title is required'),
  upload_documents: yup.string().required('Upload Documents is required'),
});

const Admin_Result = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);

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

  const onSubmit = async (data, e) => {
    try {
      console.log(data);
      setOpen(false);

      setError('');
      setLoading(true);

      data.id = uuidv4();

      const uploadData = async () => {
        try {
          const docRef = await addDoc(collection(db, 'notice'), data);
          console.log('Document written with ID: ', docRef.id);
          window.location.reload();

        } catch (e) {
          console.error('Error adding document: ', e);
        }
      };

      try {
        console.log('heyy');

        const noticeData = ref(storage, `admin-images/notice/${data.id}`);
        await uploadBytes(noticeData, e.target.upload_documents.files[0])
          .then((snapshot) => {
            console.log(snapshot);
            getDownloadURL(snapshot.ref).then(async (doc_URL) => {
              console.log(doc_URL);
              data.upload_documents = doc_URL;
              await uploadData();
            });
          })
          .catch((er) => {
            window.alert("Couldn't upload notice");
            console.log(er);
          });

        console.log('uploading notice');
      } catch (e) {
        console.error('Error uploading notice: ', e);
        setError('Failed to upload notice');
      }

      // console.log("uploading data to firestore");
      // console.log(data);

      // refresh the page
      // window.location.reload();

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  // const handleSubmit = () => {
  //     setOpen(false);
  //     // console log form data
  //     var office_order = document.getElementById('office_order').value;
  //     var date = document.getElementById('date').value;
  //     var title = document.getElementById('title').value;
  //     var upload_documents = document.getElementById('upload_documents').value;
  //     console.log(office_order, date, title, upload_documents);

  // };

  // document.addEventListener('DOMContentLoaded', () => {
  //   console.log("window loaded");
  //   FetchNotice();
  // });

  // const notice_refs = getDocs(collection(db, "notice"))

  const [info, setInfo] = useState([]);

  // componentDidMount = () => {
  //   console.log("window loaded");
  //   FetchNotice();
  // }

  // on mount, fetch all notices
  // useEffect(() => {
  //   FetchNotice();
  // }, []);

  // const [animais, setAnimais] = useState([]);

  useEffect(() => {
    const getData = async () => {
    const subscriber = db
      .collection('notice')
      .get()
      .then((querySnapshot) => {
        const InfoisList = [];
        querySnapshot.forEach((documentSnapshot) => {
          InfoisList.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setInfo(InfoisList);
        // setLoading(false);
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

  // const FetchNotice = () => {
  //   console.log("fetching notice");
  //   db.collection("notice").get().then((querySnapshot) => {

  //     // Loop through the data and store
  //     // it in array to display
  //     querySnapshot.forEach(element => {
  //       // console.log(element.data());
  //       var data = element.data();
  //       setInfo(arr => [...arr, data]);

  //     });
  //   })

  // console.log(info);

  // }

  // const fetchNotice = async () => {
  //   const noticeCollection = collection(db, "notice");
  //   const noticeSnapshot = await noticeCollection.get();
  //   const noticeList = noticeSnapshot.docs.map(doc => doc.data());
  //   console.log(noticeList);

  //   return (
  //     <tbody className='bg-white divide-y divide-gray-200'>
  //       {noticeList.map((noticeList) => (
  //         <tr key={noticeList.uid}>
  //           <td className='px-6 py-4 whitespace-nowrap'>
  //             <div className='flex items-center'>
  //               <div className='ml-4'>
  //                 <div className='text-sm font-medium text-gray-900'>
  //                   {noticeList.uid}
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //           <td className='px-6 py-4 whitespace-nowrap'>
  //             <div className='flex items-center'>
  //               <div className='ml-4'>
  //                 <div className='text-sm font-medium text-gray-900'>
  //                   {noticeList.office_order}
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //           <td className='px-6 py-4 whitespace-nowrap'>
  //             <div className='flex items-center'>
  //               <div className='ml-4'>
  //                 <div className='text-sm font-medium text-gray-900'>
  //                   {noticeList.date}
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //           <td className='px-6 py-4 whitespace-nowrap'>
  //             <div className='flex items-center'>
  //               <div className='ml-4'>
  //                 <div className='text-sm font-medium text-gray-900'>
  //                   {noticeList.title}
  //                 </div>
  //               </div>
  //             </div>
  //           </td>
  //           <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
  //             <a
  //               href={noticeList.upload_documents}
  //               className='text-indigo-600 hover:text-indigo-900'
  //             >
  //               Download
  //             </a>
  //           </td>
  //           <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
  //             <a
  //               href='#'
  //               className='text-indigo-600 hover:text-indigo-900'
  //             >
  //               Delete
  //             </a>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   )

  // }

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
              Notice
            </Typography>
          </div>
          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>
          <div className='flex flex-row justify-between'>
            <button
              className='bg-[#c54545] px-3 py-2 text-white mx-20'
              onClick={handleOpen}
            >
              Add Notice
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
                Add Notice
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={4}>
                      <Controller
                        name='office_order'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Office Order Number'
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
                        name='date'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Date'
                            type='date'
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
                        name='title'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Title'
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
                        name='upload_documents'
                        control={control}
                        defaultValue=''
                        render={({ field }) => (
                          <TextField
                            {...field}
                            label='Upload Documents'
                            error={!!errors.upload_documents}
                            helperText={errors?.upload_documents?.message}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            type='file'
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                  <div className='flex flex-row justify-between my-4'>
                    <Button variant='contained' color='primary' type='submit'>
                      Submit
                    </Button>
                  </div>
                </form>
              </Typography>
            </Box>
          </Modal>

          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>

          <div className='flex flex-col'>
            <div className='-my-4 overflow-x-auto'>
              <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          UID
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Office Order Number
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Title
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Upload Documents
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Delete
                        </th>
                      </tr>
                    </thead>
                    {}
                    {info.map((info) => (
                      <tbody className='bg-white divide-y divide-gray-200'>
                        <tr key={info.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {info.id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {info.office_order}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {info.date}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {info.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <a
                              href={info.upload_documents}
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Download
                            </a>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <Button
                              variant='contained'
                              color='secondary'
                              type='submit'
                              onClick={async () => {
                                // const noticeData = ref(storage, `admin-images/notice/${info.id}`)
                                // await deleteObject(noticeData).then(() => {
                                //   console.log("Document successfully deleted!");
                                // }).catch((error) => {
                                //   console.error("Error removing document: ", error);
                                // });
                                console.log(info.id);
                                // get the document id and delete it
                                const q = query(
                                  collection(db, 'notice'),
                                  where('id', '==', info.id)
                                );
                                await getDocs(q).then(async (response) => {
                                  let data = response.docs.map((ele) => ({
                                    ...ele.data(),
                                  }));
                                  const ref = doc(
                                    db,
                                    'notice',
                                    response.docs[0].id
                                  );
                                  await deleteDoc(ref);
                                  // Refresh the page
                                  window.location.reload();
                                });

                                // await db.collection("notice").doc(info.id).delete().then(() => {
                                //   console.log("Document successfully deleted!");
                                // }).catch((error) => {
                                //   console.error("Error removing document: ", error);
                                // });
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                    {/* {fetchNotice().then((data) => {
                      return data;
                    })} */}
                    {/* <tbody className='bg-white divide-y divide-gray-200'>
                      {mockDataResult.map((mockDataResult) => (
                        <tr key={mockDataResult.uid}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.uid}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.father_mother_name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.age}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.gender}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.batch}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Download
                            </a>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {mockDataResult.status}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Download
                            </a>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Email
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
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
};

export default Admin_Result;
