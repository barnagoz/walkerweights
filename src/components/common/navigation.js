import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {EnterIcon, HamburgerMenuIcon, PersonIcon, SymbolIcon,} from "@radix-ui/react-icons";
import {Button} from "../ui/button";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

export default function Navigation () {
    const {data: session, status} = useSession();
    return (
        <div className={cn("w-full fixed top-0 p-3 h-auto z-50")}>
            <NavigationMenu
                className={cn(
                    "p-1 bg-gray-200 rounded-lg backdrop-blur-md border border-gray-200 shadow-md bg-opacity-30 min-w-full justify-between"
                )}
            >
                <NavigationMenuList>
                    <NavigationMenuItem className={cn("bg-white p-2 rounded-md flex justify-start items-center gap-2")}>
                        <Image src="/asset/logo.png" alt="Logo" width={75} height={75}/>
                        <div className={"flex flex-col gap-1"}>
                            <Badge>
                                Béta
                            </Badge>
                            <Badge variant={"secondary"}>{process.env.NEXT_PUBLIC_VERSION}</Badge>
                        </div>

                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className={cn("gap-2")}>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn("my-2")} arrowHidden={true}>
                            <HamburgerMenuIcon/>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div
                                className={cn(
                                    " w-64 rounded-lg bg-white drop-shadow-md p-2 flex flex-col gap-2"
                                )}
                            >
                                <Link href="/">
                                    <Button variant="secondary" className={cn("w-full")}>
                                        Kezdőlap
                                    </Button>
                                </Link>
                                <Link href="/jelentkezes">
                                    <Button variant="secondary" className={cn("w-full")}>
                                        Ingyenes konzultáció
                                    </Button>
                                </Link>
                                <Link href="/kapcsolat">
                                    <Button variant="secondary" className={cn("w-full")}>
                                        Kapcsolat
                                    </Button>
                                </Link>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    {status == "loading" && (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger arrowHidden={true} className={cn("mr-2")}>
                                <SymbolIcon/>
                            </NavigationMenuTrigger>
                        </NavigationMenuItem>
                    )}
                    {status == "authenticated" && (
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className={cn("gap-2 mr-2")}>
                                <PersonIcon/>
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div
                                    className={cn(
                                        " w-64 rounded-lg bg-white drop-shadow-md p-3 gap-2 flex flex-col"
                                    )}
                                >
                                    <p className={cn("muted")}>
                                        Bejelentkezve, mint {session.user.email}
                                    </p>
                                    <Link href="/auth/logout">
                                        <Button variant="secondary" className={cn("w-full")}>
                                            Kijelentkezés
                                        </Button>
                                    </Link>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    )}
                    {status == "unauthenticated" && (
                        <Link href="/auth/login">
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "mr-2")}>
                                <EnterIcon/>
                            </NavigationMenuLink>
                        </Link>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
