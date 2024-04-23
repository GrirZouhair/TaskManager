import React, { useState, useEffect } from "react";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";

interface Employee {
  id: number;
  full_name: string;
  email: string;
  // Add other properties as needed
}

function Employeurs() {
  const [employeurs, setEmployeurs] = useState<Employee[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

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
    <div className="row gap-4">
      {employeurs.length > 0 &&
        employeurs.map((employeur) => (
          <>
            <div className="col-4" key={employeur.id}>
              {employeur.full_name}
            </div>
            <div className="col-4">{employeur.email}</div>
          </>
        ))}
    </div>
  );
}

export default Employeurs;
