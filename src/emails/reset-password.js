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

export const ResetPasswordEmail = ({
	first_name,
	last_name,
	password_setup_link,
}) => {
	const previewText = `Jelszó visszaállítása`;

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
							Elfelejtett jelszó visszaállítása
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Kedves {last_name} {first_name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Pár perccel ezelőtt az ön email címével egy jelszóvisszaállítási kérést kezdeményeztek a
							Walker&Weights portálján. Amennyiben ön szeretné visszaállítani a jelszavát, azt megteheti
							az alábbi gombra kattintva.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={password_setup_link}
							>
								Jelszó visszaállítása
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
							Abban az esetben, ha nem ön kezdeményezte a jelszóvisszaállítást, kérjük, hagyja figyelmen
							kívül ezt az üzenetet és ne kattintson a gombra.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

ResetPasswordEmail.PreviewProps = {
	first_name: "Barnabás",
	last_name: "Kovács",
	password_setup_link: "https://example.com",
};

export default ResetPasswordEmail;