import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/HeaderEmployee.css';

const HeaderEmployee: React.FC = () => {
  const [messageVisible, setMessageVisible] = useState<boolean>(true);
  const [image33Visible, setImage33Visible] = useState<boolean>(true);
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleImageClick = (): void => {
    setMessageVisible(false);
    setImage33Visible(false);
  };

  const toggleSidebar = (): void => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleSidebarPassword = (): void => {
    navigate('/changePassword'); 
  };

  const handleSidebarEmail = (): void => {
    navigate('/changeEmail'); 
  };
  const handleSidebarLogout = (): void => {
    navigate('/'); 
  };

  const handleHome = (): void => {
    navigate('/'); 
  };

  return (
    <div className="employee-dashboard">
      <div className="container-1">
        <div className="container-2">
          <img className='image-34' src='Image34.png' alt='Image34'/>
          <div className="bonjour">
            Bonjour monsieur ALI ALAOUI
          </div>
        </div>
        <img className='image-35' src='Image35.png' alt='Image35' onClick={handleHome}/>
        <img className='image-32' src='Image32.png' alt='Image32' onClick={toggleSidebar}/>
      </div>
      <div className="line-2"></div>
      {sidebarVisible && (
        <div className="sidebar">
          <div className="sidebar-item" onClick={handleSidebarEmail}>
            Changer l'email
          </div>
          <div className="sidebar-item" onClick={handleSidebarPassword}>
            Changer le mot de passe
          </div>
          <div className="sidebar-item" onClick={handleSidebarLogout}>
            Déconnexion
          </div>
        </div>
      )}
      <div className="container">
        {messageVisible && (
          <div className="rappel-msg">
            Dans le cas où la date limite d'une tâche est proche, un e-mail vous sera envoyé à titre de rappel
          </div>
        )}
        {image33Visible && (
          <img className='image-33' src='Image33.png' alt='Image33' onClick={handleImageClick}/>
        )}
      </div>
    </div>
  );
};

export default HeaderEmployee;
