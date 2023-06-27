import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Routeguard from "../components/Routeguard";
import CreateContact from "../components/CreateContact";
import Detail from "../components/Detail";
import Edit from "../components/Edit";

const Paths = () => {
	return (
		<div>
			<Routes>
				<Route
					path={"/"}
					element={
						<Routeguard>
							{" "}
							<Home />
						</Routeguard>
					}
				/>
				<Route path={"/register"} element={<Register />} />
				<Route path={"/login"} element={<Login />} />
				<Route path={"/create"} element={<CreateContact />} />
				<Route path={"/detail/:id"} element={<Detail />} />
				<Route path={"/edit/:id"} element={<Edit />} />
			</Routes>
		</div>
	);
};

export default Paths;
