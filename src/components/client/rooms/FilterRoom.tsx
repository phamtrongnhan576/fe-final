import { Button } from '@/components/ui/button';

export default function FilterRoom() {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-3">
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent"
      >
        Loại nơi ở
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent"
      >
        Giá
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent"
      >
        Đặt ngay
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent"
      >
        Phòng và phòng ngủ
      </Button>
      <Button
        variant="outline"
        className="rounded-lg text-md px-6 py-2 text-black border-gray-300 duration-300 cursor-pointer hover:bg-rose-100 hover:text-rose-600 hover:border-transparent"
      >
        Bộ lọc khác
      </Button>
    </div>
  );
}

