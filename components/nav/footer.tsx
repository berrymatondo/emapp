import React from "react";
import { MdHome } from "react-icons/md";

const Footer = () => {
  return (
    <div className="sticky bottom-0 py-2 ">
      <div>
        <MdHome size={30} className="text-white" />
      </div>
      <p className="text-xs text-center"> &copy; Berry MATONDO</p>
    </div>
  );
};

export default Footer;
