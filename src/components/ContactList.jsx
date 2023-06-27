import { useEffect } from "react";
import { Loader, Table } from "@mantine/core";
import {
	useDeleteContactMutation,
	useGetContactQuery,
} from "../redux/Api/contactListApi";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../redux/service/contactSlice";
import { Menu, Button } from "@mantine/core";
import { RiMore2Fill } from "react-icons/ri";

const ContactList = () => {
	const token = Cookies.get("token");
	const { data, isLoading } = useGetContactQuery(token);
	const [deleteContact] = useDeleteContactMutation();
	const contacts = useSelector((state) => state.contactSlice.contacts);
	const searched = useSelector((state) => state.contactSlice.searched);
	const isOpen = useSelector((state) => state.navbar.isOpen);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(addContacts(data?.contacts?.data));
	}, [data, dispatch]);

	// console.log(data);

	const deleteHandler = (id) => {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton:
					"bg-green-700 p-2 px-5 rounded-lg mx-2 text-white",
				cancelButton: "bg-red-700 p-2 px-5 rounded-lg text-white",
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons
			.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "No, cancel!",
				reverseButtons: true,
			})
			.then(async (result) => {
				if (result.isConfirmed) {
					swalWithBootstrapButtons.fire(
						"Deleted!",
						"Your contact has been deleted.",
						"success"
					);

					const { data } = await deleteContact({ id, token });
					console.log(data);
				} else if (
					/* Read more about handling dismissals below */
					result.dismiss === Swal.DismissReason.cancel
				) {
					swalWithBootstrapButtons.fire(
						"Cancelled",
						"Your contact has not been deleted)",
						"error"
					);
				}
			});
	};

	const rows = contacts
		?.filter((item) => {
			if (searched === "") {
				return item;
			} else if (
				item?.name.toLowerCase().includes(searched.toLocaleLowerCase())
			) {
				return item;
			}
		})
		?.map((contact) => {
			return (
				<tr className="contact-list" key={contact?.id}>
					<td className="hidden md:table-cell">
						{contact?.name === null ? "exampleName" : contact?.name}
					</td>
					<td>
						{contact?.email === null
							? "example@gmail.com"
							: contact?.email}
					</td>
					<td className="hidden lg:table-cell">
						{contact?.phone === null ? "-" : contact?.phone}
					</td>
					<td className="hidden lg:table-cell">
						{contact?.address === null ? "-" : contact?.address}
					</td>
					<td className="del-icon">
						<div className="flex justify-end">
							<Menu width={200} shadow="md">
								<Menu.Target>
									<Button variant="outline">
										<RiMore2Fill className="text-2xl" />
									</Button>
								</Menu.Target>

								<Menu.Dropdown>
									<Menu.Item>
										<p
											onClick={() =>
												deleteHandler(contact?.id)
											}
											className=" text-red-700 cursor-pointer"
										>
											Delete
										</p>
									</Menu.Item>

									<Menu.Item target="_blank">
										<Link to={`/detail/${contact?.id}`}>
											<p className="">Detail</p>
										</Link>
									</Menu.Item>

									<Menu.Item target="_blank">
										<Link to={`/edit/${contact?.id}`}>
											<p className="">Edit</p>
										</Link>
									</Menu.Item>
								</Menu.Dropdown>
							</Menu>
						</div>
					</td>
				</tr>
			);
		});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader color="grape" variant="dots" />;
			</div>
		);
	}

	return (
		<>
			<div className=" mt-10 flex gap-5 justify-center">
				{/* <Link to={"/create"}>
          <button className="bg-yellow-400 font-semibold cursor-pointer shadow-xl py-2 px-6 rounded-3xl flex items-center gap-5 ">
            Create New Contact{" "}
            <FiUserPlus className=" text-center text-red-600" />
          </button>
        </Link> */}
				{/* <input
          type="text"
          className="px-6 bg-blue-700 text-white placeholder-yellow-400 shadow-xl rounded-3xl outline-none "
          placeholder="Search"
          value={searched}
          onChange={(e) => dispatch(setSearched(e.target.value))}
        /> */}
			</div>

			<div className="flex justify-center md:justify-start">
				<div
					className={`absolute ${
						isOpen ? "lg:left-[305px]" : "lg:left-0"
					} ${
						isOpen ? "lg:px-0" : "lg:px-3"
					} duration-500 transition-all`}
				>
					<div className="lg:w-[75vw] w-screen  flex justify-start pt-0 md:pt-10 text-white">
						<Table className="">
							<thead className="">
								<tr className="">
									<th className="hidden md:table-cell">
										Name
									</th>
									<th className="">Email</th>
									<th className="hidden lg:table-cell">
										Phone Number
									</th>
									<th className="hidden lg:table-cell">
										Address
									</th>
								</tr>
							</thead>
							<tbody className="">{rows}</tbody>
						</Table>
					</div>
				</div>
			</div>
		</>
	);
};

export default ContactList;
