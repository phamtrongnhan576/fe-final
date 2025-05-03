import { getPositionByPagination } from "@/lib/client/services/fetch";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { listInforPositions } from "@/lib/client/types/dataTypes";
import { slugify } from "@/lib/utils";
import { Position } from "@/lib/client/types/types";

export default async function ListPosition() {
  const positions = await getPositionByPagination();

  return (
    <div className="container mx-auto px-4 py-8">
      {positions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {positions.map((position: Position, index: number) => (
            <Link
              key={position.id}
              href={`/rooms/${slugify(position.tinhThanh)}`}
            >
              <Card
                className="w-full flex items-center cursor-pointer hover:bg-gray-100 hover:scale-105 transition duration-300 ease-in-out"
              >
                <CardContent className="p-4 flex items-center gap-3">
                  <Image
                    src={listInforPositions[index].image}
                    alt={position.tinhThanh}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h2 className="font-bold">{position.tinhThanh}</h2>
                    <p className="text-gray-700 text-sm flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {listInforPositions[index].duration}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Không có dữ liệu vị trí.</p>
      )}
    </div>
  );
}
