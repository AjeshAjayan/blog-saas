import { BButton } from "@/components/BButton";
import { BInput } from "@/components/BInput";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Get Started",
	description: "Create an account to get started",
	robots: "noindex, nofollow",
};

export default function SignUp() {
	return (
		<div className="xs:h-full xs:flex xs:items-end xs:p-8 xs:bg-[url('/illustration.jpg')] xs:bg-cover xs:bg-[position:-45px_-180px]">
			<main className="xs:z-10 xs:w-full ">
				<form className="xs:w-full xs:h-3/4 xs:bg-white xs:p-6 xs:flex xs:flex-col xs:gap-3 rounded">
					<h1>Sign Up</h1>
					<BInput type="text"
						id="fullname"
						name="fullname"
						placeholder="Full Name"
						label="Full Name"
					/>
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
					<BInput type="password"
						id="confirm-password"
						name="confirmPassword"
						placeholder="Confirm Password"
						label="Confirm Password"
					/>
					<BButton type="submit">Login</BButton>
					<p>Already have an account? <Link href="/login">Login</Link></p>
				</form>
			</main>
		</div>
	);
}
