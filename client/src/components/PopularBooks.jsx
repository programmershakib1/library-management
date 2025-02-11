import { useEffect, useState } from "react";
import axios from "axios";
import border from "../assets/border.png";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PopularBooks = () => {
  const [books, setBooks] = useState([]);
  const { animationValue } = useAuth();
  const { pathname } = useLocation();

  useEffect(() => {
    axios
      .get("books.json")
      .then((res) =>
        setBooks(pathname === "/popularBooks" ? res.data : res.data.slice(0, 5))
      );
  }, [pathname]);

  return (
    <div
      className={
        pathname === "/popularBooks"
          ? "md:mt-9 dark:mt-10 md:dark:mt-24 mx-5 md:mx-0"
          : "mt-20 mx-5 md:mx-0"
      }
    >
      <Helmet>
        <title>
          {pathname === "/popularBooks" ? "Popular Books - LMS" : ""}
        </title>
      </Helmet>
      <div className={pathname === "/popularBooks" ? "hidden" : ""}>
        <motion.h2
          {...animationValue}
          className="text-2xl font-black text-center font-row"
        >
          Popular Books
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center mt-2"
        >
          Explore a curated selection of the most beloved and influential books
          across genres. From timeless classics to modern masterpieces, these
          titles captivate readers <br /> with their unforgettable stories and
          profound insights.
        </motion.p>
        <motion.div {...animationValue} className="flex justify-center">
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">
        {books.map((book, idx) => (
          <motion.div
            {...animationValue}
            key={idx}
            className="dark:bg-c rounded-xl p-5 hover:shadow-2xl shadow-md"
          >
            <img className="w-full h-48 md:h-32 lg:h-40 rounded-xl" src={book?.image} alt="" />
            <h2 className="font-bold text-xl mt-3">
              {book?.name.length > 24
                ? book?.name.substring(0, 24) + "..."
                : book?.name}
            </h2>
            <p className="font-semibold">
              <i className="fa-solid fa-user"></i> {book?.author}
            </p>
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                <i className="fa-solid fa-clock"></i> {book?.publishingDate}
              </p>
              <a href={book.read} target="_blank">
                <button className="font-bold border border-black px-2 py-.5 rounded-md">
                  Read
                </button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
      {books.length >= 20 ? (
        ""
      ) : (
        <Link to="/popularBooks">
          <motion.button
            {...animationValue}
            className="border-2 border-black dark:bg-c py-2.5 px-6 font-bold mt-5 font-row rounded-md"
          >
            View More
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default PopularBooks;
