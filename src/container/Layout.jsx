import { Outlet } from "react-router-dom";

const Layout = () => {
	return (
		<div>
			{/* Add navbar and sidebar here */}
			<Outlet />
		</div>
	);
};

export default Layout;
