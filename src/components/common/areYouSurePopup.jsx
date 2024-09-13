import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function AreYouSurePopup ({isOpen, setIsOpen, onConfirm, message, title}) {
	return (
		<AlertDialog open={isOpen} onDismiss={() => setIsOpen(false)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>{message}</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => setIsOpen(false)}>Mégsem</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm}>Megerősítés</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
);
}