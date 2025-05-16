import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("E-mail ou senha inválidos"),
    password: z.string().min(6, "E-mail ou senha inválidos"),
})

export type LoginProps = {
    onClickLogin?: (values: z.infer<typeof formSchema>) => void;
}