import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="mx-5 md:mx-0 mt-20">
      <div className="flex justify-center">
        <img className="w-14 h-14" src={logo} alt="" />
      </div>
      <h2 className="text-2xl text-black md:text-5xl font-black font-row text-center mt-2">
        L M S
      </h2>
      <p className="text-center font-semibold mb-10 mt-3 lg:mx-52">
        Discover the joy of reading with our extensive library collection. From
        timeless classics that have shaped generations to modern bestsellers
        that captivate the heart, our platform offers something for every book
        lover. Borrow your favorite titles, explore diverse genres, and embark
        on countless literary adventures. Join our community today and let your
        love for reading thrive like never before!
      </p>
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h4 className="text-2xl font-bold mb-3 md:mb-5">Quick access</h4>
          <div className="flex flex-col text-left">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/allBooks" className="hover:underline">
              All Books
            </Link>
            <Link to="/addBook" className="hover:underline">
              Add Book
            </Link>
            <Link to="borrowedBooks" className="hover:underline">
              Borrowed Books
            </Link>
            <Link to="profile" className="hover:underline">
              Profile
            </Link>
          </div>
        </div>
        <div className="text-left mt-5 md:mt-0">
          <h4 className="text-2xl font-bold mb-3 md:mb-5">About Us</h4>
          <p className="hover:underline">Privacy Policy</p>
          <p className="hover:underline">Terms of Service</p>
          <p className="hover:underline">User Guide</p>
          <p className="hover:underline">Contact Support</p>
          <p className="hover:underline">Accessibility</p>
        </div>
        <div className="text-left mt-5 md:mt-0">
          <h4 className="text-2xl font-bold mb-3 lg:mb-5">Contact Us</h4>
          <p>
            <i className="fa-solid fa-location-dot"></i> 123 Library Lane, NY
            56789
          </p>
          <p>
            <i className="fa-solid fa-envelope"></i> support@lms.com
          </p>
          <p>
            <i className="fa-solid fa-phone"></i> +1-800-LMS
          </p>
          <h2 className="text-2xl font-black font-row">LMS</h2>
        </div>
      </div>
      <div className="border border-black mt-5"></div>
      <div className="flex justify-center md:justify-between items-center my-10">
        <p className="text-center font-medium hidden md:block">
          © 2024 LMS. All rights Reserved.
        </p>
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://www.facebook.com/programmershakibbangladesh"
            target="_blank"
          >
            <i className="fa-brands fa-facebook text-3xl"></i>
          </a>
          <a href="https://www.instagram.com/programmershakib/" target="_blank">
            <i className="fa-brands fa-instagram text-3xl"></i>
          </a>
          <a href="https://x.com/programershakib" target="_blank">
            <i className="fa-brands fa-twitter text-3xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/programmershakib/"
            target="_blank"
          >
            <i className="fa-brands fa-linkedin-in text-3xl"></i>
          </a>
          <a href="https://github.com/programmershakib1" target="_blank">
            <i className="fa-brands fa-github text-3xl"></i>
          </a>
        </div>
      </div>
      <p className="text-center font-medium block md:hidden mb-10">
        © 2024 LMS. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
