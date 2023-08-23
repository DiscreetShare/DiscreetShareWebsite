import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast } from 'react-toastify';

const FileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadLink, setDownloadLink] = useState(null);

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('https://api.mycelium-ai.com/upload', formData, {
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            },
        }).then((response) => {
            if (response.data.status === "true") {
                toast.success('successfully uploaded your file!', {
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
            } else {
                setDownloadLink(response.data.downloadLink);
            }
            fileInput.value = '';
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
                {!downloadLink && (
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
                                width: "20rem",
                                border: "2px solid #007bff",
                                color: "#fff",
                                background: "#007bff",
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
                        width: "20rem",
                        border: "2px solid #007bff",
                        color: "#fff",
                        background: "#007bff",
                        fontWeight: "700"
                    }}>
                    <i className='bx bxs-copy'></i>&nbsp;Copy
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
                We offer you a 5 GB filesize limit and unlimited bandwidth.<br />
                We prevent getting you from being traced back & delete all information that could help with it!<br /><br />
                Developer? Check out our  <a href="" 
                className='hovera'
                style={{ 
                    color: "grey",
                }}>API</a>
            </h2>

        </>
    );
};

export default FileUpload;