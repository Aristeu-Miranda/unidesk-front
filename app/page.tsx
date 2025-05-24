import { Login } from "@/_components/Login";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function Home() {
  const IMG_SIZE_LOGO = 500;

  return (
    <main className="flex items-center justify-center h-screen w-full mx-auto">
      <section className="flex items-center justify-center w-1/2 h-screen bg-text-white">
        <div>
          <Image src="/logo.png" alt="Unidesk" width={IMG_SIZE_LOGO} height={IMG_SIZE_LOGO} />
        </div>
      </section>
      <section className="flex items-center justify-center w-1/2 bg-primary h-screen">
        <Toaster />
        <Login />
      </section>
    </main>
  );
}
