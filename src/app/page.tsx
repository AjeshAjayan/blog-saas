import { BButton } from "@/components/BButton";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  redirect('/dashboard');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main>
        <Link href={'/dashboard'}>
          <BButton type="button">Manage your blogs</BButton>
        </Link>
      </main>
    </div>
  );
}
