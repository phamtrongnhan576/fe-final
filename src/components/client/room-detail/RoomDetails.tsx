import { Star, Wifi, Tv, ParkingSquare } from 'lucide-react';
import { MdIron } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import Image from 'next/image';
import { IconComponent } from '@/lib/client/types/dataTypes';

type FeatureProps = {
  Icon: IconComponent;
  title: string;
  description?: string;
  hasMoreButton?: boolean;
}

export default function RoomDetails() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">
            Toàn bộ căn hộ. Chủ nhà <span className="underline uppercase">nnhatsang</span>
          </h3>
          <p>3 Khách • Phòng Studio • 1 Phòng ngủ • 1 giường • 1 Phòng tắm</p>
        </div>
        <div className="relative">
          <Image
            className="w-12 h-12 rounded-full object-cover"
            alt="Host profile"
            width={48}
            height={48}
            src="https://avatars.githubusercontent.com/u/93591100?v=4"
          />
          <div className="absolute top-7 left-7">
            <Star className="w-6 h-6 block fill-current text-rose-600" />
          </div>
        </div>
      </div>

      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Key features */}
      <div className="space-y-5">
        <Feature
          Icon={Wifi}
          title="Toàn bộ nhà"
          description="Bạn sẽ có chung cư cao cấp cho riêng mình."
        />
        <Feature
          Icon={Tv}
          title="Vệ sinh tăng cường"
          description="Chủ nhà này đã cam kết thực hiện quy trình vệ sinh tăng cường 5 bước của Airbnb. Hiển thị thêm"
          hasMoreButton={true}
        />
        <Feature
          Icon={ParkingSquare}
          title="Phong là Chủ nhà siêu cấp"
          description="Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách."
        />
        <Feature
          Icon={MdIron}
          title="Miễn phí hủy trong 48 giờ"
        />
      </div>

      <div className="mb-5 w-full h-px bg-gray-300"></div>

      {/* Description */}
      <div className="w-full">
        <button className="w-full text-black bg-white border-2 border-black rounded-lg py-3 hover:bg-rose-100 hover:text-rose-600 duration-300 flex justify-between items-center px-6 cursor-pointer hover:border-transparent">
          <span>Dịch sang tiếng Anh</span>
          <FaLanguage className="!w-12 !h-12" />
        </button>
        <p className="text-justify py-3">
          Tự nhận phòng<br />
          Tự nhận phòng bằng khóa thông minh.<br />
          Dinh Long là Chủ nhà siêu cấp<br />
          Chủ nhà siêu cấp là những chủ nhà có kinh nghiệm, được đánh giá cao và là những người cam kết mang lại quãng thời gian ở tuyệt vời cho khách.
        </p>
        <span className="font-bold underline cursor-pointer">Hiển thị thêm</span>
      </div>

      <div className="mb-5 w-full h-px bg-gray-300"></div>
    </>
  );
}

function Feature({ Icon, title, description, hasMoreButton = false }: FeatureProps) {
  return (
    <div className="flex gap-5">
      <Icon className="w-6 h-6" />
      <div className="space-y-2">
        <h4 className="text-sm font-bold">{title}</h4>
        {description && (
          <p className="text-sm text-gray-600 text-justify">
            {description}
            {hasMoreButton && (
              <span className="underline font-bold cursor-pointer"> Hiển thị thêm</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}