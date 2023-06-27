import { z } from "zod";
import { checkSpaces } from "../helpers/checkSpaces";

const emailValidator = z
	.string({
		invalid_type_error: "Email must be string!",
		required_error: "Email is required!",
	})
	.email("Invalid email!")
	.trim()
	.refine(checkSpaces, "Email can't contain spaces!");

export const CreateContactSchema = z.object({
	name: z
		.string({
			invalid_type_error: "Name must be string!",
			required_error: "Name is required!",
		})
		.trim()
		.min(3, "Name must have at least 3 letters!"),
	email: z
		.string({
			invalid_type_error: "Email must be string!",
			required_error: "Email is required!",
		})
		.optional()
		.refine(checkSpaces, "Email can't contain spaces!")
		.refine((val) => {
			if (!val) return true;
			return emailValidator.safeParse(val).success;
		}, "Invalid email!"),
	phone: z
		.string()
		.min(10, { message: "Phone numbers are a minimum of 10 digits" })
		.regex(/^[0-9+]+$/, { message: "Only numbers are allowed" })
		.max(13, { message: "Phone numbers are a minimum of 13 digits" }),
	address: z.string().optional(),
});
