"use client";

import { BButton } from "@/components/BButton";
import { BInput } from "@/components/BInput";
import createApolloClient from "@/lib/apolloClient";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ADD_USER_GRAPHQL } from "./mutations/addUser.graphql";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type FormType = {
	fullname: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const client = createApolloClient();

export default function SignUp() {
	const {
		register,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm<FormType>({
		defaultValues: {
			fullname: "",
			email: "",
			password: "",
			confirmPassword: ""
		}
	});

	const [createUser, {
		loading
	}] = useMutation(ADD_USER_GRAPHQL, { client });

	const router = useRouter();

	const password = watch("password");

	const handleOnSubmit = handleSubmit((data) => {
		createUser({
			variables: {
				name: data.fullname,
				email: data.email,
				password: data.password
			}
		}).then((response) => {
			toast(response.data.addUser.message, { type: "success" });
			router.replace("/login");
		}).catch((error) => {
			toast.error(error.message, { type: "error" });
		});
	});

	return (
		<div className="
			h-full 
			flex 
			items-end 
			p-8 
			bg-background 
			bg-cover 
			bg-[position:-45px_-180px]
		">
			<main className="z-10 w-full ">
				<form
					onSubmit={handleOnSubmit} 
					className="
						w-full 
						h-3/4 
						bg-white 
						p-6 
						flex 
						flex-col 
						gap-3 
						rounded
					">
					<h1>Sign Up</h1>
					<BInput type="text"
						id="fullname"
						placeholder="Full Name"
						label="Full Name"
						maxLength={50}
						errors={errors.fullname}
						{...register("fullname", { 
							required: "Full Name is required",  
						})}
					/>
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
						{ ...register("password", { required: "Password is required" }) }
					/>
					<BInput type="password"
						id="confirm-password"
						placeholder="Confirm Password"
						label="Confirm Password"
						maxLength={50}
						errors={errors.confirmPassword}
						{	
							...register("confirmPassword", { 
								required: "Confirm Password is required",
								validate: (value) => value === password || "The passwords do not match" 
							})
						}
					/>
					<BButton disabled={loading} type="submit">{ loading ? 'Loading...' : 'Sign up'}</BButton>
					<p>Already have an account? <Link href="/login">Login</Link></p>
				</form>
			</main>
		</div>
	);
}
