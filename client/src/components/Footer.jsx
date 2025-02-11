import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <div className="mx-5 md:mx-0 mt-20">
      <div className="flex justify-center">
        <img className="w-14 h-14" src={logo} alt="" />
      </div>
      <h2 className="flex justify-center items-center gap-5 text-2xl text-black dark:text-white md:text-5xl font-black font-row text-center mt-2">
        <span>L</span> <span>M</span> <span>S</span>
      </h2>
      <p className="text-center font-semibold mt-3 lg:mx-52">
        Discover the joy of reading with our extensive library collection. From
        timeless classics that have shaped generations to modern bestsellers
        that captivate the heart, our platform offers something for every book
        lover. Borrow your favorite titles, explore diverse genres, and embark
        on countless literary adventures. Join our community today and let your
        love for reading thrive like never before!
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-10 font-semibold my-5">
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
      <div className="flex items-center justify-center gap-5">
        <a href="" target="_blank">
          <i className="fa-brands fa-facebook text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-instagram text-3xl"></i>
        </a>
        <a href="#" target="_blank">
          <i className="fa-brands fa-twitter text-3xl"></i>
        </a>
      </div>
      <div className="border border-black dark:border-white mt-5"></div>
      <p className="text-center font-medium my-10">
        © 2024 LMS. All rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
