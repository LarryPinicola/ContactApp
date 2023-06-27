import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ImSpinner2 } from "react-icons/im";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	useEditContactMutation,
	useGetSingleContactQuery,
} from "../redux/Api/contactListApi";
import { CreateContactSchema } from "../schemas/createContactSchema";
import { BsPersonCircle } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import { BsTelephone } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";

const Edit = () => {
	const [isLoading] = useState(false);

	const token = Cookies.get("token");
	const { id } = useParams();
	const { data } = useGetSingleContactQuery({ id, token });
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [address, setAddress] = useState("");

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(CreateContactSchema),
		defaultValues: {
			name,
			email,
			phone,
			address,
		},
	});

	useEffect(() => {
		setName(data?.contact?.name);
		setPhone(data?.contact?.phone);
		setEmail(data?.contact?.email);
		setAddress(data?.contact?.address);

		if (data) {
			setValue("name", data?.contact?.name);
			setValue("phone", data?.contact?.phone);
			setValue("email", data?.contact?.email);
			setValue("address", data?.contact?.address);
		}
	}, [data, setValue]);

	// const {register,handleSubmit} = useForm();
	const nav = useNavigate();

	const [UpdateContact] = useEditContactMutation();

	const updateHandler = async (data) => {
		const result = await UpdateContact({ id, contact: data, token });

		if (result.data.success) {
			nav("/");
		}
	};

	return (
		<div>
			<div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#e5e5f6] to-blue-500">
				<div className="xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded-lg p-[2.9rem]">
					<form onSubmit={handleSubmit(updateHandler)}>
						<h1 className="text-3xl text-blue-700 font-semibold text-center mb-5">
							Create Your Contact
						</h1>
						<div className="space-y-5">
							<div className="mb-5">
								<div className="flex items-center gap-2">
									<BsPersonCircle className="text-2xl text-blue-800" />
									<input
										defaultValue={name}
										className="border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500"
										type="text"
										placeholder="Enter Your UserName"
										{...register("name")}
									/>
								</div>
								{errors.name?.message && (
									<ErrorMessage
										message={errors.name.message}
									/>
								)}
							</div>

							<div className="mb-5">
								<div className="flex items-center gap-2">
									<BsTelephone className="text-2xl text-blue-800" />
									<input
										defaultValue={phone}
										onChange={(e) =>
											setPhone(e.target.value)
										}
										className="border rounded-lg shadow-xl outline-0 p-4 w-full text-violet-500"
										type="tel"
										placeholder="Enter Your Phone"
										{...register("phone")}
									/>
								</div>
								{errors.phone?.message && (
									<ErrorMessage
										message={errors.phone.message}
									/>
								)}
							</div>

							<div className="mb-5">
								<div className="flex items-center gap-2">
									<TfiEmail className="text-2xl text-blue-800" />
									<input
										defaultValue={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										className="border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500"
										type="email"
										placeholder="Enter Your email"
										{...register("email")}
									/>
								</div>
								{errors.email?.message && (
									<ErrorMessage
										message={errors.email.message}
									/>
								)}
							</div>

							<div className="mb-5">
								<div className="flex items-center gap-2">
									<FaRegAddressCard className="text-2xl text-blue-800" />
									<input
										defaultValue={address}
										onChange={(e) =>
											setAddress(e.target.value)
										}
										className="border rounded-lg p-4 w-full shadow-xl outline-0 text-violet-500"
										type="text"
										placeholder="Enter Your Address"
										{...register("address")}
									/>
								</div>
								{errors.address?.message && (
									<ErrorMessage
										message={errors.address.message}
									/>
								)}
							</div>

							<div className="flex">
								<button
									type="submit"
									className={`bg-blue-600 text-white hover:bg-gray-500 px-4 py-1 rounded-lg w-28 md:w-44 lg:w-44 h-14 mx-auto block transition duration-300 ${
										isLoading && "btn-disabled"
									}`}
								>
									{isLoading ? (
										<ImSpinner2 className="animate-spin mx-auto h-5 w-5" />
									) : (
										"Update Contact"
									)}
								</button>
								<Link to={"/"}>
									<button className="py-1 px-4 h-14 bg-gray-500 rounded-lg text-white">
										Back
									</button>
								</Link>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

function ErrorMessage({ message }) {
	return <h2 className="text-red-500 text-semibold ml-2">{message}</h2>;
}

export default Edit;
