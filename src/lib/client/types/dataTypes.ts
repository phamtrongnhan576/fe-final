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
  { key: "about", label: "About", href: "/under-dev" },
  { key: "services", label: "Services", href: "/under-dev" },
  { key: "pricing", label: "Pricing", href: "/under-dev" },
  { key: "contact", label: "Contact", href: "/under-dev" },
];

export const listInforPositions: ListInforPositions[] = [
  {
    duration: "15 phút lái xe",
    image: "/position/1.webp"
  },
  {
    duration: "3 giờ lái xe",
    image: "/position/2.webp"
  },
  {
    duration: "6.5 giờ lái xe",
    image: "/position/3.webp"
  },
  {
    duration: "15 phút lái xe",
    image: "/position/4.jpg"
  },
  {
    duration: "7.5 giờ lái xe",
    image: "/position/5.webp"
  },
  {
    duration: "45 phút lái xe",
    image: "/position/6.webp"
  },
  {
    duration: "30 phút lái xe",
    image: "/position/7.webp"
  },
  {
    duration: "5 giờ lái xe",
    image: "/position/8.webp"
  }
]

export const listHomeRooms: ListHomeRooms[] = [
  {
    href: "/rooms/ho-chi-minh",
    title: "Toàn bộ nhà",
    image: "/room/1.webp"
  },
  {
    href: "/rooms/nha-trang",
    title: "Chỗ ở độc đáo",
    image: "/room/2.webp"
  },
  {
    href: "/rooms/da-lat",
    title: "Trang trại và thiên nhiên",
    image: "/room/3.webp"
  },
  {
    href: "/rooms/da-nang",
    title: "Cho phép mang theo thú cưng",
    image: "/room/4.webp"
  }
]