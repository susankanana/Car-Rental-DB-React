import { useState } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/nav/Nav";
import AdminDrawer from "./aside/AdminDrawer";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import Footer from "../../components/footer/Footer";

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (fixed height, stacked above drawer) */}
      <Navbar />

      {/* Top bar below navbar */}
      <div className="flex px-4 py-4 bg-gray-700 items-center lg:pl-72">
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
        <span className="text-white text-lg font-semibold">
          Welcome to your Admin dashboard
        </span>
      </div>

      <div className="flex flex-1">
        {/* Drawer for mobile & desktop */}
        <aside
          className={`
            fixed top-0 left-0 z-50 h-screen w-64 bg-gray-800 text-white
            transform ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
            transition-transform duration-300 ease-in-out
            lg:static lg:translate-x-0 lg:block
          `}
        >
          {/* Push drawer content down to clear fixed navbar (if needed) */}
          <div className="relative h-full overflow-y-auto pt-[4.5rem] lg:pt-6 px-4">
            {/* Close button for small screens */}
            <button
              className="absolute top-4 right-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>

            <AdminDrawer />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 bg-blue-100 min-h-screen">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
