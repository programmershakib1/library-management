import Lottie from "lottie-react";
import border from "../assets/border.png";
import useAuth from "../hooks/useAuth";
import { motion } from "framer-motion";
import add_book from "../assets/lottie/add_book.json";
import borrowed_book from "../assets/lottie/borrowed_book.json";
import academic_book from "../assets/lottie/academic_book.json";
import gift_the_book from "../assets/lottie/gift_the_book.json";
import popular_book from "../assets/lottie/popular_book.json";

const Features = () => {
  const { animationValue } = useAuth();

  return (
    <div className="mt-20 mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center">
        <motion.h2 {...animationValue} className="text-2xl font-black font-row">
          LMS FEATURES
        </motion.h2>
        <motion.p
          {...animationValue}
          className="text-p font-semibold text-center mt-2"
        >
          Explore the robust features of our Library Management System, designed
          to enhance your library experience. Manage books effortlessly,
          discover <br /> popular titles, and spread the joy of reading through
          thoughtful gifting.
        </motion.p>
        <motion.div {...animationValue}>
          <img src={border} alt="" />
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center lg:gap-40 mb-10 md:mb-0">
        <motion.div {...animationValue} className="w-full">
          <Lottie animationData={add_book} className="h-96"></Lottie>
        </motion.div>
        <motion.div
          {...animationValue}
          className="w-full flex flex-col justify-center text-center"
        >
          <h4 className="text-2xl font-bold font-row">Add Book</h4>
          <p>
            Effortlessly enhance the library’s collection by adding new books
            with all the necessary details, including title, author, category,
            and quantity. This feature ensures the library remains organized and
            up-to-date, providing users with a seamless browsing experience.
            Empower librarians to manage an ever-growing collection with ease
            and precision.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center lg:gap-40 mb-10 md:mb-0">
        <motion.div
          {...animationValue}
          className="w-full flex flex-col justify-center text-center"
        >
          <h4 className="text-2xl font-bold font-row">Borrowed Book</h4>
          <p>
            Keep a meticulous record of all borrowed books with detailed
            tracking of due dates and user history. This feature ensures users
            can manage their loans effectively while preventing overdue returns.
            Librarians benefit from real-time updates on book availability,
            making inventory management more efficient and transparent.
          </p>
        </motion.div>
        <motion.div {...animationValue} className="w-full">
          <Lottie animationData={borrowed_book} className="h-96"></Lottie>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center lg:gap-40 mb-10 md:mb-0">
        <motion.div {...animationValue} className="w-full">
          <Lottie animationData={academic_book} className="h-96"></Lottie>
        </motion.div>
        <motion.div
          {...animationValue}
          className="w-full flex flex-col justify-center text-center"
        >
          <h4 className="text-2xl font-bold font-row">Academic Books</h4>
          <p>
            The Academic Books section includes textbooks covering a wide range
            of subjects, designed to provide students with essential knowledge
            and skills. These books cater to various educational levels, from
            primary to higher education, and align with curriculum standards.
            Each book is structured to promote understanding, critical thinking,
            and problem-solving, offering clear explanations, practical
            exercises, and real-world examples.
          </p>
        </motion.div>
      </div>
      <div className="flex flex-col md:flex-row justify-center lg:gap-40 mb-10 md:mb-0">
        <motion.div
          {...animationValue}
          className="w-full flex flex-col justify-center text-center"
        >
          <h4 className="text-2xl font-bold font-row">Gift the Book</h4>
          <p>
            Share the joy of reading with others by gifting books directly from
            the library’s collection. Whether it’s for a special occasion or an
            act of kindness, this feature makes it easy to send thoughtful gifts
            to friends and family. Users can select from a diverse range of
            genres and titles, spreading inspiration and knowledge one book at a
            time.
          </p>
        </motion.div>
        <motion.div {...animationValue} className="w-full">
          <Lottie animationData={gift_the_book} className="h-96"></Lottie>
        </motion.div>
      </div>
      <div className="flex  flex-col md:flex-row justify-center lg:gap-40 mb-10 md:mb-0">
        <motion.div {...animationValue} className="w-full">
          <Lottie animationData={popular_book} className="h-96"></Lottie>
        </motion.div>
        <motion.div
          {...animationValue}
          className="w-full flex flex-col justify-center text-center"
        >
          <h4 className="text-2xl font-bold font-row">Popular Books</h4>
          <p>
            Discover the most loved and frequently borrowed books in the
            library, curated based on user interactions and trends. This feature
            provides insights into the community&apos;s reading preferences,
            helping users find books they’ll love. Highlighting these popular
            titles encourages readers to explore bestsellers and timeless
            classics alike.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
