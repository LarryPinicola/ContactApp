import { GoSearch } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setSearched } from "../redux/service/contactSlice";

export default function SearchInput() {
	const dispatch = useDispatch();

	const searched = useSelector((state) => state.contactSlice.searched);

	const handleChange = (e) => {
		dispatch(setSearched(e.target.value));
	};

	const handleReset = () => {
		dispatch(setSearched(""));
	};

	return (
		<div className="flex h-12 items-center gap-4 px-3 py-2 border-2 focus-within:border-blue-500 rounded-lg">
			<label htmlFor="search_input">
				<GoSearch className="text-lg text-gray-600" />
			</label>
			<input
				value={searched}
				onChange={handleChange}
				id="search_input"
				type="text"
				placeholder="Search..."
				className="border-0 outline-none"
			/>
			{!!searched.length && (
				<button
					onClick={handleReset}
					className="w-7 h-7 text-gray-700 transition-colors hover:bg-gray-100 focus:bg-gray-50 outline-none rounded-full flex justify-center items-center"
				>
					<IoClose className="text-xl" />
				</button>
			)}
		</div>
		// <div className="lg:space-x-24">
		// 	<GoSearch
		// 		onClick={() => setClick(!click)}
		// 		className="absolute lg:top-[24px] md:top-[9px] top-[3px] lg:ms-[7rem] md:ms-3 hover:bg-[#3c404314] cursor-pointer w-12 h-12 lg:w-10 lg:h-10 p-3 hover:rounded-full duration-100"
		// 	/>
		// 	<input
		// 		type="text"
		// 		placeholder="Search Name"
		// 		value={searched}
		// 		onChange={(e) => dispatch(setSearched(e.target.value))}
		// 		className={`lg:w-[600px] md:w-[400px] w-[12rem] p-3 bg-[#3c404314] outline-none rounded-lg md:px-16 pe-1 cursor-pointer absolute top-[5px] left-0 md:static bg-white ms-2 lg:ms-auto shadow shadow-gray-950 ${
		// 			click ? "hidden" : "block"
		// 		} md:bg-transparent md:block`}
		// 	/>
		// 	<AiOutlineClose
		// 		onClick={() => setClick(!click)}
		// 		className={`absolute top-[20px] left-[170px] md:static ${
		// 			click ? "hidden" : "block"
		// 		} md:hidden`}
		// 	/>
		// </div>
	);
}
