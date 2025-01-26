import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
	company_name: z.string().min(1, {message: "Cégnév megadása kötelező"}).max(255, {message: "A cégnév maximum 255 karakter lehet"}),
	email: z.string().email({message: "Hibás e-mail cím"}).min(1, {message: "Email cím megadása kötelező"}).max(255, {message: "Az e-mail cím maximum 255 karakter lehet"}),
	phone: z.string().min(1, {message: "Telefonszám megadása kötelező"}).max(255, {message: "A telefonszám maximum 255 karakter lehet"}),
	first_name: z.string().min(1, {message: "Keresztnév megadása kötelező"}).max(255, {message: "A keresztnév maximum 255 karakter lehet"}),
	last_name: z.string().min(1, {message: "Vezetéknév megadása kötelező"}).max(255, {message: "A vezetéknév maximum 255 karakter lehet"}),
	energeticInvestmentSince2021: z.boolean(),
	energeticInvestmentWhen: z.string().regex(new RegExp(/^(202[1-9]|20[3-9]\d|2[1-9]\d{2}|[3-9]\d{3}|\d{5,})$/), {message: "2021 utáni évszám megadása szükséges"}).max(255, {message: "A mező maximum 255 karakter lehet"}),
	energeticInvestmentType: z.string().max(255, {message: "A mező maximum 255 karakter lehet"}),
	energeticInvestmentAmount: z.string().max(255, {message: "A mező maximum 255 karakter lehet"}),
	registerMessage: z.string(),
});

export function RegisterClientForm ({data, isEdit = false}) {
	const {data: session} = useSession();
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			company_name: data?.client.company_name || "",
			email: data?.client.email || "",
			phone: data?.client.phone || "",
			first_name: data?.client.first_name || "",
			last_name: data?.client.last_name || "",
			energeticInvestmentSince2021: data?.client.energeticInvestment.since2021,
			energeticInvestmentWhen: data?.client.energeticInvestment.when || "",
			energeticInvestmentType: data?.client.energeticInvestment.type || "",
			energeticInvestmentAmount: data?.client.energeticInvestment.amount || "",
			registerMessage: data?.client.registerMessage || "",
		},
	});

	async function onSubmit (values) {
		if (isEdit) {
			toast.loading("Adatok frissítése folyamatban...")
			const resp = await axios.post("/api/client/update", {
				...values,
				client_id: data._id,
				session_token: session.user.session_token,
			}).catch((e) => {
				toast.dismiss();
				toast.error("Hiba történt az adatok frissítése során, próbálja újra");
				console.log(e);
			});

			if (resp.data.success) {
				toast.dismiss();
				toast.success("Sikeresen frissítve.");
			}
		} else {
			toast.loading("Adatok küldése folyamatban...");
			const resp = await axios.post("/api/client/register", {
				...values,
			}).catch((e) => {
				toast.dismiss();
				toast.error("Hiba történt a küldés során, próbálja újra");
				console.log(e);
			});
			if (resp.data.success) {
				toast.dismiss();
				toast.success("Sikeresen elküldve, hamarosan jelentkezünk");
			}
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
								<Input {...field} placeholder={"pl.: pelda.janos@walkerweights.hu"} disabled={isEdit}/>
							</FormControl>
							{isEdit && (
								<FormDescription>Az email cím utólagos módosításához kérjük vegye fel velünk a
									kapcsolatot!</FormDescription>
							)}
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
								<Checkbox {...field}
								          onCheckedChange={(e) => form.setValue("energeticInvestmentSince2021", e)}
								          checked={form.getValues("energeticInvestmentSince2021")}/>
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
							<Input type={"number"} {...field} placeholder={"pl.: 2023"}/>
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
					{isEdit ? "Mentés" : "Küldés"}
				</Button>
				<p className={"muted mt-2"}>A gombra kattintva automatikusan elfogadja <Link
					href={"/docs/adatvedelmi-szabalyzat.pdf"} className={"underline cursor-pointer"}>adatvédelmi
					szabályzatunkat</Link>.</p>
			</form>
		</Form>
	);
}