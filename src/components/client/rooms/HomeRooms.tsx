  import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  import Image from 'next/image';
  import Link from 'next/link';
  import { listHomeRooms } from '@/lib/client/types/dataTypes';

  export default function HomeRooms() {
  return (
      <div className="container mx-auto space-y-3 pt-6 pb-16">
        <h1 className="font-bold text-3xl">Ở bất cứ đâu</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
          {listHomeRooms.map((room, index) => (
            <Link key={index} href={room.href} data-aos="flip-left">
              <Card className="w-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image
                    src={room.image}
                    alt={room.title}
                    width={1920}
                    height={1080}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg font-medium">{room.title}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    );
  }
