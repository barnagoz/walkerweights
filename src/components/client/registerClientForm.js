import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
	company_name: z.string().min(1, {message: "Cégnév megadása kötelező"}).max(255, {message: "A cégnév maximum 255 karakter lehet"}),
	email: z.string().email({message: "Hibás e-mail cím"}).min(1, {message: "Email cím megadása kötelező"}).max(255, {message: "Az e-mail cím maximum 255 karakter lehet"}),
	phone: z.string().min(1, {message: "Telefonszám megadása kötelező"}).max(255, {message: "A telefonszám maximum 255 karakter lehet"}),
	first_name: z.string().min(1, {message: "Keresztnév megadása kötelező"}).max(255, {message: "A keresztnév maximum 255 karakter lehet"}),
	last_name: z.string().min(1, {message: "Vezetéknév megadása kötelező"}).max(255, {message: "A vezetéknév maximum 255 karakter lehet"}),
	energeticInvestmentSince2021: z.boolean(),
	energeticInvestmentWhen: z.string().max(255, {message: "A mező maximum 255 karakter lehet"}),
	energeticInvestmentType: z.string().max(255, {message: "A mező maximum 255 karakter lehet"}),
	energeticInvestmentAmount: z.string().max(255, {message: "A mező maximum 255 karakter lehet"}),
	registerMessage: z.string(),
});

export function RegisterClientForm () {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			company_name: "",
			email: "",
			phone: "",
			first_name: "",
			last_name: "",
			energeticInvestmentSince2021: false,
			energeticInvestmentWhen: "",
			energeticInvestmentType: "",
			energeticInvestmentAmount: "",
			registerMessage: "",
		},
	});

	async function onSubmit (values) {
		const resp = await axios.post("/api/client/register", {
			...values,
		});
		if (resp.data.success) {
			toast.success("Sikeresen elküldve, hamarosan jelentkezünk");
		} else {
			toast.error("Hiba történt a küldés során, kérlek próbáld újra");
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField control={form.control} name={"company_name"} render={({field}) => (
					<FormItem>
						<FormLabel>Cégnév</FormLabel>
						<FormControl>
							<Input {...field} placeholder={"pl.: Walker&Weights"}/>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<h2 className={cn("text-lg font-semibold mt-6")}>Kapcsolattartó</h2>
				<div className={"flex gap-2 flex-wrap md:flex-nowrap w-full"}>
					<FormField control={form.control} name={"last_name"} render={({field}) => (
						<FormItem className={"w-full"}>
							<FormLabel>Vezetéknév</FormLabel>
							<FormControl>
								<Input {...field} placeholder={"pl.: Példa"}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}/>
					<FormField control={form.control} name={"first_name"} render={({field}) => (
						<FormItem className={"w-full"}>
							<FormLabel>Keresztnév</FormLabel>
							<FormControl>
								<Input {...field} placeholder={"pl.: János"}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}/>
				</div>
				<div className={"flex gap-2 flex-wrap md:flex-nowrap w-full mt-3"}>
					<FormField control={form.control} name={"phone"} render={({field}) => (
						<FormItem className={"w-full"}>
							<FormLabel>Telefonszám</FormLabel>
							<FormControl>
								<Input {...field} placeholder={"pl.: +36 30 99 89 114"}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}/>
					<FormField control={form.control} name={"email"} render={({field}) => (
						<FormItem className={"w-full"}>
							<FormLabel>E-mail cím</FormLabel>
							<FormControl>
								<Input {...field} placeholder={"pl.: pelda.janos@walkerweights.hu"}/>
							</FormControl>
							<FormMessage/>
						</FormItem>
					)}/>
				</div>
				<h2 className={cn("text-lg font-semibold mt-6")}>Korábbi energetikai beruházások</h2>
				<p className={"muted"}>Ezen kérdések kitöltésével segítheti munkánkat, az Ön cégének helyzete előzetes
					felmérésében.</p>
				<FormField control={form.control} name={"energeticInvestmentSince2021"} render={({field}) => (
					<FormItem>
						<FormControl>
							<div className={"flex gap-1 items-center my-4"}>
								<Checkbox {...field}/>
								<FormLabel>2021 óta történt energetikai beruházás a cégemnél.</FormLabel>
							</div>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<FormField control={form.control} name={"energeticInvestmentWhen"} render={({field}) => (
					<FormItem className={"mt-3"}>
						<FormLabel>Amennyiben történt, melyik évben történt meg ennek befejezése?</FormLabel>
						<FormControl>
							<Input {...field} placeholder={"pl.: 2023"}/>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<FormField control={form.control} name={"energeticInvestmentType"} render={({field}) => (
					<FormItem className={"mt-3"}>
						<FormLabel>Amennyiben történt, milyen típusú energetikai beruházás volt?</FormLabel>
						<FormControl>
							<Input {...field} placeholder={"pl.: kazáncsere, homlokzati szigetelés"}/>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<FormField control={form.control} name={"energeticInvestmentAmount"} render={({field}) => (
					<FormItem className={"mt-3"}>
						<FormLabel>Amennyiben történt, mekkora energia megtakarítással járt?</FormLabel>
						<FormControl>
							<Input {...field} placeholder={"pl. 20 kWh vagy m³"}/>
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<h2 className={cn("text-lg font-semibold mt-6")}>Megjegyzés</h2>
				<p className={"muted"}>Bármilyen egyéb megjegyzést, üzenetet szívesen fogadunk.</p>
				<FormField control={form.control} name={"registerMessage"} render={({field}) => (
					<FormItem>
						<FormControl>
							<Textarea className={"mt-2"} {...field} />
						</FormControl>
						<FormMessage/>
					</FormItem>
				)}/>
				<Button className={cn("w-full mt-4")} type="submit">
					Küldés
				</Button>
			</form>
		</Form>
	);
}