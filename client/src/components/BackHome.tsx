import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
function BackHome() {
  const navigate = useNavigate();
  return (
    <div className="col-12 p-12" onClick={() => navigate("/adminDashbord")}>
      <AiFillHome className="icon pointer" />
    </div>
  );
}

export default BackHome;
