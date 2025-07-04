import { useNavigate } from "react-router-dom";
import { userService } from "../services/user.service";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await userService().logoutUser();
    navigate("/login");
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default LogoutButton;
