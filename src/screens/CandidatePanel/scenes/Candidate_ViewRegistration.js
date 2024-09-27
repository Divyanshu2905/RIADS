import { useEffect, useState, useRef } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import Modal from './Modal';
import { DataGrid } from '@mui/x-data-grid';
import { mockDataAttendance, mockDataRegistration } from '../data/mockData';
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
import { ConstructionOutlined } from '@mui/icons-material';

const Candidate_ViewRegistration = () => {
  const inputRef = useRef(null)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const columns = [
    { field: 'column1', flex: 0.5 },
    { field: 'column2', flex: 0.5 },
  ];
  const [isEdit, setIsEdit] = useState(false);
  const [newNum, setNewNum] = useState("");
  const [Open, setOpen] = useState(false);

  const [loading,setLoading]=useState(true);
  const column1Data = [
    'Candidate Name',
    'UID',
    'Father/Mother Name',
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

  const [data, setData] = useState([]);


  const handleOpenBox = () => {
    setIsEdit(true);
    setOpen()
  };



  const setNewPhoneNumber = (e) => {
    setNewNum(e.target.value);
  }

  const storeNumber = async() => {
    console.log("the number number", newNum);
    const updatedoc = async()=>{
      const querySnapshot = await getDocs(
        query(collection(db, 'users'), where('email', '==', data.email))
      );
      const documentReference = querySnapshot.docs[0].ref;
      await updateDoc(documentReference,{
        phoneNumber:newNum
      })
    }
    try{
      await updatedoc();
      await setNewNum("");
      await setIsEdit(false);
    }catch (error) {
      console.error("Error:", error);
    }
  }
  const cancelNumber = () => {
    console.log("the cancel number");


    setIsEdit(false);
    setNewNum("");
  }

  useEffect(() => {
    // fetch registration data from database

    console.log(currentUser.email);
    const getData = async () => {
      const q = query(
        collection(db, 'users'),
        where('email', '==', currentUser.email)
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        // console.log(data[0].score);
        // setScore(data[0].score);
        let result = (({ id, name, fathersName, email, phoneNumber, age, gender, address, district, city, state, pinCode }) => ({ id, name, fathersName, email, phoneNumber, age, gender, address, district, city, state, pinCode }))(data[0]);
        console.log(result);
        setData(result);
        console.log(result)
        // console.log(typeof data )
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
        <div>
          <Sidebar isSidebar={isSidebar} />
        </div>
        <div className='flex-1 overflow-x-auto'>
          <div className='text-center'>
            <Typography variant='h5' color={colors.greenAccent[400]}>
              View and Edit Registration
            </Typography>
          </div>
          <hr class='h-px my-8 bg-gray-200 border-2 dark:bg-gray-700'></hr>

          <div className='flex flex-col'>
            <div className='-my-4 overflow-x-auto'>
              <div className='py-6 align-middle inline-block min-w-full pl-4 pr-4'>
                <div className='shadow overflow-hidden border-b border-gray-200 h-[500px] overflow-y-auto sm:rounded-lg'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <tbody className='bg-white divide-y divide-gray-200'>
                      {data &&
                        Object.keys(data).map((item, index) => (
                          <tr key={index}>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider'>
                              {item}
                            </th>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>
                                    {item === 'phoneNumber' && (
                                      <>
                                        {data[item]}
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;


                                        <button
                                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                          // padding="0px"
                                          // variant='outlined'
                                          // color='primary'
                                          // size='small'
                                          onClick={() => handleOpenBox()}

                                        >
                                          Edit
                                        </button>



                                        {isEdit ?
                                          (



                                            <span>
                                              &nbsp;
                                              &nbsp;
                                              &nbsp;

                                              <input
                                                type="number"
                                                id="phoneNumber"
                                                name="phoneNumber"
                                                placeholder="Enter phone number"
                                                value={newNum}
                                                onChange={setNewPhoneNumber}
                                              />
                                              <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                                // padding="0px"
                                                // variant='outlined'
                                                // color='primary'
                                                // size='small'
                                                onClick={storeNumber}
                                              >
                                                Submit
                                              </button>

                                              &nbsp;
                                              &nbsp;
                                              &nbsp;

                                              <button
                                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                                // padding="0px"
                                                // variant='outlined'
                                                // color='primary'
                                                // size='small'
                                                onClick={cancelNumber}
                                              >
                                                Cancel
                                              </button>

                                            </span>


                                          )
                                          :
                                          (
                                            <p></p>
                                          )

                                        }

                                      </>
                                    )}
                                    {item !== 'phoneNumber' && data[item]}
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
};


export default Candidate_ViewRegistration;
