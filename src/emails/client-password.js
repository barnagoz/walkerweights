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
	Text,
	Tailwind,
} from "@react-email/components";
import * as React from "react";

const baseUrl = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "http://localhost:3000";

export const ClientPasswordSetup = ({
	first_name,
	last_name,
	password_setup_link,
}) => {
	const previewText = `Bejelentkezés a Walker&Weights portáljára`;

	return (
		<Html>
			<Head/>
			<Preview>{previewText}</Preview>
			<Tailwind>
				<Body className="bg-white my-auto mx-auto font-sans px-2">
					<Container
						className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
						<Section className="mt-[32px]">
							<Img
								src={`${baseUrl}/asset/logo.png`}
								width="40"
								height="37"
								alt="Walker&Weights"
								className="my-0 mx-auto"
							/>
						</Section>
						<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
							Jelentkezzen be a Walker&Weights portáljára
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Kedves {last_name} {first_name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Köszönjük az érdeklődését szolgáltatásaink iránt. Ügyfeleinknek egyedi portált tartunk fenn,
							ahol kapcsolatot tartunk, és a szolgáltatásokat nyomon követheti.
							A portálra való bejelentkezéshez egyedi jelszóra van szükség, amelyet az alábbi gombra
							kattintva állíthat be.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={password_setup_link}
							>
								Jelszó beállítása
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							Amennyiben a gomb nem működött, másolja be az alábbi webcímet a böngészőjébe:{" "}
							<Link href={password_setup_link} className="text-blue-600 no-underline">
								{password_setup_link}
							</Link>
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Ezt az emailt azért kapta, mert ezzel az email címmel kitöltötték a Walker&Weights
							konzultációs űrlapját. Amennyiben nem Ön volt, kérjük hagyja figyelmen kívül.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

ClientPasswordSetup.PreviewProps = {
	first_name: "Barnabás",
	last_name: "Kovács",
	password_setup_link: "https://example.com",
};

export default ClientPasswordSetup;