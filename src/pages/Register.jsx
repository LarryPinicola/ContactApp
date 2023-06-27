import { useGetRegisterMutation } from "../redux/Api/contactApi";
import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import { RegisterSchema } from "../schemas/registerSchema";

const Register = () => {
  const [getRegister, { isLoading }] = useGetRegisterMutation();

  const nav = useNavigate();

  const form = useForm({
    validate: zodResolver(RegisterSchema),
    initialValues: {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <div className="bg-gradient-to-r from-[#e5e5f6] to-blue-500">
      <div className=" flex justify-center items-center h-screen">
        <div className="flex items-center rounded-lg p-6">
          <img
            className=""
            src="https://cdni.iconscout.com/illustration/premium/thumb/points-out-the-registration-form-in-the-mobile-application-3411138-2844271.png?f=webp"
            alt=""
          />
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                const data = await getRegister(values);
                console.log(data);
                if (data?.data?.success === true) {
                  nav("/login");
                }
              } catch (error) {
                console.log(error);
              }
            })}
            className=" xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l glassmorphic rounded-lg p-7"
          >
            <h2
              className=" flex flex-col text-center justify-center text-gray-500 font-medium text-[32px]
      "
            >
              Hello there! <br />
              <span className=" mt-[-6px] text-[13px]">
                Please sign in here to proceed.
              </span>
            </h2>
            <TextInput
              {...form.getInputProps("name")}
              placeholder="Enter your name"
              variant="filled"
            />
            <TextInput
              {...form.getInputProps("email")}
              placeholder="Enter your email"
              variant="filled"
            />
            <PasswordInput
              {...form.getInputProps("password")}
              placeholder=" Enter your Password"
              variant="filled"
            />
            <PasswordInput
              {...form.getInputProps("password_confirmation")}
              placeholder="Confirm your Password ..."
              variant="filled"
            />
            <div className=" flex gap-1 justify-around">
              <p className=" text-sm select-none text-gray-800">
                Already have an account?
              </p>
              <Link to={"/login"}>
                <p className=" text-sm select-none text-blue-900 cursor-pointer">
                  Login here.
                </p>
              </Link>
            </div>
            <button
              disabled={isLoading && true}
              type="submit"
              className=" bg-blue-600 text-white hover:bg-gray-400 px-4 py-1 transition duration-300 rounded w-40 h-9 mx-auto block"
            >
              {isLoading ? (
                <Loader
                  className=" mx-auto my-auto block"
                  color="white"
                  size="sm"
                />
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
