"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    email: z.string().email("E-mail ou senha inválidos"),
    password: z.string().min(6, "E-mail ou senha inválidos"),
})

export function Login() {
    const router = useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        if (values.email === "aristeu@unidesk.com" && values.password === "aristeu123") {
            router.push("/dashboard")
            toast({
                variant: "success",
                title: "Acesso efetuado",
            });
            return
        }
        form.setError("email", { message: "E-mail ou senha inválidos" })
        form.setError("password", { message: "E-mail ou senha inválidos" })
    }

    return (
        <section className="flex items-center justify-center min-h-screen w-full p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Não tem uma conta? <Link href="/register" className="text-primary font-bold hover:underline">Clique aqui</Link>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nome@unidesk.com" {...field} autoComplete="off" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full cursor-pointer">
                                Entrar
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </section>
    )
}