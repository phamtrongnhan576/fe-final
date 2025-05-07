import { IconType } from 'react-icons';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';
import { Wifi, Tv, ParkingSquare } from 'lucide-react';
import { MdIron } from 'react-icons/md';
import { FaHandsWash, FaSwimmingPool } from 'react-icons/fa';

type NavItem = {
  key: string;
  label: string;
  href: string;
};

type ListInforPositions = {
  duration: string;
  image: string;
};

type ListHomeRooms = {
  href: string;
  title: string;
  image: string;
};

// Định nghĩa kiểu cho Icon
export type IconComponent =
  | ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  | IconType;

export type AmenityItem = {
  Icon: IconComponent;
  label: string;
};

export const amenities: AmenityItem[] = [
  { Icon: Wifi, label: "Wifi" },
  { Icon: Tv, label: "Tivi" },
  { Icon: ParkingSquare, label: "Bãi đỗ xe" },
  { Icon: MdIron, label: "Bàn ủi" },
  { Icon: FaSwimmingPool, label: "Hồ bơi" },
  { Icon: FaHandsWash, label: "Máy giặt" },
];

export const navItems: NavItem[] = [
  { key: "home", label: "Home", href: "/" },
  { key: "about", label: "About", href: "/about" },
  { key: "services", label: "Services", href: "/services" },
  { key: "pricing", label: "Pricing", href: "/pricing" },
  { key: "contact", label: "Contact", href: "/contact" },
];

export const listInforPositions: ListInforPositions[] = [
  {
    duration: "15 phút lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp"
  },
  {
    duration: "3 giờ lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/lbe3gpqkrwmzt98ce2nj.webp"
  },
  {
    duration: "6.5 giờ lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/xi99sldgebhfvd3n66yx.webp"
  },
  {
    duration: "15 phút lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/hnevi0eqxhxjgh6skplj.webp"
  },
  {
    duration: "7.5 giờ lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/v1skk44cynr7gauhzb4e.webp"
  },
  {
    duration: "45 phút lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/tqrm3cthowneesuafbp0.webp"
  },
  {
    duration: "30 phút lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/tgt8dxlfwdh41jkptxeg.webp"
  },
  {
    duration: "5 giờ lái xe",
    image: "https://res.cloudinary.com/rawn/image/upload/bt5jrxsl5ljq5bmfqqw0.webp"
  }
]

export const listHomeRooms: ListHomeRooms[] = [
  {
    href: "/rooms/ho-chi-minh",
    title: "Toàn bộ nhà",
    image: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329222%2Fmjwqhra4wbzlvoo2pe27.jpg&w=1920&q=75"
  },
  {
    href: "/rooms/nha-trang",
    title: "Chỗ ở độc đáo",
    image: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329186%2Ffmoml05qcd0yk2stvl9r.jpg&w=1920&q=75"
  },
  {
    href: "/rooms/da-lat",
    title: "Trang trại và thiên nhiên",
    image: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329121%2Fguagj5r2bkccgr1paez3.jpg&w=1920&q=75"
  },
  {
    href: "/rooms/da-nang",
    title: "Cho phép mang theo thú cưng",
    image: "https://rawn-airbnb.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Frawn%2Fimage%2Fupload%2Ff_webp%2Fq_auto%3Abest%2Fv1628329252%2Fgqhtg9ua6jdrffhbrfv1.jpg&w=1920&q=75"
  }
]