import { useEffect, useReducer, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
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

import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import Certificate from './Certificate.js';
import Spinner from '../../../components/Spinner';
const CertificateGenerator = () => {
  const { currentUser } = useAuth();

  const [data, setData] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    // fetch registration data from database

    // console.log(currentUser.email);
    const getData = async () => {
      const q = query(
        collection(db, 'users'),
        where('email', '==', currentUser.email)
      );
      await getDocs(q).then((response) => {
        let data = response.docs.map((ele) => ({ ...ele.data() }));
        // console.log(data[0].score);
        // setScore(data[0].score);

        console.log(data[0]);
        setData(data[0]);
        // console.log(typeof data )
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

  const [OpenModal, setOpenModal] = useState(false);
  const today = new Date();
  const todayISOString = today.toISOString().split('T')[0];
  const initialState = {
    name: data.name,
    relative: data.fathersName,
    address: data.address,
    admissionDate: '09-10-23',
    serialNumber: data.id,
    startDate: '01-01-24',
    endDate: '03-01-24',
    issueDate: todayISOString,
    certificateNumber: '5678567856785678',
  };

  // const [formState, dispatch] = useReducer(reducer, initialState);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleOpenCertificate = (e) => {
    e.preventDefault();
    // const {
    //   name,
    //   relative,
    //   address,
    //   admissionDate,
    //   serialNumber,
    //   startDate,
    //   endDate,
    //   issueDate,
    //   certificateNumber,
    // } = formState;

    // if (
    //   name &&
    //   relative &&
    //   address &&
    //   admissionDate &&
    //   serialNumber &&
    //   startDate &&
    //   endDate &&
    //   issueDate &&
    //   certificateNumber
    // ) {
    console.log('candidate opened certificate ', initialState);
    setOpenModal(true);
    // }
    // setOpenModal(true);
  };

  const handleText = () => {};
  // formState=initialState;
  return (
    <>
      {/* <Button variant="contained"
     color="error"
     sx={
          {
            background: '#c54545',
            marginTop: '1',
            marginBottom: '1',
            // marginLeft: '1.5',
            marginRight: '1.5',
           }
        } onClick={()=>setOpenModal(true)}>Certificate</Button> */}
      <button
        type='button'
        class='bg-[#c54545] px-3 py-2 text-white hover:bg-[#963535] transition-colors shadow-md'
        hover='black'
        onClick={() => setOpenModal(true)}
      >
        Certificate
      </button>
      <>
      {loading ? (
        <>
        <Spinner/>
        </>
      ):(
      <Modal
        open={OpenModal}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Certificate {...initialState} />
      </Modal>)};
      </>
    </>
  );
};

export default CertificateGenerator;
