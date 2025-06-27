import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FaUserCheck } from "react-icons/fa6";


export type DrawerData = {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number }>;
    link: string;
}

export const adminDrawerData: DrawerData[] = [

    {
        id: "users",
        name: "Users",
        icon: FiUsers,
        link: "users"
    },
    {
        id: "cars",
        name: "Cars",
        icon: FaCar,
        link: "cars"
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
    },

]
