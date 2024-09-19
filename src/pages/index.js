import Template from "@/components/common/template";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsVisible } from "@/lib/isVisible";
import { cn } from "@/lib/utils";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Iframe from "react-iframe";

export default function Home () {
	const ref5 = useRef();
	const isVisible5 = useIsVisible(ref5);

	const [count, setCount] = useState(60000);
	const maxCount = 100000;

	useEffect(() => {
		if (!isVisible5) {
			return;
		}

		const interval = setInterval(() => {
			// Update the count if it's less than the maximum count
			if (count < maxCount) {
				setCount((prevCount) => prevCount + 333);
			} else if (count === 100293) {
				setCount(100000);
			}
		}, 10);

		return () => clearInterval(interval);
	}, [count, maxCount, isVisible5]);

	return (<Template>
			<NextSeo
				title={"Kezdőlap"}
				description={"Ha csak egyszer is megfordult a fejében, hogy energetikai" + "korszerűsítést hajtson végre, akkor jó hírünk van: most van, aki a" + "beruházás költségeinek egy részét átvállalja."}
			/>
			<div className={cn("w-full h-full flex flex-col justify-center")}>
				<div
					className={cn("w-full bg-cover min-h-[50vh] bg-gray-500 bg-blend-multiply")}
					style={{
						backgroundImage: "url('https://walkerweights.hu/assets/images/mbr-1920x1200.jpg')",
					}}
				>
					<div
                        className={cn("lg:w-4/5 w-full min-h-[50vh] h-full bg-gradient-to-r from-brand-green" +
                            " to-transparent" +
                            " flex" + " flex-col" + " justify-center items-start text-white p-8 !py-36")}
					>
						<h1 className={cn("text-4xl font-bold mb-2")}>
							A mi célunk, hogy minél több extra profitot szerezzen!
						</h1>
						<h2 className={"text-2xl font-semibold mb-2"}>Okos energiahatékonysági beruházásokkal gyorsan és
							egyszerűen!</h2>
						<p className={"w-2/3"}>
							A Walker & Weigths profi csapatával Ön is könnyedén kihasználhatja az energiahatákonysági
							rendszer előnyeit, amivel rövid és hosszú távon is többletbevételhez juthat!
						</p>
					</div>
				</div>
			</div>
			<div className={"grid-cols-1 md:grid-cols-5 grid p-8 gap-4 max-w-full"}>
				<div
					className={"border-2 shadow-sm border-brand-gold relative rounded-3xl p-8 text-gray-950 flex flex-col gap-4"}>
					<div className={"flex justify-start items-center gap-2"}>
						<div
							className={"bg-brand-gold rounded-full text-white px-4 flex items-center font-bold aspect-square"}>1
						</div>
						<h2 className={cn("text-xl font-semibold text-brand-gold")}>
							Felmérünk
						</h2>
					</div>
					<p> Energetikai auditorunk ingyenesen felméri a cégénél megvalósítható, legnagyobb
						költségcsökkentéssel járó energiahatékonysági beruházásokat.</p>
				</div>
				<div
					className={"border-2 shadow-sm border-brand-gold relative rounded-3xl p-8 text-gray-950 flex flex-col gap-4"}>
					<div className={"flex justify-start items-center gap-2"}>
						<div
							className={"bg-brand-gold rounded-full text-white px-4 flex items-center font-bold aspect-square"}>2
						</div>
						<h2 className={cn("text-xl font-semibold text-brand-gold")}>
							Segítünk
						</h2>
					</div>
					<p> Csapatunk a kiválaszott beruházás lebonyolításában is segítséget nyújt, hogy minden szükséges
						lépést biztosan megvalósíthasson.</p>

				</div>
				<div
					className={"border-2 shadow-sm border-brand-gold relative rounded-3xl p-8 text-gray-950 flex flex-col gap-4"}>
					<div className={"flex justify-start items-center gap-2"}>
						<div
							className={"bg-brand-gold rounded-full text-white px-4 flex items-center font-bold aspect-square"}>3
						</div>
						<h2 className={cn("text-xl font-semibold text-brand-gold")}>
							Hitelesítünk
						</h2>
					</div>
					<p> Miután elkészült a beruházás, a vele keletkező energiamegtakarítást a lehető legrövidebb idő
						alatt hitelesítjük.</p>
				</div>
				<div
					className={"border-2 shadow-sm border-brand-gold relative rounded-3xl p-8 text-gray-950 flex flex-col gap-4"}>
					<div className={"flex justify-start items-center gap-2"}>
						<div
							className={"bg-brand-gold rounded-full text-white px-4 flex items-center font-bold aspect-square"}>4
						</div>
						<h2 className={cn("text-xl font-semibold text-brand-gold")}>
							Értékesítünk
						</h2>
					</div>
					<p> A sikeres hitelesítés után keletkezett EKR tanúsítványt értékesítjük, mellyel extra bevételt
						generálunk Önnek.</p>
				</div>
				<div
					className={"border-2 shadow-sm border-brand-gold relative rounded-3xl p-8 text-gray-950 flex flex-col gap-4"}>
					<div className={"flex justify-start items-center gap-2"}>
						<div
							className={"bg-brand-gold rounded-full text-white px-4 flex items-center font-bold aspect-square"}>5
						</div>
						<h2 className={cn("text-xl font-semibold text-brand-gold")}>
							Tanácsokat adunk
						</h2>
					</div>
					<p> Ha szakmai kérdése van elektromos energia termelésével, vagy adott projekt teljes körű
						átvilágításával kapcsolatban, villamosmérnökeink, jogászaink és tervezőink örömmel válaszolnak
						rá.</p>
				</div>
			</div>
			<div className={cn("p-8")}>
				<h3 className={cn("text-xl font-bold mb-4 text-gray-800")}>
					Üzleti partnereink, akik már profitáltak szolgáltatásainkból
				</h3>
				<div className={cn("flex flex-wrap gap-4 font-medium text-white")}>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>OMV</p>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>e.on</p>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>audax</p>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>castrum
						ferrerum</p>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>Áramcentrum</p>
					<p className={cn("px-4 py-1.5 bg-brand-green bg-opacity-90 hover:bg-opacity-100 rounded-full" + " transition-shadow" + " duration-300")}>EMOGÁ</p>
				</div>
			</div>
			<div
				ref={ref5}
				className={cn("bg-brand-green px-8 py-12 grid lg:grid-cols-3 gap-8 text-center items-center font-semibold" + " text-2xl text-white",)}
			>
				Több mint
				<div
					className={cn("flex border-gray-200 border py-4 px-4 rounded-lg text-center items-center justify-center font-bold text-3xl")}
				>
					{count} GJ
				</div>
				értékesített EKR tanúsítvány
			</div>
			<div className={cn("p-8")}>
				<h3 className={"text-xl font-semibold text-gray-800"}>
					Energiakereskedőként EKR tanúsítványt vásárolna?
				</h3>
				<p className={"text-gray-800"}>
					Bármekkora energiamegtakarításara is van szüksége, nálunk biztosan megtalálja, hiszen
					többfajta csomagajánlatot is kínálunk.
				</p>
				<div className={"grid grid-cols-1 md:grid-cols-3 mt-4 gap-4"}>
					<Card>
						<CardHeader>
							<CardTitle>
								Alap
							</CardTitle>
							<CardDescription>
								Kezdőcsomag
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className={cn("flex flex-col gap-4")}>
								<p> 10 GJ</p>
								<p> 100 000 Ft</p>
								<p> 10 000 Ft/GJ</p>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>
								Premium
							</CardTitle>
							<CardDescription>
								Közép csomag
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className={cn("flex flex-col gap-4")}>
								<p> 30 GJ</p>
								<p> 250 000 Ft</p>
								<p> 8 333 Ft/GJ</p>
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>
								Exkluzív
							</CardTitle>
							<CardDescription>
								Premium csomag
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className={cn("flex flex-col gap-4")}>
								<p> 50 GJ</p>
								<p> 400 000 Ft</p>
								<p> 8 000 Ft/GJ</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
			<div className={"bg-brand-gold p-8 text-white"}>
				<h3 className={"text-xl font-semibold"}>
					Lépjen velünk kapcsolatba!
				</h3>
				<p>
					Töltse ki űrlapunkat és kollégáink 24 órán belül visszahívják!
				</p>
				<Link href={"/jelentkezes"}>
					<Button variant={"secondary"} className={cn("w-full mt-4")}>
						Ingyenes konzultáció
					</Button>
				</Link>
			</div>
			<div className={"flex flex-col gap-4 p-8"}>
				<Card>
					<CardHeader>
						<CardTitle>Megéri minket választania!</CardTitle>
						<CardDescription>
							Nálunk nincs semmi vesztenivalója, hiszen első konzultációnk teljesen ingyenes akár
							beruházóként, akár energiakereskedőként, vagy csak szakmai tanácsért fordul
							hozzánk.
						</CardDescription>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Nézzen be hozzánk!</CardTitle>
						<CardDescription>Önt is szeretettel várjuk Budapest belvárosában lévő
							irodánkban!</CardDescription>
					</CardHeader>
					<CardContent>
						<div
							className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 h-[70vh] border border-gray-200 rounded-xl overflow-hidden">
							<div className="col-span-1 flex flex-col items-center justify-center text-center gap-2">
								<p>
									1054 Budapest, Szabadság tér 7.,
									<br/>
									Bank Center, Citi torony, I. emelet
								</p>
								<p>+36 30 99 89 114</p>
								<p>info@walkerweights.hu</p>
							</div>
							<Iframe
								src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=House%20of%20Business%20Bank%20Center+(Walker%20&amp;%20Weights)&amp;t=h&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
								width="100%"
								height="100%"
								frameborder="0"
								style="border:0"
								className="col-span-3"
								allowfullscreen
							></Iframe>
						</div>
					</CardContent>
				</Card>
			</div>
		</Template>
	);
}