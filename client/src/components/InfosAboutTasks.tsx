import React from "react";
import "../Styles/InfosAboutTasks.css";

const DashboardAdmin: React.FC = () => {
  const infoDivContainerStyle = {
    width: "100%",
    backgroundColor: "#fff",
  };
  const infoParentStyle = {
    padding: '100px 150px'
  }
  return (
    <section className="w-100 my-5">
      <div className="w-100" style={{marginLeft: '40px'}}>
        <div className="d-flex flex-wrap justify-content-around">
          <div className="parent" style={infoParentStyle}>
            <div
              className="d-flex child justify-content-center align-items-center"
              style={infoDivContainerStyle}
            >
              <img className="infoIcon" src="Image31.png" alt="Image31" />
              <div>
                <div className="h5">Les tâches à accomplir ce mois-ci</div>
                <div className="text-center">31</div>
              </div>
            </div>
          </div>
          <div className="parent" style={infoParentStyle}>
            <div
              className="d-flex child justify-content-center align-items-center"
              style={infoDivContainerStyle}
            >
              <img className="infoIcon" src="Image4.png" alt="Image4" />
              <div>
                <div className="h5">Les tâches accomplies</div>
                <div className="text-center">21</div>
              </div>
            </div>
          </div>
          <div className="parent" style={infoParentStyle}>
            <div
              className="d-flex child justify-content-center align-items-center"
              style={infoDivContainerStyle}
            >
              <img className="infoIcon" src="Image5.png" alt="Image5" />
              <div>
                <div className="h5">Les tâches à l'échéance</div>
                <div className="text-center">0</div>
              </div>
            </div>
          </div>
          <div className="parent" style={infoParentStyle}>
            <div
              className="d-flex child justify-content-center align-items-center"
              style={infoDivContainerStyle}
            >
              <img className="infoIcon" src="Image6.png" alt="Image6" />
              <div>
                <div className="h5">Les tâches pas encore terminées</div>
                <div className="text-center">10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAdmin;
