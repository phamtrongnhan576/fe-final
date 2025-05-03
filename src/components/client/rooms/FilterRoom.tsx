import { Button } from '@/components/ui/button';

export default function FilterRoom() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 hover:border-gray-900 duration-300 cursor-pointer"
      >
        Loại nơi ở
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 hover:border-gray-900 duration-300 cursor-pointer"
      >
        Giá
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 hover:border-gray-900 duration-300 cursor-pointer"
      >
        Đặt ngay
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 hover:border-gray-900 duration-300 cursor-pointer"
      >
        Phòng và phòng ngủ
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 hover:border-gray-900 duration-300 cursor-pointer"
      >
        Bộ lọc khác
      </Button>
    </div>
  );
}

