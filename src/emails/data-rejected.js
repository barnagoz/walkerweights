import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://walkerweights.vercel.app";
export const DataRejectedEmail = ({
	first_name,
	last_name,
	company_name,
	portal_link,
}) => {
	const previewText = `Adatok újraküldése szükséges`;

	return (
		<Html>
			<Head/>
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container
						className="border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/asset/logo.svg`}
								width="140"
								height="auto"
								alt="Walker&Weights"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-semibold text-center p-0 my-[30px] mx-0">
							Adatok újraküldése szükséges
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Kedves {last_name} {first_name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Az Ön által beküldött adatok egy részét nem tudtuk elfogadni. Kérjük, hogy az alábbi gombra
							kattintva nyissa meg a {company_name} egyedi portálját, ahol újra beküldheti az adatokat.
							Auditorunk megjegyzést is fűzött a visszautasított adatokhoz, amelyet a portálon
							megtekinthet.
							<br/>
							Kérjük, szíveskedjen a portálra belépni és a kért adatokat a lehető leghamarabb megadni.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded-md text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={portal_link}
							>
								Portál megnyitása
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Amennyiben a gomb nem működött, másolja be az alábbi webcímet a böngészőjébe:{" "}
							<Link href={portal_link} className="text-blue-600 no-underline">
								{portal_link}
							</Link>
						</Text>
						<Text className={"text-black text-[14px] leading-[24px]"}>
							Üdvözlettel,
							<br/>
							Walker&Weights csapata
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[16px] mx-0 w-full"/>
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Abban az esetben, ha nem Ön a levél címzettje, kérjük, hagyja figyelmen
							kívül ezt az üzenetet és ne kattintson a gombra.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

DataRejectedEmail.PreviewProps = {
	first_name: "Barnabás",
	last_name: "Kovács",
	portal_link: "https://example.com",
	company_name: "Swietelsky",
};

export default DataRejectedEmail;