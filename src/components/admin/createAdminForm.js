import { Checkbox } from "@/components/ui/checkbox";
import { permissionList } from "@/lib/data/permission";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";

const formSchema = z.object({
	first_name: z.string().min(1, "Keresztnév megadása kötelező!"),
	last_name: z.string().min(1, "Vezetéknév megadása kötelező!"),
	email: z.string().email("Érvényes e-mail címet adj meg!"),
	password: z.string().min(1, "Jelszó megadása kötelező!"),
	access_list: z.array(z.string()).min(1, "Legalább egy jogosultságot meg kell adni!"),
});

export function CreateAdminForm ({buttonText}) {
	const {data: session, status} = useSession();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			first_name: "",
			last_name: "",
			email: "",
			password: "",
			access_list: ["app"],
		},
	});

	async function onSubmit (values) {
		if (status !== "authenticated") {
			alert("Nincs bejelentkezve!");
			return;
		}
		const resp = await axios.post("/api/admin/create", {
			...values,
			accessid: session.user.id,
		});
		if (resp.data.success) {
			toast.success("Sikeresen elküldve");
		} else {
			toast.error("Hiba történt a küldés során, kérlek próbáld újra");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="first_name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Keresztnév</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="last_name"
					render={({field}) => (
						<FormItem>
							<FormLabel>Vezetéknév</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({field}) => (
						<FormItem>
							<FormLabel>E-mail cím</FormLabel>
							<FormControl>
								<Input {...field} />
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
								<Input {...field} type="password"/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="access_list"
					render={({field}) => (
						<FormItem>
							<FormLabel>Jogosultságok</FormLabel>
							<FormControl>
								<>
								{permissionList.map((permission) => (
									<div key={permission.code}>
										<Checkbox id={permission.code} value={permission.code}
										          {...field}
										          checked={field.value.includes(permission.code)}
										          onCheckedChange={(e) => {
											          if (e) {
												          field.onChange([...field.value, permission.code]);
											          } else {
												          field.onChange(field.value.filter((code) => code !== permission.code));
											          }
										          }}/>
										<label htmlFor={permission.code}>
											{permission.name}
										</label>
									</div>
								))}
								</>
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