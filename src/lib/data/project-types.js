export const projectTypes = [
	{
		title: "Világításkorszerűsítés",
		tasks: [
			{
				title: "Lecserélt világítótestek számának feltöltése",
				description: "Kérjük, töltse fel a lecserélt világítótestek típusonkénti számát, a világítótest-típusok névleges villamos teljesítményigényét tartalmazó táblázatot.",
				type: "xlsx"
			},
			{
				title: "Az új világítótestek számának feltöltése",
				description: "Kérjük, töltse fel az új világítótestek típusonkénti számát, a világítótest-típusok névleges villamos teljesítményigényét tartalmazó táblázatot.",
				type: "xlsx"
			},
			{
				title: "Előzetes méretezést és utólagos, dokumentált fénymérést igazoló jegyzőköny feltölése",
				description: "Kérjük, töltse fel az előzetes méretezést és utólagos, dokumentált fénymérést igazoló jegyzőkönyvet.",
				type: "pdf"
			},
			{
				title: "Az új világítási rendszer üzembehelyezését igazoló dokumentum feltöltése",
				description: "Kérjük, töltse fel az új világítási rendszer üzembehelyezését igazoló dokumentumot, különösen az üzembehelyezési jegyzőkönyvet.",
				type: "pdf"
			},
			{
				title: "A világítási rendszer szabályozhatóságának leírása, amennyiben van",
				description: "Kérjük, töltse fel a világítási rendszer szabályozhatóságának leírását.",
				type: "pdf"
			},
			{
				title: "Használati és üzembehelyezési űrlap kitöltése",
				description: "Kérjük, töltse ki a használat mértékével és az üzembehelyezés időpontjával kapcsolatos űrlapot.",
				type: "form",
				form_id: process.env.NEXT_PUBLIC_VILKOR_FORM_ID
			}
		]
	}
]