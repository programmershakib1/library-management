import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import border from "../assets/border.png";
import { Link } from "react-router-dom";

const GiftBook = () => {
  const [books, setBooks] = useState([]);
  const { animationValue } = useAuth();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_SERVER_URL}/gift-books`).then((res) => {
      setBooks(res.data);
    });
  }, []);

  return (
    <div className="mt-20 mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center">
        <motion.h2 {...animationValue} className="text-2xl font-black font-row">
          Gift the Book
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center mt-2"
        >
          Share the joy of reading by gifting a book to others. Select from a
          variety of titles and make someone’s day with the <br />
          gift of knowledge and stories.
        </motion.p>
        <motion.div {...animationValue}>
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
            <p className="font-semibold">Quantity : {book?.quantity}</p>
          </motion.div>
        ))}
      </div>
      <Link to="/giftBook">
        <motion.button
          {...animationValue}
          className="bg-primary py-3 px-8 font-bold mt-5 font-row"
        >
          Explore gift
        </motion.button>
      </Link>
    </div>
  );
};

export default GiftBook;
