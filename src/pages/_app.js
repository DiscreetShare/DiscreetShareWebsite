import '@/styles/globals.css';
import Head from 'next/head';
import Navbar from '@/components/navbar';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>DiscreetShare</title>
        <meta name="description" content="Welcome to DiscreetShare, your trusted platform for anonymous and free file uploads. With our service, you can confidently share your files while ensuring your privacy remains intact. We've taken steps to prevent any tracebacks and diligently delete all potentially identifying information, giving you the peace of mind you deserve." />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://api.discreetshare.com/cdn/65c55e0952319df41011cd60" />
        <meta name="twitter:title" content="DiscreetShare" />
        <meta name="twitter:description" content="Welcome to DiscreetShare, your trusted platform for anonymous and free file uploads. With our service, you can confidently share your files while ensuring your privacy remains intact. We've taken steps to prevent any tracebacks and diligently delete all potentially identifying information, giving you the peace of mind you deserve." />
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}
