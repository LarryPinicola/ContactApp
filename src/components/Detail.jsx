import Cookies from "js-cookie";
import { Link, useParams } from "react-router-dom";
import { useGetSingleContactQuery } from "../redux/Api/contactListApi";
import { Loader } from "@mantine/core";
import { BsPersonCircle } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";

const Detail = () => {
	const token = Cookies.get("token");
	const { id } = useParams();
	const { data, isLoading } = useGetSingleContactQuery({ id, token });

	console.log(data);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader color="grape" variant="dots" />
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center h-screen bg-gradient-to-r from-[#e5e5f6] to-blue-500">
			<div className=" xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded-lg p-[2.9rem]">
				<h1 className="text-center text-2xl font-semibold">
					Contact Detail
				</h1>
				<div className=" flex gap-5 items-center ">
					<BsPersonCircle className="text-2xl text-blue-900" />
					<h1 className="text-xl">{data?.contact?.name}</h1>
				</div>
				<div className=" flex gap-5 items-center">
					<TfiEmail className="text-2xl text-blue-900" />
					<h1 className="text-xl">{data?.contact?.email}</h1>
				</div>
				<div className=" flex gap-5 items-center">
					<BsTelephone className="text-2xl text-blue-900" />
					<h1 className="text-xl">{data?.contact?.phone}</h1>
				</div>
				<div className=" flex gap-5 items-center">
					<FaRegAddressCard className="text-2xl text-blue-900" />
					<h1 className="text-xl">{data?.contact?.address}</h1>
				</div>
				<div className="flex justify-around items-center">
					<Link to={"/"}>
						<button className="bg-blue-600 transition duration-300 text-white hover:bg-gray-500 px-4 py-1 rounded-lg w-24 md:w-32 lg:w-32 h-12 mx-auto block">
							Back
						</button>
					</Link>
					<Link to={`/edit/${id}`}>
						<button className="bg-gray-500 transition duration-300 text-white hover:bg-blue-600 px-4 py-1 rounded-lg w-24 md:w-32 lg:w-32 h-12 mx-auto block">
							Edit
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Detail;
