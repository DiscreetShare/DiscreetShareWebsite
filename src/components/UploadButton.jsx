import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadButton = () => {
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(false);
  const [uploading, setUploading] = useState(false);

  const showToast = (message, isError = false) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('https://api.discreetshare.com/upload', formData);

        const { status, downloadLink } = response.data;
        if (status === "su-201") {
          showToast('Successfully uploaded your file!');
          setDownloadLink(downloadLink);
        } else if (status === "fe-200") {
          showToast('File already exists!');
          setDownloadLink(downloadLink);
        } else if (status === "ud-403") {
          showToast('Sorry, uploads are disabled for now. Please wait until the maintenance ends', true);
          setError(true);
        } else if (status === "fb-410") {
          showToast('File is banned from the service due to non-compliance with legal regulations.');
          setError(true);
        } else {
          showToast('An error happened, please try again later', true);
          setError(true);
        }

      } catch (error) {
        console.error("An error occurred:", error);
        if (error.response && error.response.status === 403 && error.response.data.status === "ud-403") {
          showToast("Sorry, uploads are disabled for now. Please wait until the maintenance ends", true);
        } else {
          showToast('An error happened, please try again later', true);
        }
        setError(true);
      } finally {
        setUploading(false);
        event.target.value = ''; // Clear the input after upload
      }
    }
  };

  const handleCopyClick = () => {
    if (downloadLink) {
      navigator.clipboard.writeText(downloadLink);
      showToast('Download link copied!');
    }
  };

  const handleUploadButtonClick = () => {
    // Trigger click on the hidden file input
    document.getElementById('raised-button-file').click();
  };

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <div style={{ margin: '2rem 0' }}>
          {!downloadLink && !error && !uploading && (
            <>
              <input
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <button
                type="button"
                className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}
                style={{ cursor: 'pointer' }}
                onClick={handleUploadButtonClick}
              >
                <i className='bx bx-cloud-upload' style={{ color: '#ffffff', fontSize: "25px" }}></i>&nbsp;Upload now!
              </button>
            </>
          )}
          {uploading && (
            <button
              type="button"
              className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-gray-500 rounded-[10px] outline-none`}
              style={{ cursor: 'not-allowed' }}
              disabled
            >
              <i className='bx bx-loader-circle'></i>&nbsp;Uploading...
            </button>
          )}
          {downloadLink && (
            <button
              type="button"
              className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none`}
              style={{ cursor: 'pointer' }}
              onClick={handleCopyClick}
            >
              <i className='bx bxs-copy'></i>&nbsp;Copy
            </button>
          )}
          {error && (
            <button
              type="button"
              className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-red-600 rounded-[10px] outline-none`}
              style={{ cursor: 'pointer' }}
            >
              <i className='bx bx-error'></i>&nbsp;ERROR!
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UploadButton;
