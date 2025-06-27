import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { TbBrandBooking } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa6";


export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const userDrawerData: DrawerData[] = [
    
    {
        id: "cars",
        name: "Cars",
        icon: FaCar,
        link: "cars"
    },
    {
        id: "bookings",
        name: "Bookings",
        icon: TbBrandBooking,
        link: "bookings"
    },
    {
        id: "profile",
        name: "Profile",
        icon: FaUserCheck,
        link: "profile"
    },
    {
        id: "analytics",
        name: "Analytics",
        icon: TbBrandGoogleAnalytics,
        link: "analytics"
    }

]