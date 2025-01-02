import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import "animate.css";
import ScrollRestoration from "../components/ScrollRestoration";

const MainLayout = () => {
  return (
    <div className="container mx-auto">
      <ScrollRestoration></ScrollRestoration>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default MainLayout;
