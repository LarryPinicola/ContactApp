import { Loader, PasswordInput, TextInput } from "@mantine/core";
import { useGetLoginMutation } from "../redux/Api/contactApi";
import { Link, useNavigate } from "react-router-dom";
import { useForm, zodResolver } from "@mantine/form";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/service/authSlice";
import { LoginSchema } from "../schemas/loginSchema";

const Login = () => {
  const [getLogin, { isLoading }] = useGetLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    validate: zodResolver(LoginSchema),
    initialValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  if (isLoading) {
    <div className="">
      <h1 className=" flex justify-center items-center h-screen">Loading</h1>
    </div>;
  }

  if (isLoading) {
    <div className="">
      <h1 className=" flex justify-center items-center h-screen">Loading</h1>
    </div>;
  }

  return (
    <div className="bg-gradient-to-r from-[#e5e5f6] to-blue-500">
      <div className=" flex justify-center items-center h-screen">
        <div className="space-x-10 flex items-center p-5">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-7964197-6381807.png?f=webp"
            alt=""
          />
          <form
            onSubmit={form.onSubmit(async (values) => {
              try {
                const { data } = await getLogin(values);
                console.log(data);
                dispatch(
                  addUser({
                    user: data?.user,
                    token: data?.token,
                  })
                );
                if (data?.success === true) {
                  nav("/");
                }
              } catch (error) {
                console.log(error);
              }
            })}
            className=" xl:w-96 md:w-96 w-80 flex flex-col gap-8 bg-[#ffffff19] backdrop-blur-sm border-t-[rgba(255,255,255,0.5)] border-l-[rgba(255,255,255,0.5)] border-solid border-t border-l rounded-lg p-[3.9rem]"
          >
            <h2
              className=" flex flex-col text-center justify-center text-gray-500 font-medium text-[28px]
      "
            >
              Welcome back! <br />
              <span className=" mt-[-6px] text-[15px]">
                Please login here to continue.
              </span>
            </h2>
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
            <div className=" flex gap-1">
              <p className="text-sm select-none text-gray-600">New to our service?</p>
              <Link to={"/register"}>
                <p className=" select-none text-sm text-blue-900 cursor-pointer">
                  Register here.
                </p>
              </Link>
            </div>

            {/* login */}
            <button
              disabled={isLoading && true}
              type="submit"
              className=" bg-blue-800 transition duration-300 text-white hover:bg-gray-400 px-4 py-1 rounded w-40 h-9 mx-auto block"
            >
              {isLoading ? (
                <Loader
                  className=" mx-auto my-auto block"
                  color="white"
                  size="sm"
                />
              ) : (
                "Log in"
              )}
            </button>
          </form>
        </div>
        {/* form start here */}
      </div>
    </div>
  );
};

export default Login;
