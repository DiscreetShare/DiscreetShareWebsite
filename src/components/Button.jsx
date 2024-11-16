import React from "react";

const Button = ({ styles }) => (
 <a href="#upload"> <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}>
    Upload now !
  </button></a>
);

export default Button;
