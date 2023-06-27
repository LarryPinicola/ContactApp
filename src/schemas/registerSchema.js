import { z } from "zod";
import { checkSpaces } from "../helpers/checkSpaces";

export const RegisterSchema = z
	.object({
		name: z
			.string({
				invalid_type_error: "Name must be string!",
				required_error: "Name is required!",
			})
			.min(3, "Name must have at least 6 letters!")
			.trim(),
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
			.min(6, "Password must have at least 6 letters!")
			.refine(checkSpaces, "Password can't contain spaces!"),
		password_confirmation: z
			.string({
				invalid_type_error: "Confirm Password must be string!",
				required_error: "Confirm Password is required!",
			})
			.trim()
			.min(6, {
				message: "Confirm Password must have at least 6 letters!",
			})
			.refine(checkSpaces, "Confirm Password can't contain spaces!"),
	})
	.refine((values) => {
		// TODO: try to show this error message later
		const { password, password_confirmation } = values;
		return password === password_confirmation;
	}, "Confirm password must be same as password!");
