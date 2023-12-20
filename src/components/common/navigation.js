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
import { useSession } from "next-auth/react";
import {
  EnterIcon,
  HamburgerMenuIcon,
  PersonIcon,
  SymbolIcon,
} from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function Navigation() {
  const { data: session, status } = useSession();
  return (
    <div className="w-full fixed top-0 p-3">
      <NavigationMenu className="p-3 bg-white rounded-lg backdrop-blur-md outline outline-gray-200 shadow-md bg-opacity-30 min-w-full justify-between">
        <NavigationMenuList>
          <NavigationMenuItem className="ml-2">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuList className="gap-2">
          <NavigationMenuItem>
            <NavigationMenuTrigger arrowHidden={true}>
              <HamburgerMenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className=" w-64 rounded-lg bg-white drop-shadow-md p-2">
                <Link href="/">
                  <Button variant="secondary" className="w-full">
                    Kezdőlap
                  </Button>
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {status == "loading" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger arrowHidden={true}>
                <SymbolIcon />
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          )}
          {status == "authenticated" && (
            <NavigationMenuItem>
              <NavigationMenuTrigger className="gap-2">
                <PersonIcon />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className=" w-64 rounded-lg bg-white drop-shadow-md p-3 gap-2 flex flex-col">
                  <p className="muted">
                    Bejelentkezve, mint {session.user.email}
                  </p>
                  <Link href="/auth/logout">
                    <Button variant="secondary" className="w-full">
                      Kijelentkezés
                    </Button>
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          {status == "unauthenticated" && (
            <Link href="/auth/login">
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <EnterIcon />
              </NavigationMenuLink>
            </Link>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
