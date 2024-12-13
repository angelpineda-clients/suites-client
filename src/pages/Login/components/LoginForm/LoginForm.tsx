/* Libraries */
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";
/* components */
import { IAuth } from "@/interfaces";
import { useUserStore } from "@/store/user";
import { useAuth } from "@/context/auth/AuthProvider";
import REGEX_VALIDATIONS from "@/constants/regex.ts";

type FormValues = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const auth = useAuth();
	const setUser = useUserStore((state) => state.setUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>();

	const formFields = {
		email: register("email", {
			required: {
				value: true,
				message: "Field required",
			},
			pattern: {
				value: REGEX_VALIDATIONS.EMAIL,
				message: "Not valid email",
			},
		}),
		password: register("password", {
			required: {
				value: true,
				message: "Field required",
			},
		}),
	};

	const onSubmit = async (data: FormValues) => {
		try {
			const response: IAuth = await axios?.post("/login", {
				email: data?.email,
				password: data?.password,
			});

			const { access_token, refresh_token } = response.data.auth;

			auth.setAuthTokens(access_token, refresh_token);

			const roles: string[] = [];

			if (response.data.user?.roles?.length >= 1) {
				response.data.user?.roles.forEach((element) => {
					roles.push(element.name);
				});
			}

			setUser({ ...response.data.user, roles });
		} catch (error) {}
	};
	return (
		<form className="login-form" onSubmit={handleSubmit(onSubmit)}>
			<TextField
				error={errors.email?.message ? true : false}
				id="login-email"
				label="Email*"
				helperText={errors.email?.message}
				variant="outlined"
				type="email"
				data-testid="login-email"
				{...formFields.email}
			/>

			<TextField
				error={errors.password?.message ? true : false}
				id="login-password"
				label="Password*"
				type="password"
				variant="outlined"
				helperText={errors.password?.message}
				data-testid="login-password"
				{...formFields.password}
			/>

			<Button type="submit" variant="outlined" data-testid="login-submit">
				Enviar
			</Button>
		</form>
	);
};

export default LoginForm;
