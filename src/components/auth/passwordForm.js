import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
	email: z.string().email("Érvényes e-mail címet adj meg!"),
	password: z.string().min(8, "A jelszónak legalább 8 karakter hosszúnak kell lennie!"),
});

export function PasswordForm ({token, apiLink}) {
	const router = useRouter();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit (values) {
		toast.loading("Mentés folyamatban...")
		const resp = await axios.post(apiLink, {
			...values,
			token: token,
		}).catch((e) => {
			toast.dismiss();
			toast.error("Hiba történt a mentés során, kérlek próbáld újra", {description: "Amennyiben nem sikerül, vedd fel a kapcsolatot velünk"});
			console.log(e);
		});

		if (resp.data.success) {
			toast.dismiss();
			toast.success("Sikeresen elmentve", {description: "Hamarosan átirányítunk a bejelentkező felületre"});
			setTimeout(() => {
				router.push("/auth/login");
			}, 3000);
		}
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
							<FormDescription>
								Azon email cím, amelyre a jelszó beállító linket küldtük.
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({field}) => (
						<FormItem>
							<FormLabel>Új jelszó</FormLabel>
							<FormControl>
								<Input
									{...field}
									type="password"
								/>
							</FormControl>
							<FormDescription>
								Egy ön által választott minimum 8 karakter hosszú jelszó.
							</FormDescription>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<Button className={cn("w-full mt-4")} type="submit">
					Jelszó mentése
				</Button>
			</form>
		</Form>
	);
}
