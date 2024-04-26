import React from 'react';
import "../Styles/InfosAboutTasks.css";

const DashboardAdmin: React.FC = () => {
  return (
    <section className='main-header'>
      <div className='parent'>
        <div className='child'>
          <div className='div1'>
            <img src='Image31.png' alt='Image31' />
            <h4>Les tâches à accomplir ce mois-ci</h4>
            <p>31</p>
          </div>
          <div className='div2'>
            <img src='Image4.png' alt='Image4' />
            <h4>Les tâches accomplies</h4>
            <p>21</p>
          </div>
          <div className='div3'>
            <img src='Image5.png' alt='Image5' />
            <h4>Les tâches à l'échéance</h4>
            <p>0</p>
          </div>
          <div className='div4'>
            <img src='Image6.png' alt='Image6' />
            <h4>Les tâches pas encore terminées</h4>
            <p>10</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardAdmin;
