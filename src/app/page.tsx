import { BButton } from "@/components/BButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
      <main>
        <Link href={''}>
          <BButton type="button">Manage your blogs</BButton>
        </Link>
      </main>
    </div>
  );
}
