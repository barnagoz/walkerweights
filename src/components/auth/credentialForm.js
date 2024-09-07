import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {signIn} from "next-auth/react";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "../ui/form";
import {Input} from "../ui/input";
import {Button} from "../ui/button";
import {cn} from "@/lib/utils";

const formSchema = z.object({
    email: z.string().email("Érvényes e-mail címet adj meg!"),
    password: z.string().min(1,"Jelszó megadása kötelező!"),
});

export function CredentialForm ({buttonText}) {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    function onSubmit (values) {
        signIn("credentials", { email: values.email, password: values.password });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>E-mail cím</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Jelszó</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="password"
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button className={cn("w-full mt-2")} type="submit">
                    {buttonText}
                </Button>
            </form>
        </Form>
    );
}
