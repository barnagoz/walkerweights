import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  Form,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email("Érvényes e-mail címet adj meg!"),
});

export function EmailForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values) {
    signIn("email", { email: values.email });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail cím</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="pl. kovacs.bela@walkerweights.hu"
                />
              </FormControl>
              <FormDescription>A fiókodhoz tartozó e-mail cím.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className={cn("w-full mt-2")} type="submit">
          Varázslink küldése
        </Button>
      </form>
    </Form>
  );
}
