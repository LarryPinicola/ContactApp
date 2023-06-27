import { Loader, TextInput } from "@mantine/core";
import { useCreateContactMutation } from "../redux/Api/contactListApi";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useForm, zodResolver } from "@mantine/form";
import { CreateContactSchema } from "../schemas/createContactSchema";
import "../index.css";

const CreateContact = () => {
  const token = Cookies.get("token");

  const [createContact, { isLoading }] = useCreateContactMutation();

  const nav = useNavigate();

  const form = useForm({
    validate: zodResolver(CreateContactSchema),
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <>
      <div className=" flex justify-center items-center h-screen bg-gradient-to-r from-[#e5e5f6] to-blue-500">
        <form
          className=" xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg p-7"
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await createContact({
                token,
                data: values,
              });
              if (data?.success) {
                nav("/");
              }
              console.log(data);
              console.log(values);
            } catch (error) {
              console.log(error);
            }
          })}
        >
          <h1 className=" text-center mb-3 text-blue-600 text-xl font-semibold ">
            Create Contact
          </h1>
          <div className="flex flex-col gap-5">
            <TextInput
              mt="sm"
              label="Name"
              placeholder="Name"
              {...form.getInputProps("name")}
            />
            <TextInput
              mt="sm"
              label="Email"
              placeholder="Email"
              {...form.getInputProps("email")}
            />
            <TextInput
              mt="sm"
              label="Phone Number"
              placeholder="Phone Number"
              {...form.getInputProps("phone")}
            />
            <TextInput
              mt="sm"
              label="Address"
              placeholder="Address"
              {...form.getInputProps("address")}
            />
            <div className="flex ">
              <button
                disabled={isLoading && true}
                type="submit"
                className="bg-blue-600 text-white hover:bg-black px-4 py-1 rounded w-36 h-10 mx-auto block transition duration-300"
              >
                {isLoading ? (
                  <Loader
                    className=" w-10 mx-auto items-center "
                    color="grape"
                    variant="dots"
                  />
                ) : (
                  "Create"
                )}
              </button>
              <Link to={"/"}>
                <button className="bg-purple-400 text-white hover:bg-gray-600 px-4 py-1 rounded w-36 h-10 mx-auto block transition duration-300">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateContact;
