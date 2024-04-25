import React, { useState, useEffect } from "react";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  // Add other properties as needed
}

function Employeurs() {
  const [employeurs, setEmployeurs] = useState<Employee[]>([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosClient.get("/firstFiveEmployees", {
          headers,
        });
        setEmployeurs(res.data.employees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Retry the request after a delay (e.g., 5 seconds)
        setTimeout(fetchEmployees, 5000);
      }
    };

    fetchEmployees();
  }, []);

  console.log(employeurs);

  return (
    <div className="parent">
      <div className="child row align-items-center gap-2" style={{ backgroundColor: "#FFFFFF" }}>
            <h3 className="pointer text-center">Employeurs</h3>
        {employeurs.length > 0 &&
          employeurs.map((employeur) => (
            <>
              <div className="col-3 icon pointer">
                <IoPerson />
              </div>
              <div className="col-3" key={employeur.id}>
                {employeur.full_name}
              </div>
              <div className="col-3">{employeur.email}</div>
            </>
          ))}
      </div>
    </div>
  );
}

export default Employeurs;
