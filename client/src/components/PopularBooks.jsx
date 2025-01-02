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
          ? "md:mt-10 mx-5 md:mx-0"
          : "mt-20 mx-5 md:mx-0"
      }
    >
      <Helmet>
        <title>
          {pathname === "/popularBooks" ? "LMS - Popular Books" : ""}
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
            className="rounded-xl p-5 hover:shadow-2xl shadow-md"
          >
            <img className="w-full h-40 rounded-xl" src={book?.image} alt="" />
            <h2 className="font-bold text-xl mt-3">{book?.name}</h2>
            <p className="font-semibold">Author : {book?.author}</p>
            <p className="font-semibold">Published : {book?.publishingDate}</p>
            <a href={book.read} target="_blank">
              <button className="font-bold underline">Read</button>
            </a>
          </motion.div>
        ))}
      </div>
      {books.length >= 20 ? (
        ""
      ) : (
        <Link to="/popularBooks">
          <motion.button
            {...animationValue}
            className="bg-primary py-3 px-8 font-bold mt-5 font-row"
          >
            View More
          </motion.button>
        </Link>
      )}
    </div>
  );
};

export default PopularBooks;
