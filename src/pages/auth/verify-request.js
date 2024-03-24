import Template from "@/components/common/template";
import {cn} from "@/lib/utils";
import {NextSeo} from "next-seo";

export default function SignOut () {
    return (
        <Template includeFooter={false}>
            <NextSeo
                title={"Bejelentkezés"}
                noindex={true}
            />
            <div
                className={cn(
                    "w-full lg:grid lg:grid-cols-2 h-screen flex flex-col justify-center"
                )}
            >
                <div className={cn("lg:bg-amber-700 lg:mt-0 mt-4 flex justify-center")}>
                </div>
                <div className={cn("lg:p-8 p-4 gap-2 flex flex-col justify-center")}>
                    <h2 className={cn("text-2xl font-bold text-center")}>
                        Varázslink elküldve
                    </h2>
                    <p className={cn("text-center")}>
                        Az általad megadott e-mail címre elküldtünk egy linket, melynek
                        segítségével be tudsz jelentkezni.
                    </p>
                </div>
            </div>
        </Template>
    );
}
