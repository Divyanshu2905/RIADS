import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Typography from '@mui/material/Typography';
import html2pdf from 'html2pdf.js';

import cert from './certificate_template.jpg';
// import trial2 from './trial2.png';

const Certificate = ({
  name,
  relative,
  address,
  admissionDate,
  serialNumber,
  startDate,
  endDate,
  issueDate,
  certificateNumber,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1075,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const canvasRef = useRef(null);
  const downloadBtnRef = useRef(null);
  //   const [image, setImage] = useState(new Image());
  const image = new Image();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    image.crossOrigin = 'anonymous';
    image.src = cert;
    // image.src =
    //   'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png';

    image.onload = function () {
      drawImage(ctx);
    };
  }, []);

  const drawImage = (ctx) => {
    ctx.drawImage(
      image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctx.font = '19px times new roman';
    ctx.fillStyle = 'black';
    ctx.fillText(name, 280, 340);
    ctx.fillText(relative, 680, 340);
    ctx.fillText(address, 165, 383);
    ctx.fillText(admissionDate, 390, 426);
    ctx.fillText(serialNumber, 140, 469);
    ctx.fillText(startDate, 400, 512);
    ctx.fillText(endDate, 730, 512);
    ctx.fillText(issueDate, 170, 605);
    ctx.fillText(certificateNumber, 465, 605);

    // const overlayImage = new Image();
    // overlayImage.src = trial2;
    // overlayImage.onload = function () {
    //   ctx.drawImage(overlayImage, 465, 605, 100, 100);
    // };
  };

  const handleDownloadClick = () => {
    // const canvas = canvasRef.current;
    // const dataUrl = canvas.toDataURL('image/jpg');
    // downloadBtnRef.current.href = dataUrl;
    // downloadBtnRef.current.download = 'Certificate - ' + name;

    const canvas = canvasRef.current;
    const pdfOptions = {
      margin: [10, 15, 10, 15], //top, left, buttom, right,
      // margin:0,
      filename: 'Certificate_' + name + '.pdf',
      image: { type: 'jpeg', quality: 0.99 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };

    html2pdf().from(canvas).set(pdfOptions).save();
  };

  return (
    <>
      <Box sx={style}>
        <div>
          <button
            type='button'
            class='bg-[#c54545] px-2 py-1.5 my-1.5 text-white hover:bg-[#963535] transition-colors shadow-md rounded-md'
            style={{
                position: "relative",
                left: `440px`,
                bottom: `10px`
            }}
            ref={downloadBtnRef}
            onClick={handleDownloadClick}
          >
            <FileDownloadIcon/> Download 
          </button>
          <div>
            <canvas
              ref={canvasRef}
              id='canvas'
              width='1000'
              height='700'
              style={{ border: '2px solid black' }}
            ></canvas>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Certificate;
