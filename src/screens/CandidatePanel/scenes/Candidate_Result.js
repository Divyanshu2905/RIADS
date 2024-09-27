import { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

// import { mockDataResult } from '../data/mockData';
import { tokens } from '../theme';
import Sidebar from './global/Sidebar';
import Topbar from './global/Topbar';
import CertificateGenerator from './CertificateGenerator';
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
import Spinner from '../../../components/Spinner';
const Candidate_Result = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);

  const { currentUser } = useAuth();

  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    // fetch result data from databas

    console.log("fetching");
    const getData = async () => {
      const q = query(
        collection(db, 'test-results'),
        where('email', '==', currentUser.email)
      );
      await getDocs(q).then((response) => {
        let data2 = response.docs.map((ele) => ({ ...ele.data() }));
        // console.log(data[0].score);
        // setScore(data[0].score);
        let data=[];
        for (let i = 0; i < data2.length; i++) {
          for (let j = 0; j < data2[i].Score.length; j=j+2) {
            // let dates=data2[i].Score[j+1].toDate();
            // let onlyDate = dates.toISOString().split('T')[0];
            let data3={
              Course:data2[i].Course,
              Score:data2[i].Score[j],
              date:data2[i].Score[j+1]
            };
            data.push(data3);
          }
        }
        data.sort((a, b) => b.date - a.date);
        setData(data);
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
  let q=1;
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
              View Result and Download Result Certificate
            </Typography>
          </div>
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
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          S.No.
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Date
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Course
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Marks Obtained
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Result Status
                        </th>
                        
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                        >
                          Certificate
                        </th>
                      </tr>
                    </thead>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {/* {data.map((data) => (} */}
                      {data.map((data) => (
                        <tr key={data.id}>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {q++}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {data.date.toDate().toISOString().split('T')[0]}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {/* Refresher Course on HMV Drivers */}
                                  {data.Course}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {data.Score}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {data.Score >= 30 ? 'Pass' : 'Fail'}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {/* {data.Score >= 30 ? 'Pass' : 'Fail'} */}
                                  <CertificateGenerator/>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='flex items-center'>
                              <div className='ml-4'>
                                <div className='text-sm font-medium text-gray-900'>
                                  {data.result_status}
                                </div>
                              </div>
                            </div>
                          </td> */}
                          {/* <td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
                            <a
                              href='#'
                              className='text-indigo-600 hover:text-indigo-900'
                            >
                              Download
                            </a>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className='text-gray-700 pt-4 pl-4 pr-4'>
              Note: - 30 percent is passing marks.
            </div>
          </div>
        </div>
      </div>
    </div>)};
    </>
  );
};

export default Candidate_Result;
