import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Make sure you import 'ToastContainer' too
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

const FileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadLink, setDownloadLink] = useState(null);
    const [error, setError] = useState(false);

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://api.discreetshare.com/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            },
        })
        .then((response) => {
            if (response.data.status === "size") {
                toast.error('Your file size is bigger than 1 GB!', { // Use 'toast.error'
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setError(true); // Set error to true
            } else if (response.data.status === "true") {
                toast.success('Successfully uploaded your file!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setDownloadLink(response.data.downloadLink);
            } else if (response.data.status === false) {
                toast.error('An error happened, please try again later', { // Use 'toast.error'
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setError(true); // Set error to true
            } else {
                setDownloadLink(response.data.downloadLink);
            }
            fileInput.value = '';
        })
        .catch((error) => {
            console.error("An error occurred:", error);
            setError(true); // Set error to true
        });
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(downloadLink);
        toast.success('Download link copied!', {
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

    return (
        <>
            <h2>Anonymous File Upload</h2>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
                sx={{
                    marginTop: "3%",
                }}
            >
                {!downloadLink && !error && (
                    <>
                        <input
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            multiple
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" style={{
                                width: "15rem",
                                border: "2px solid #fff",
                                color: "#fff",
                                background: "transparent",
                                fontWeight: "700"
                            }}>
                            <i className='bx bx-cloud-upload' style={{ color: '#ffffff', fontSize: "25px" }}></i>&nbsp;Upload
                            </Button>
                        </label>
                        {uploadProgress > 0 && (
                            <LinearProgress variant="determinate" value={uploadProgress} />
                        )}
                    </>
                )}
                {downloadLink && (
                    <Button variant="contained" onClick={handleCopyClick} style={{
                        width: "15rem",
                        border: "2px solid #fff",
                        color: "#fff",
                        background: "transparent",
                        fontWeight: "700"
                    }}>
                    <i className='bx bxs-copy'></i>&nbsp;Copy
                    </Button>
                )}
                {error && (
                    <Button variant="contained" style={{
                        width: "15rem",
                        border: "2px solid red", // Red border for error
                        color: "red", // Red text color for error
                        background: "transparent",
                        fontWeight: "700"
                    }}>
                    <i className='bx bx-error'></i>&nbsp;ERROR!
                    </Button>
                )}
            </Box>
            <h2 style={{
                fontSize: "20px !important",
                lineHeight: "1.2",
                textAlign: "center",
                marginTop: "50px"
            }}>
                Upload your files anonymously and free with DiscreetShare.<br />
                We offer you a 1 GB filesize limit and unlimited bandwidth speed.<br />
                We prevent getting you from being traced back & delete all information that could help with it!<br /><br />
                Developer? Check out our  <a href="https://docs.discreetshare.com"
                className='hovera'
                style={{
                    color: "grey",
                }}>API</a> Wanna report a file? <a href="https://forms.gle/5ZR7ixgjqYa9UawZA"
                className='hovera'
                style={{
                    color: "grey",
                }}>Submit Abuse</a>
            </h2>
            <ToastContainer /> {/* Include the ToastContainer */}
        </>
    );
};

export default FileUpload;
