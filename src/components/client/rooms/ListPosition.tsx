import { getPositionByPagination } from "@/lib/client/services/apiService";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { listInforPositions } from "@/lib/client/types/dataTypes";
import { Position } from "@/lib/client/types/types";
import { slugify } from "transliteration";

export default async function ListPosition() {
  const positions = await getPositionByPagination();

  return (
    <div className="container mx-auto px-4 py-12">
      {positions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {positions.map((position: Position, index: number) => (

            <Link
              key={position.id}
              href={`/rooms/${slugify(position.tinhThanh)}`}
              className="group"
            >
              <Card
                className="w-full h-full flex items-center cursor-pointer transition-all duration-300 ease-in-out 
                hover:shadow-lg hover:-translate-y-1 
                dark:hover:bg-gray-700/80 dark:bg-gray-800/90 dark:border-gray-700
                border border-gray-200 bg-white overflow-hidden"
              >
                <CardContent className="p-5 flex items-center gap-4 w-full">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg  border border-gray-100 dark:border-gray-600">
                      <Image
                        src={listInforPositions[index].image}
                        alt={position.tinhThanh}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-bold text-gray-800 dark:text-white truncate">
                      {position.tinhThanh}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1.5 mt-1">
                      <MapPin className="w-4 h-4 text-rose-500 dark:text-rose-400 flex-shrink-0" />
                      <span className="truncate">{listInforPositions[index].duration}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Không có dữ liệu vị trí.
          </p>
        </div>
      )}
    </div>
  );
}