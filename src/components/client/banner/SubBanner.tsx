// components/SubBanner.tsx
import { RootState } from "@/lib/client/store/store";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function SubBanner() {
  const pathname = usePathname();
  const slug = useMemo(() => pathname.split("/").pop() || "", [pathname]);

  const positions = useSelector((state: RootState) => state.position);

  const tinhThanh = useMemo(() => {
    return (
      positions.find((p) => p.slug === slug || p.id === +slug)?.tinhThanh ||
      "Hồ Chí Minh"
    );
  }, [positions, slug]);

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] lg:h-[60vh] 2xl:h-[80vh] mb-10">
      <Image
        src="https://res.cloudinary.com/df8p9vvyu/image/upload/v1747795481/Banner-sub-1_cul5xz.png"
        alt="SubBanner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 w-full h-full bg-black/20 dark:bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-4xl font-bold dark:text-gray-100">
          {tinhThanh}
        </span>
      </div>
    </div>
  );
}
