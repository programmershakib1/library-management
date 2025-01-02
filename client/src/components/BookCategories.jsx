import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import border from "../assets/border.png";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";

const BookCategories = () => {
  const { animationValue } = useAuth();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("category.json").then((res) => setCategories(res.data));
  }, []);
  
  return (
    <div className="mt-20 mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center">
        <motion.h2 {...animationValue} className="text-2xl font-black font-row">
          Book Category
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center mt-2"
        >
          Discover a diverse range of book categories that cater to every
          reader&apos;s interest. From thrilling adventures to thought-provoking
          histories, each <br /> category offers a unique journey into the world
          of literature.
        </motion.p>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mt-5">
        {categories.map((category, idx) => (
          <Link
            to={`/category/${category.category}`}
            state={{ filterAvailable: false }}
            key={idx}
          >
            <motion.div
              {...animationValue}
              className="h-40 flex flex-col justify-center items-center p-10 hover:bg-primary rounded-full shadow-md"
            >
              <i className="fa-solid fa-layer-group text-3xl"></i>
              <h2 className="text-4xl font-bold mt-2 font-row">
                {category.category}
              </h2>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookCategories;
