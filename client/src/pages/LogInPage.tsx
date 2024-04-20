import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import '../Styles/Loginpage.css';

const ImageDescription: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('url', { email, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error in your login:', error);
    }
  };  

  const handleSpaceClick = (role: string) => {
    if(role === 'admin') {
      console.log('Admin clicked');
    } else if (role === 'employee') {
      console.log('Employee clicked');
    } else {
      console.error('Unknown role');
    }
  };
  
  return (
    <section>
      <div className="center">
        <div className='Images'>
          <img className='img2' src="Image2.png" alt='Image2' onClick={() => handleSpaceClick('admin')}/>
          <p>Admin</p>
          <img className='img3' src="Image3.png" alt='Image3' onClick={() => handleSpaceClick('employee')}/>
          <p className='employeur'>Employee</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="control">
            <label>Email</label>
            <input type="email" required value={email} onChange={handleEmailChange} />
          </div>
          <div className="control password-control">
            <label>Password</label>
            <div className="password-input-container">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={handlePasswordChange} />
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"}
              </button> 
            </div>
          </div>
          <div className="button">
            <button id='retour'>Retourner</button>
            <button type="submit" id='continue'>Continue</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ImageDescription;
