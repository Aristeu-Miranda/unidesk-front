"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogOutIcon, UserIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation";
export function Profile() {
    const router = useRouter();
    const user = {
        name: "Aristeu Miranda",
        role: "Infraestrutura de T.I",
        image: "/profile.jpeg"
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">
                    <UserIcon />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col gap-4 items-center">
                    <div>
                        <Image src={user.image} alt="Aristeu Miranda" width={200} height={200} className="rounded-full" />
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <span className="text-lg font-bold">{user.name}</span>
                        <span className="text-sm text-gray-500">{user.role}</span>
                    </div>
                    <div>
                        <Button variant="outline" className="w-full" onClick={() => {
                            localStorage.removeItem("token");
                            router.push("/");
                        }}>
                            <LogOutIcon />
                            Sair
                        </Button>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Fechar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}