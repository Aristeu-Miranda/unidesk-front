import Image from "next/image";
import { HeaderProps } from "./Header.types";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Profile } from "../Profile";
import Link from "next/link";

export function Header({ title, description }: HeaderProps) {
    return (
        <header className="flex w-full h-16 mx-auto px-10 bg-quaternary">
            <div className="flex justify-between items-center w-full max-w-[1920px] mx-auto">
                <div>
                    <Link href="/dashboard">
                        <Image src="/icon.png" alt="Unidesk" width={200} height={100} />
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Avatar className="w-10 h-10">
                        <AvatarImage src="https://github.com/Aristeu-Miranda.png" />
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold">Aristeu Miranda</span>
                        <span className="text-xs">Infraestrutura de T.I</span>
                    </div>
                    <div>
                        <Profile />
                    </div>
                </div>
            </div>
        </header>
    )
}