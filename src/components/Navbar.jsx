import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { toggleNavbar } from "../redux/service/navbarSlice";
import SearchInput from "./SearchInput";
import UserMenu from "./UserMenu";

const Navbar = () => {
	const isOpen = useSelector((state) => state.navbar.isOpen);
	const dispatch = useDispatch();

	return (
		<>
			{/* NAVBAR */}
			<nav className="bg-white shadow p-2 md:p-5 flex items-center justify-between space-x-5 w-screen">
				<div className="flex items-center space-x-3">
					<div onClick={() => dispatch(toggleNavbar())} className="">
						{isOpen ? (
							<AiOutlineMenu
								className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}
							/>
						) : (
							<AiOutlineMenu
								className={`text-xl hover:bg-[#3c404314] cursor-pointer w-10 h-10 p-3 hover:rounded-full duration-100`}
							/>
						)}
					</div>
					<img
						className="w-[40px] hidden md:block"
						src="https://www.gstatic.com/images/branding/product/2x/contacts_2022_48dp.png"
						alt=""
					/>
					<h1 className="text-[#5f6368] text-2xl">Friends</h1>
					<SearchInput />
				</div>
				<div className="flex items-center lg:space-x-5 space-x-2">
					{/* <img src="https://img.freepik.com/free-icon/user_318-159711.jpg" className='w-10 h-10' alt="" /> */}
					<UserMenu className="w-10 h-10" />
				</div>
			</nav>
			{/* NAVBAR */}

			{/* SIDEBAR */}
			<div
				className={`lg:w-[15rem] absolute top-0 lg:top-auto z-50 text-center bg-white shadow lg:shadow-none shadow-black h-screen lg:h-auto cursor-pointer transition-all duration-500 my-0 lg:my-5 ${
					isOpen ? "left-0" : "left-[-400px]"
				}`}
			>
				<Link to={"/create"}>
					<div
						className="flex lg:flex-row items-center space-x-2 p-4 ms-0 rounded-3xl hover:shadow-custom"
						style={{
							boxShadow:
								"0 10px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
						}}
					>
						<svg
							className="me-1"
							width="36"
							height="36"
							viewBox="0 0 36 36"
						>
							<path fill="#34A853" d="M16 16v14h4V20z"></path>
							<path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
							<path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
							<path fill="#EA4335" d="M20 16V6h-4v14z"></path>
							<path fill="none" d="M0 0h36v36H0z"></path>
						</svg>
						<h1 className="text-xl">Create Contacts</h1>
					</div>
				</Link>

				<div className="flex lg:hidden items-center ms-2 mt-2 space-x-3">
					<img
						src="https://logodownload.org/wp-content/uploads/2014/09/google-logo-1.png"
						className="h-6"
						alt=""
					/>
					<span className="text-2xl">Friends</span>
					<AiOutlineClose
						className="ms-2"
						onClick={() => dispatch(toggleNavbar())}
					/>
				</div>

				<div className="">
					<ul className="space-y-0 mt-6">
						<NavLink
							to="/"
							className="space-x-5 flex items-center p-3 px-5 text-xl"
						>
							<BsFillPersonFill className="" />
							<p className="">Contacts</p>
						</NavLink>

						<NavLink
							to="/other"
							className="space-x-5 flex items-center p-3 px-5 text-xl"
						>
							<BiArchiveIn className="" />
							<p className="">Other contacts</p>
						</NavLink>
					</ul>
				</div>
			</div>
			{/* SIDEBAR */}
		</>
	);
};

export default Navbar;
