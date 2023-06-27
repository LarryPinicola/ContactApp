import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Routeguard = ({ children }) => {
	const token = Cookies.get("token");
	if (token) {
		return children;
	} else {
		return <Navigate to={"/login"} />;
	}
};

export default Routeguard;
