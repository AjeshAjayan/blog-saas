import { BButton } from "@/components/BButton";
import { BInput } from "@/components/BInput";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Welcome back..!",
	description: "Login to your account",
	robots: "noindex, nofollow",
};


export default function Login() {
	return (
		<div className="xs:h-full xs:flex xs:items-end xs:p-8 xs:bg-background xs:bg-cover xs:bg-[position:-45px_-180px]">
			<main className="xs:z-10 xs:w-full ">
				<form className="xs:w-full xs:h-3/4 xs:bg-white xs:p-6 xs:flex xs:flex-col xs:gap-3 rounded">
					<h1>Login to your Account</h1>
					<BInput type="email"
						id="email"
						name="email"
						placeholder="Email"
						label="Email"
					/>
					<BInput type="password"
						id="password"
						name="password"
						placeholder="Password"
						label="Password"
					/>
					<BButton type="submit">Login</BButton>
					<Link href="/signup">Create an account</Link>
				</form>
			</main>
		</div>
	);
}
