import { Checkbox } from "@/components/ui/checkbox";
import { permissionList } from "@/lib/data/permission";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

const formSchema = z.object({
	access_list: z.array(z.string()).min(1, "Legalább egy jogosultságot meg kell adni!"),
});

export function UpdateAdminAccessForm ({defaultValues, email, accessid, setPanelOpen, update}) {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			access_list: defaultValues,
		},
	});

	async function onSubmit (values) {
		const resp = await axios.post("/api/admin/update-access", {
			...values,
			accessid: accessid,
			email: email,
		}).catch((e) => {
			toast.error("Hiba történt a frissítés során, kérlek próbáld újra");
			console.log(e);
		});

		if (resp.data.success) {
			update();
			setPanelOpen(false);
			toast.success("Sikeresen frissítve");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="access_list"
					render={({field}) => (
						<FormItem>
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
					Frissítés
				</Button>
			</form>
		</Form>
	);
}