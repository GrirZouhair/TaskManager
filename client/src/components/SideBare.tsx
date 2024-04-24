import React from 'react';
import '../Styles/SideBare.css';
import img__add_emp from "../assets/image 14.png";
import img__task from "../assets/image 15.png";
import img__password from "../assets/image 13.png";
import img__email from "../assets/image 12.png";
import img__logout from "../assets/image 11.png";
const Sidebar = () => {
    return (
        <div className="sidebar">
            <a href="#">
                <img src={img__add_emp} alt="" />
                <span>Ajoute Employeurs</span>
            </a>
            <a href="#">
                <img src={img__task} alt="" />
                <span>Assigner Une Tâche</span>
            </a>
            <a href="#">
                <img src={img__password} alt="" />
                <span>Change Password</span>
            </a>
            <a href="#">
                <img src={img__email} alt="" />
                <span>Change Email</span>
            </a>
            <a href="#">
                <img src={img__logout} alt="" />
                <span>Se Déconnecté</span>
            </a>

        </div>
    );
};

export default Sidebar;