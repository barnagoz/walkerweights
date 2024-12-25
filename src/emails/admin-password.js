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

const baseUrl = process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "https://walkerweights.vercel.app";

export const AdminPasswordSetup = ({
	first_name,
	last_name,
	password_setup_link,
}) => {
	const previewText = `Állítson be egy új jelszót a fiókjához, ${first_name}!`;

	return (
		<Html>
			<Head />
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
							Állítson be egy jelszót
						</Heading>
						<Text className="text-black text-[14px] leading-[24px]">
							Kedves {first_name} {last_name},
						</Text>
						<Text className="text-black text-[14px] leading-[24px]">
							Meghívtak, hogy adminisztrátor legyél a Walker&Weights belső felületén. Kérlek, kattints az alábbi gombra a jelszó beállításához.
						</Text>
						<Section className="text-center mt-[32px] mb-[32px]">
							<Button
								className="bg-[#000000] rounded-md text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
								href={password_setup_link}
							>
								Jelszó beállítása
							</Button>
						</Section>
						<Text className="text-black text-[14px] leading-[24px]">
							vagy másold be ezt az URL-t a böngésződbe:{" "}
							<Link href={password_setup_link} className="text-blue-600 no-underline">
								{password_setup_link}
							</Link>
						</Text>
						<Text className={"text-black text-[14px] leading-[24px]"}>
							Üdvözlettel,
							<br/>
							Walker&Weights csapata
						</Text>
						<Hr className="border border-solid border-[#eaeaea] my-[16px] mx-0 w-full"/>
						<Text className="text-[#666666] text-[12px] leading-[24px]">
							Amennyiben nem várt erre az emailre, kérjük hagyja figyelmen kívül.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

AdminPasswordSetup.PreviewProps = {
	first_name: "Barnabás",
	last_name: "Kovács",
	password_setup_link: "https://example.com",
};

export default AdminPasswordSetup;