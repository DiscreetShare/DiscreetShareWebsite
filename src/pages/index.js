import React, { useState } from 'react';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [downloadLink, setDownloadLink] = useState(null);
    const [error, setError] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Consolidated toast notification handler
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
            type: isError ? toast.TYPE.ERROR : toast.TYPE.SUCCESS,
        });
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await axios.post('https://api.discreetshare.com/upload', formData, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    },
                });

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
    setDownloadLink(downloadLink);
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

    // Common button style to avoid repetition
    const buttonStyle = {
        width: "15rem",
        border: "2px solid #fff",
        color: "#fff",
        background: "transparent",
        fontWeight: "700",
    };



    return (
        <>
        <head><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2516216899718507"
     crossorigin="anonymous"></script></head>

            <h2>Anonymous File Upload</h2>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="10vh"
                sx={{ marginTop: "3%" }}
            >
                {!downloadLink && !error && !uploading && (
                    <>
                        <input
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" component="span" style={buttonStyle}>
                                <i className='bx bx-cloud-upload' style={{ color: '#ffffff', fontSize: "25px" }}></i>&nbsp;Upload
                            </Button>
                        </label>
                        {uploadProgress > 0 && <LinearProgress variant="determinate" value={uploadProgress} />}
                    </>
                )}
                {downloadLink && (
                    <Button variant="contained" onClick={handleCopyClick} style={buttonStyle}>
                        <i className='bx bxs-copy'></i>&nbsp;Copy
                    </Button>
                )}
                {error && (
                    <Button variant="contained" style={{ ...buttonStyle, border: "2px solid red", color: "red" }}>
                        <i className='bx bx-error'></i>&nbsp;ERROR!
                    </Button>
                )}
                {uploading && (
                    <Button variant="contained" style={buttonStyle} disabled>
                        <i className='bx bx-loader-circle'></i>&nbsp;Uploading...
                    </Button>
                )}
            </Box>
            <h2 style={{
                fontSize: "1.25rem",
                lineHeight: "1.2",
                textAlign: "center",
                marginTop: "50px"
            }}>
                Upload your files anonymously and free with DiscreetShare.<br />
                We offer you unlimited filesize limit and unlimited bandwidth speed.<br />
                We remove all information that could potentially trace back to you!<br /><br />
                Developer? Check out our <a href="https://docs.discreetshare.com"
                    className='hovera'
                    style={{
                        color: "grey",
                    }}>API</a> Wanna report a file? <a href="mailto:abuse@discreetshare.com?subject=Abuse%20Report"
                        className='hovera'
                        style={{
                            color: "grey",
                        }}>Submit Abuse</a> Join us on <a href="https://discord.gg/CVxaB3rPuJ"
                            className='hovera'
                            style={{
                                color: "grey",
                            }}>discord</a> See our <a href="https://status.discreetshare.com"
                            className='hovera'
                            style={{
                                color: "grey",
                            }}>status page
                                </a><br></br>Check out what we keep track of on this <a href="https://tracking.discreetshare.com"
                            className='hovera'
                            style={{
                                color: "grey",
                            }}>website</a><br></br>Check out our <a href="https://tracking.discreetshare.com"
                            className='hovera'
                            style={{
                                color: "grey",
                            }}>blog</a> to know what is going on with us.
            </h2>
            <ToastContainer />
        </>
    );
};

export default FileUpload;
