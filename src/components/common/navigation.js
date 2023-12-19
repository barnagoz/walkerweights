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
import { PersonIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export default function Navigation() {
  const { data: session, status } = useSession();
  return (
    <NavigationMenu className="px-4 py-2 bg-white mt-2 mx-2 rounded-lg backdrop-blur-md fixed drop-shadow-md shadow-border bg-opacity-25 w-full">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem className="mr-2">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className=" w-64 rounded-lg bg-white drop-shadow-md p-2">
              <h1>baj</h1>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {status == "loading" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger>...</NavigationMenuTrigger>
          </NavigationMenuItem>
        )}
        {status == "authenticated" && (
          <NavigationMenuItem>
            <NavigationMenuTrigger className="gap-2">
              <PersonIcon />
              {session.user.email}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className=" w-64 rounded-lg bg-white drop-shadow-md p-2">
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
              Bejelentkezés
            </NavigationMenuLink>
          </Link>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
