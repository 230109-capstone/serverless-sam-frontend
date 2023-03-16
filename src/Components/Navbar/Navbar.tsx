import React from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../redux/slices/userSlice";
import { AppDispatch } from "../../redux/Store";
import logo from '../../Assets/Reimbursement-Image.webp';
import "./Navbar.css";

const Navbar = () => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
  
    return (
        <div className="navBar">
            <div className="navBar__logoContainer">
                <img src={logo} alt="Logo" className="navBar__logo" />
            </div>
            <div className="navBar__buttonContainer">
            <button className="create-reimbursement" onClick={() => navigate('/reimbursements')}>
                Create Reimbursement
            </button>
            <button className="view-reimbursements" onClick={() => navigate('/')}>
                View Reimbursements
            </button>
            <button className="logout" onClick={() => dispatch(logoutUser()).then(() => navigate('/'))}>
                Logout
            </button>
            </div>
        </div>
    )
}
  
export default Navbar;  