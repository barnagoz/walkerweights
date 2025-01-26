import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"

export default function StatCard ({title, icon, value, description, loading}) {
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-4">
				<CardTitle className="text-sm font-medium mr-2">{title}</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{loading ? "Betöltés..." : value}</div>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	)
}
