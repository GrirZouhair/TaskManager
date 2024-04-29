import { useState, useEffect } from "react";
import { axiosClient } from "../Api/axios";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";
import { headers } from "../functions/getHeaders";
import swal from "sweetalert";

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

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const res = await axiosClient.get("/firstFiveEmployees", {
  //         headers,
  //       });
  //       setEmployeurs(res.data.employees);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des employés:", error);
  //       // Retry the request after a delay (e.g., 5 seconds)
  //       setTimeout(fetchEmployees, 5000);
  //       swal({
  //         title: "Error!",
  //         text: "something went wrong while fetching employees",
  //         icon: "error",
  //         buttons: {
  //           confirm: {
  //             text: "OK",
  //             value: true,
  //           },
  //         },
  //       });
  //     }
  //   };

  //   fetchEmployees();
  // }, []);

  const Redirect = () => {
    navigate("/manageEmployees");
  };

  return (
    <div className="parent col-8 col-lg-4">
      <div
        className="child row align-items-center gap-2"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="pointer text-center" onClick={Redirect}>
          Employeurs
        </h3>
        {employeurs.length > 0 &&
          employeurs.map((employeur) => (
            <>
              <div className="col-3 icon pointer">
                <IoPerson onClick={Redirect} />
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
