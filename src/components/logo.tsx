import darkLogo from "@/assets/logos/dark.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="relative h-20 max-w-[5rem]">
      <Image
        src={"/images/logo/logo.png"}
        fill
        className="dark:hidden"
        alt="Sthg logo"
        role="presentation"
        quality={100}
      />

      <Image
        src={darkLogo}
        fill
        className="hidden dark:block"
        alt="Sthg logo"
        role="presentation"
        quality={100}
      />
    </div>
  );
}
