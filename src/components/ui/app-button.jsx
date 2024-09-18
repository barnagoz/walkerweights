import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AppButton ({title, link, className}) {
	return (
		<Link href={link}><Button className={"w-40 h-16 items-end justify-end p-3" + className}>{title}</Button></Link>)
};