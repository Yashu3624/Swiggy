import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnNameReact , setBtnNameReact] = useState("Login");
  
  const onlineStatus = useOnlineStatus() ; 

    return (
      <div className="flex justify-between bg-pink-100 shadow-lg sm:bg-yellow-50 lg:bg-green-50 ">
        <div className="logo-container">
          <img
            className="w-56"
            src= {LOGO_URL}
            alt="Logo"
          />
        </div>
        <div className="nav-items">
          <ul className="flex p-4 m-4">
            <li className="p-4">online Status: { onlineStatus ? "✅": "🔴"}</li>
            <li className="p-4"><Link to ="/">Home</Link></li>
            <li className="p-4"><Link to="/about">About Us</Link> </li>
            <li className="p-4"><Link to="/contact">Contact Us</Link></li>
            <li className="p-4"><Link to ="/grocery">Grocery</Link></li>
            <li className="p-4">Cart</li>
            <button className="login" onClick={()=>{
              btnNameReact == "Login" ? setBtnNameReact("Logout"):setBtnNameReact("Login");
            }}> {btnNameReact}</button>

          </ul>
        </div>
      </div>
    );
  };
  export default Header;