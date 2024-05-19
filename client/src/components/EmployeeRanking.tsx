import { useState, useEffect } from "react";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import swal from "sweetalert";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  points: number;
  // Add other properties as needed
}

function EmployeeRanking({ userId, idEmployee }: any) {
  const [employeurs, setEmployeurs] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
      try {
        const res = await axiosClient.get(`/firstFiveEmployees/${userId}`, {
          headers,
        });
        setEmployeurs(res.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Retry the request after a delay (e.g., 5 seconds)
        setTimeout(fetchEmployees, 5000);
        swal({
          title: "Error!",
          text: "something went wrong while fetching employees",
          icon: "error",
          buttons: {
            confirm: {
              text: "OK",
              value: true,
            },
          },
        });
      }
    };

    fetchEmployees();
  }, []);

  // Define emojis for different rankings
  const emojis = ["🥇", "🥈", "🥉", "🎖️"];

  return (
    <div className="container w-50 mx-auto model--EmployeeRanking">
      <div
        className="row align-items-center gap-2 modal-dialog"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="pointer text-center">Employeurs</h3>
        {employeurs.length > 0 &&
          employeurs.map((employeur, index) => (
            <div
              className={`row ${
                idEmployee == employeur.id && "highlighted__employee"
              }`}
              key={employeur.id}
            >
              <div className="col-3 icon pointer">
                <IoPerson />
              </div>
              <div className="col-4">{employeur.full_name}</div>
              <div className="col-3">{employeur.points} pt</div>
              <div className="col-2">
                {employeur.points === 0 ? "" : emojis[index] || "🎖️"}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default EmployeeRanking;
