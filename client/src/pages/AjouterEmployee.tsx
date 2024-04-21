import React, { useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './AjouterEmployee.css';

interface ImageDescriptionProps {
  apiUrl: string; // Exemple de prop pour une URL API
}

const ImageDescription: React.FC<ImageDescriptionProps> = ({ apiUrl }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [genre, setGenre] = useState<string>('homme');

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setGenre(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(apiUrl, { name, email, password, genre });
      console.log(response.data);
    } catch (error) {
      console.error('Error in your login:', error);
    }
  };

  return (
    <section>
      <div className='main-add'></div>
      <div className="center">
        <div className='Images'>
          <img className='img2' src="Image141.png" alt='Image2' />
        </div>
        <form onSubmit={handleLogin}>
          <div className="control">
            <label>Nom Complet</label>
            <input type="text" value={name} onChange={handleNameChange} />
          </div>
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
          <div className="control selectGenre">
            <label>Genre</label>
            <select value={genre} onChange={handleGenreChange}>
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div className="button">
            <button id='retour' type="button">Retourner</button>
            <button type="submit" id='continue'>Continue</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ImageDescription;
