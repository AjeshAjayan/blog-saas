"use client";
import { BButton } from "@/components/BButton";
import { BInput } from "@/components/BInput";
import createApolloClient from "@/lib/apolloClient";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { LOGIN_GRAPHQL } from "./mutations/login.graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormType = {
	email: string;
	password: string;
}

const client = createApolloClient();

export default function Login() {

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		defaultValues: {
			email: "",
			password: "",
		}
	});

	const router = useRouter();

	const [login, { loading }] = useMutation(LOGIN_GRAPHQL, { client });

	const handleOnSubmit = handleSubmit((data) => {
		login({
			variables: {
				email: data.email,
				password: data.password
			}
		}).then((response) => {
			toast(response.data.login.message, { type: "success" });
			router.push("/dashboard");
		}).catch((error) => {
			toast.error(error.message, { type: "error" });
		})
	})

	return (
		<div className="
			h-full 
			flex 
			items-end 
			p-8 
			bg-background 
			bg-cover 
			bg-[position:-45px_-180px]
			md:w-screen
			md:justify-center
			md:items-center
		">
			<main className="z-10 w-full flex justify-center">
				<form
					className="
						w-full
						md:w-1/2 
						h-3/4 
						bg-white 
						p-6 
						flex 
						flex-col 
						gap-3 
						rounded
						max-w-[580px]
					"
					onSubmit={handleOnSubmit}
				>
					<h1>Login to your Account</h1>
					<BInput type="email"
						id="email"
						placeholder="Email"
						label="Email"
						maxLength={50}
						errors={errors.email}
						{...register("email", { required: "Email is required" })}
					/>
					<BInput type="password"
						id="password"
						placeholder="Password"
						label="Password"
						maxLength={50}
						errors={errors.password}
						{...register("password", { required: "Password is required" })}
					/>
					<BButton disabled={loading} type="submit">{ loading ? 'Loading...' : 'Login'}</BButton>
					<p>Not a user? <Link href="/signup">Sign up</Link></p>
				</form>
			</main>
		</div>
	);
}
