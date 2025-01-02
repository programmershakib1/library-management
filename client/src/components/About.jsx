import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import library from "../assets/lottie/library.json";
import Lottie from "lottie-react";

const About = () => {
  const { animationValue } = useAuth();

  return (
    <div className="text-center mt-10 mx-5 md:mx-0">
      <div>
        <Lottie animationData={library} className="h-40"></Lottie>
      </div>
      <motion.h2
        {...animationValue}
        className="text-5xl font-bold min-h-52 md:min-h-28 lg:min-h-20"
      >
        <Typewriter
          words={[
            "Welcome to Library Management System",
            "Explore Library Management System",
          ]}
          loop={0}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1500}
        />
      </motion.h2>
      <motion.p {...animationValue} className="text-p font-semibold">
        Effectively manage and track your library&apos;s resources with ease!
        From cataloging books to tracking borrowings, returns, and due dates,
        streamline all your daily library <br /> operations effortlessly. Our
        system ensures a smooth and organized process for both librarians and
        readers alike.
      </motion.p>
      <Link to="/allBooks">
        <motion.button
          {...animationValue}
          className="bg-primary py-2 px-8 font-semibold mt-3 font-row rounded-sm"
        >
          EXPLORE BOOK
        </motion.button>
      </Link>
    </div>
  );
};

export default About;
