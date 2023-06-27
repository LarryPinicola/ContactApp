import { z } from "zod";
import { checkSpaces } from "../helpers/checkSpaces";

export const LoginSchema = z.object({
	email: z
		.string({
			invalid_type_error: "Email must be string!",
			required_error: "Email is required!",
		})
		.email("Invalid email!")
		.trim()
		.refine(checkSpaces, "Email can't contain spaces!"),
	password: z
		.string({
			invalid_type_error: "Password must be string!",
			required_error: "Password is required!",
		})
		.trim()
		.refine(checkSpaces, "Password can't contain spaces!"),
});
