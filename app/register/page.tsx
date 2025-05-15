import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Register() {
    const IMG_SIZE_LOGO = 500;

    return (
        <main className="flex items-center justify-center h-screen w-full mx-auto">
            <section className="flex flex-col items-center justify-center w-screen h-screen bg-text-white gap-10">
                <Image src="/logo.png" alt="Unidesk" width={IMG_SIZE_LOGO} height={IMG_SIZE_LOGO} />
                <p><span>{"Contate o administrador de T.I para criação da sua conta"}</span></p>
                <p><span className="font-bold">{<span>{"E-mail: "}</span>}<span className="text-text-gray">{"suporte@unidesk.com.br"}</span></span></p>
                <p><span className="font-bold">{<span>{"Telefone: "}</span>}<span className="text-text-gray">{"(11) 99999-9999"}</span></span></p>
                <Button asChild>
                    <Link href="/">Voltar para o login</Link>
                </Button>
            </section>
        </main>
    )
}