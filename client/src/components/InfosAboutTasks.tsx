import { useState, useEffect } from "react";
import { fetchData } from "../functions/getStatistics";
import "../Styles/InfosAboutTasks.css";

interface TaskStatistics {
  OverDeadLine: number;
  finishedTask: number;
  unFinishedTask: number;
  numberOfTasks: number;
}

const DashboardAdmin: React.FC = () => {
  const [tasksStatistics, setTaskStatistics] = useState<TaskStatistics | null>({
    OverDeadLine: 0,
    finishedTask: 0,
    unFinishedTask: 0,
    numberOfTasks: 0,
  });

  const infoDivContainerStyle = {
    width: "100%",
    backgroundColor: "#fff",
  };
  const infoParentStyle = {
    padding: "100px 150px",
  };

  useEffect(() => {
    const fetch = async () => {
      const data: any = await fetchData();
      setTaskStatistics(data);
    };
    fetch();
  }, []);
  return (
    <section className="w-100 my-5">
      <div className="w-100" style={{ marginLeft: "40px" }}>
        <div className="d-flex flex-wrap justify-content-around">
          <div className="parent" style={infoParentStyle}>
            <div
              className="d-flex child justify-content-center align-items-center"
              style={infoDivContainerStyle}
            >
              <img className="infoIcon" src="Image31.png" alt="Image31" />
              <div>
                <div className="h5">Les tâches à accomplir ce mois-ci</div>
                <div className="text-center">
                  {tasksStatistics?.numberOfTasks}
                </div>
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
                <div className="text-center">
                  {tasksStatistics?.finishedTask}
                </div>
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
                <div className="text-center">
                  {tasksStatistics?.OverDeadLine}
                </div>
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
                <div className="text-center">
                  {tasksStatistics?.unFinishedTask}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardAdmin;
