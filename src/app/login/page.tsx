"use client";
import { BButton } from "@/components/BButton";
import { BInput } from "@/components/BInput";
import { Metadata } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormType = {
	email: string;
	password: string;
}

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

	const handleOnSubmit = handleSubmit((data) => {
		console.log(data);
	})

	return (
		<div className="
			xs:h-full 
			xs:flex 
			xs:items-end 
			xs:p-8 
			xs:bg-background 
			xs:bg-cover 
			xs:bg-[position:-45px_-180px]
		">
			<main className="xs:z-10 xs:w-full ">
				<form 
					className="
						xs:w-full 
						xs:h-3/4 
						xs:bg-white 
						xs:p-6 
						xs:flex 
						xs:flex-col 
						xs:gap-3 
						rounded
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
					<BButton type="submit">Login</BButton>
					<p>Not a user? <Link href="/signup">Sign up</Link></p>
				</form>
			</main>
		</div>
	);
}
