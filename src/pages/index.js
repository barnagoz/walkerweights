import { useIsVisible } from "@/lib/isVisible";
import Template from "@/components/common/template";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const ref1 = useRef();
  const isVisible1 = useIsVisible(ref1);

  const ref2 = useRef();
  const isVisible2 = useIsVisible(ref2);

  const ref3 = useRef();
  const isVisible3 = useIsVisible(ref3);

  const ref4 = useRef();
  const isVisible4 = useIsVisible(ref4);

  return (
    <Template>
      <div className={cn("w-full h-full flex flex-col justify-center")}>
        <Carousel
          className={cn("w-full")}
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 6000 })]}
        >
          <CarouselContent>
            <CarouselItem
              className={cn(
                "w-full bg-cover min-h-[60vh] bg-gray-400 bg-blend-multiply"
              )}
              style={{
                backgroundImage:
                  "url('https://walkerweights.hu/assets/images/mbr-1920x1440.jpg')",
              }}
            >
              <div
                className={cn(
                  "w-4/5 h-full bg-gradient-to-r from-brand-green to-transparent flex flex-col justify-center items-start text-white p-4 py-26"
                )}
              >
                <h1 className={cn("text-3xl font-bold mb-2")}>
                  EKR menedzsment - Pénzt keresünk cégének!
                </h1>
                <p>
                  Ha csak egyszer is megfordult a fejében, hogy energetikai
                  korszerűsítést hajtson végre, akkor jó hírünk van: most van,
                  aki a beruházás költségeinek egy részét átvállalja. Ez nem
                  más, mint közvetlen kifizetés a cégüknek, tényleges árbevétel!
                  Ez az EKR RENDSZER nyújtotta lehetőség Önnek.
                </p>
                <div className={cn("flex gap-2 mt-2")}>
                  <Button>Vegye igénybe ingyenes konzultációnkat!</Button>
                  <Button variant="secondary">Részletek</Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem
              className={cn(
                "w-full bg-cover h-[60vh] bg-gray-400 bg-blend-multiply"
              )}
              style={{
                backgroundImage:
                  "url('https://walkerweights.hu/assets/images/mbr-6-1920x1280.jpg')",
              }}
            >
              <div
                className={cn(
                  "w-full h-full bg-gradient-to-r from-brand-gold to-transparent flex flex-col justify-center items-start text-white p-4 py-26"
                )}
              >
                <h1 className={cn("text-3xl font-bold mb-2")}>
                  Ha ön energiakereskedő, ez biztosan érdekli!
                </h1>
                <p>
                  Energiahatékonysági beruházásokat valósítunk meg, és a
                  beruházáson keletkezett EKR tanúsítványokat az
                  energiakereskedők részére értékesítjük. Folyamatosan
                  rendelkezünk többfajta értékesítésre váró EKR tanúsítvánnyal,
                  ezért könnyebben megtaláljuk az EKR kötelezettsége
                  teljesítésének leghatékonyabb módját. Hosszú távú, évek alatt
                  folyamatosan energiamegtakarítást termelő megoldásainkat sokak
                  veszik igénybe. A kiszámíthatóság értéket teremt.
                </p>
                <div className={cn("flex gap-2 mt-2")}>
                  <Button>Vegye igénybe ingyenes konzultációnkat!</Button>
                  <Button variant="secondary">Részletek</Button>
                </div>
              </div>
            </CarouselItem>
            <CarouselItem
              className={cn(
                "w-full bg-cover h-[60vh] bg-gray-500 bg-blend-multiply"
              )}
              style={{
                backgroundImage:
                  "url('https://walkerweights.hu/assets/images/mbr-1920x1200.jpg')",
              }}
            >
              <div
                className={cn(
                  "w-4/5 h-full bg-gradient-to-r from-brand-green to-transparent flex flex-col justify-center items-start text-white p-4 py-26"
                )}
              >
                <h1 className={cn("text-3xl font-bold mb-2")}>
                  Energetikai projektek átvilágítása
                </h1>
                <p>
                  A receptünk egyszerű. Tapasztalt energetikai szakjogászokkal
                  és kiváló tervezőkkel, villamosmérnökökkel dolgozunk együtt az
                  átvilágítások során. Naperőmű fejlesztések és villamosenergia
                  tárolók teljeskörű energia jogi, pénzügyi, adójogi, valamint
                  energetikai átvilágításával foglalkozunk, de nyújtunk
                  tanácsadói támogatást más early stage és ready-to-build
                  energetikai projektek fejlesztéséhez is.
                </p>
                <div className={cn("flex gap-2 mt-2")}>
                  <Button>Vegye igénybe ingyenes konzultációnkat!</Button>
                  <Button variant="secondary">Részletek</Button>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div className="p-4 flex flex-col gap-4">
        <div
          ref={ref1}
          className={cn(
            "transition-opacity ease-in duration-700 border border-gray-200 rounded-xl overflow-hidden"
          )}
          style={{
            backgroundImage:
              "url('https://walkerweights.hu/assets/images/mbr-918x551.jpg')",
          }}
        >
          <div
            className={cn(
              "w-full flex-col flex gap-2 col-span-3 p-4 rounded-xl duration-1000",
              isVisible1
                ? "backdrop-blur-md bg-black bg-opacity-30 text-white"
                : "text-transparent"
            )}
          >
            <h2 className={cn("text-2xl font-semibold")}>
              Mi az EKR rendszer?
            </h2>
            <p>
              Az EKR rendszer az energiahatékonysági kötelezettségi rendszer
              rövidített neve, melyet 2021. január 1. napjával vezettek be
              Magyarországon.
            </p>
            <p>
              Az EKR rendszer lényege, hogy ha egy energiahatékonysági
              beruházással (pl. épület világításkorszerűsítésével vagy
              szigetelésével) energiamegtakarítást ér el, és ezt a megtakarítást
              egy energetikai auditorral hitelesíti, akkor ún. EKR tanúsítvány
              (azaz hitelesített energiamegtakarítás) keletkezik, melyet
              értékesíteni tud a piacon. Ez tényleges extra árbevételt jelent!
            </p>
            <p>
              Ki veszi meg az EKR tanúsítványt? Az energiakereskedők nagy
              mennyiségben vásárolják, mert jogszabály kötelezi erre őket.
            </p>
            <p>
              Az EKR rendszer tehát lehetővé teszi, hogy az EKR tanúsítvány
              értékesítésével pénzt keressen cégének.
            </p>
            <p>
              A mi dolgunk kitalálni hogyan… ezt nevezzük EKR menedzsmentnek.
            </p>
          </div>
        </div>
        <div
          ref={ref2}
          className={cn(
            "transition-opacity ease-in duration-700 border border-gray-200 rounded-xl overflow-hidden bg-cover bg-center"
          )}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1634474588578-7f0565a1cea5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div
            className={cn(
              "w-full flex-col flex gap-2 col-span-3 p-4 rounded-xl duration-1000",
              isVisible2
                ? "backdrop-blur-md bg-black bg-opacity-30 text-white"
                : "text-transparent"
            )}
          >
            <h2 className={cn("text-2xl font-semibold")}>
              Hogyan értékesíthetünk EKR tanusítványt?
            </h2>
            <p>
              Az energiahatékonysági törvény alapján, 2021. január óta az
              energiakereskedőknek (áramkereskedők, gázkereskedők, és üzemanyag
              kereskedők) törvényi kötelezettségük adott mennyiségű
              energiamegtakarítást elérni, amit a leggyakrabban úgy tudnak
              teljesíteni, hogy EKR tanúsítványt (tehát hitelesített
              energiamegtakarítást) vásárolnak a piacon. Az EKR tanúsítvány
              eladása Önnek tényleges extra árbevételt jelent.
            </p>
            <p className={cn("font-semibold")}>
              Mi abban nyújtunk segítséget, hogy a hatályos jogszabályi
              környezetben hogyan tud EKR tanúsítványt energiahatékonysági
              beruházással létrehozni, és segítünk annak eladásában. Számos
              energiakereskedő partnerünk várja, hogy folyamatosan EKR
              tanúsítványhoz jusson.
            </p>
            <Button
              className={cn(
                "duration-1000 ease-in transition-opacity",
                isVisible2 ? "opacity-100" : "opacity-0"
              )}
            >
              Ingyenes konzultáció
            </Button>
          </div>
        </div>
        <div
          ref={ref3}
          className={cn(
            "transition-opacity ease-in duration-700 border border-gray-200 rounded-xl overflow-hidden bg-cover bg-center"
          )}
          style={{
            backgroundImage:
              "url('https://walkerweights.hu/assets/images/mbr-1080x720.jpg')",
          }}
        >
          <div
            className={cn(
              "w-full flex-col flex gap-2 col-span-3 p-4 rounded-xl duration-1000",
              isVisible3
                ? "backdrop-blur-md bg-black bg-opacity-30 text-white"
                : "text-transparent"
            )}
          >
            <h2 className={cn("text-2xl font-semibold")}>
              Fuvarozó cégeknek speciális lehetőség az eco driving
            </h2>
            <p className={cn("font-semibold")}>
              Energiatakarékos vezetés (eco driving) képzéssel
              energiamegtakarítást érhető el, amit a piacon energiakereskedőknek
              tudunk értékesíteni. Biztosan megtérül a beruházás, ezzel
              lehetetlen rosszul járni!
            </p>
            <p>
              Közel 10.000 GJ energiamegtakarítást hoztunk létre eco driving
              képzések megszervezésével, és az ebből származó
              energiamegtakarítás hitelesítésével. Az így keletkezett EKR
              tanúsítványokat sikerrel értélesítettük a piacon.
            </p>
            <p>
              Ráadásul, a statisztikák szerint az eco driving képzéssel évente
              5% üzemanyag mennyiség is megtakarítható.{" "}
            </p>
          </div>
        </div>
      </div>
      <div
        ref={ref4}
        className={cn(
          "p-4 grid grid-cols-3 gap-4 transition-opacity ease-in duration-1000",
          isVisible4 ? "opacity-100" : "opacity-0"
        )}
      >
        <div
          className={cn(
            "col-span-1 border border-gray-200 rounded-xl aspect-square p-4"
          )}
        >
          <h3 className="text-xl font-semibold mb-2">
            A mi dolgunk kitalálni...
          </h3>
          <p className="text-sm">
            Energetikai auditorunk egy ingyenes EKR felmérést követően
            javaslatot tesz a Ön cégénél megvalósítható, legnagyobb árbevétellel
            járó energiahatékonysági beruházás(ok)ra. A beruházás
            lebonyolításához segítséget nyújtunk, a beruházással keletkező
            energiamegtakarítást hitelesítjük, és az EKR tanúsítványt
            értékesítjük. Ön pedig ezzel pénzt keres.
          </p>
        </div>
        <div
          className={cn(
            "col-span-1 border border-gray-200 rounded-xl aspect-square p-4"
          )}
        >
          <h3 className="text-xl font-semibold mb-2">Kevéstől a sokig</h3>
          <p className="text-sm">
            Ha Ön energiakereskedő, és vásárlási céllal EKR tanúsítványokat
            keres az EKR kötelezettsége feltöltése érdekében, akkor nálunk
            többfajta csomagajánlat közül is válogathat. Akkor is segítünk, ha
            csak minimális mennyiségű GJ energiamegtakarításra van szüksége, és
            akkor is, ha több éves EKR kötelezettségét szeretné egy
            megállapodással megoldani. Ez utóbbi komoly előnyökkel is járhat.
          </p>
        </div>
        <div
          className={cn(
            "col-span-1 border border-gray-200 rounded-xl aspect-square p-4"
          )}
        >
          <h3 className="text-xl font-semibold mb-2">
            Mindenhova &quot;bevilágítunk&quot;
          </h3>
          <p className="text-sm">
            Villamosenergia termeléssel foglalkozó projektjével kapcsolatos
            kérdések esetén csapatunk szívesen ad szakmai tanácsot, illetve
            elvégezzük a meglévő vagy a megvásárolni szándékozott projekt
            teljeskörű átvilágítását energiajogi, adójogi, pénzügyi, és
            energetikai szakterületen. Jogászaink, villamosmérnökeink,
            tervezőink már összeszoktak, értik egymást, azonos nyelvet
            beszélnek.
          </p>
        </div>
      </div>
      <div className={cn("p-4 flex flex-col gap-2")}>
        <h2 className={cn("text-2xl font-bold")}>
          Az első mindig ingyen van...
        </h2>
        <p>
          <strong>Ha Ön beruházó</strong>, ingyenesen felmérjük az Ön cégénél
          elérhető összes energiamegtakarítást.
        </p>
        <p>
          <strong>Ha Ön energiakereskedő</strong>, ingyenesen összeállítjuk az
          Ön számára legoptimálisabb EKR tanúsítvány csomagajánlatot.
        </p>
        <p>
          <strong>Ha Ön energetikai tanácsadót keres</strong>, az első
          konzultáción ingyenesen áttekintjük a projektjét, és iránymutatást
          adunk a céljai eléréséhez.
        </p>
        <p className={cn("font-semibold")}>
          Azt szeretnénk, hogy azért válasszon bennünket, mert az első
          beszélgetésen elnyertük a bizalmát, és ne azért, mert az első
          konzultáció munkadíját már ránk költötte.
        </p>
        <Button>Vegye fel velünk a kapcsolatot</Button>
      </div>
      <h3 className={cn("w-full text-center font-bold text-2xl mt-4")}>
        Csapatunk
      </h3>
      <div className={cn("p-4 grid grid-cols-3 gap-4")}>
        <div
          className={cn("col-span-1 flex flex-col items-center text-center")}
        >
          <Avatar className="w-1/2 h-auto">
            <AvatarImage className="bg-" src="/Marianna.jpg" />
            <AvatarFallback>SZM</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold my-2">Szeifert Marianna</h3>
          <p className="text-sm">ügyvezető, kontrolling szakközgazdász</p>
        </div>
        <div
          className={cn("col-span-1 flex flex-col items-center text-center")}
        >
          <Avatar className="w-1/2 h-auto">
            <AvatarImage className="bg-" src="/Robert.jpg" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold my-2">dr. Sulyok Róbert</h3>
          <p className="text-sm">ügyvéd, energiajogász, EKR jogi szakértő</p>
        </div>
        <div
          className={cn("col-span-1 flex flex-col items-center text-center")}
        >
          <Avatar className="w-1/2 h-auto">
            <AvatarImage className="bg-" src="/Gabor.jpg" />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold my-2">Hajdu Gábor</h3>
          <p className="text-sm">
            energetikai auditor és szakreferens, okleveles villamosmérnök,
            gépészmérnök, közgazdász, EKR auditálási szakértő
          </p>
        </div>
        <div
          className={cn("col-span-1 flex flex-col items-center text-center")}
        >
          <Avatar className="w-1/2 h-auto">
            <AvatarImage className="bg-" src="/Aron.jpg" />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold my-2">Horváth Áron</h3>
          <p className="text-sm">kereskedelmi vezető</p>
        </div>
        <div
          className={cn("col-span-1 flex flex-col items-center text-center")}
        >
          <Avatar className="w-1/2 h-auto">
            <AvatarImage className="bg-" src="/Orsolya.jpg" />
            <AvatarFallback>HG</AvatarFallback>
          </Avatar>
          <h3 className="text-xl font-semibold my-2">Deák Orsolya</h3>
          <p className="text-sm">projekt koordinátor</p>
        </div>
      </div>
    </Template>
  );
}
