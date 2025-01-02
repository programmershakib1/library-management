import About from "../components/About";
import Banner from "../components/Bannar";
import BookCategories from "../components/BookCategories";
import AvailableBooks from "../components/AvailableBooks";
import Contact from "../components/Contact";
import Faq from "../components/Faq";
import PopularBooks from "../components/PopularBooks";
import { Helmet } from "react-helmet-async";
import Features from "../components/Features";
import GiftBook from "../components/GiftBook";
import AcademicBooks from "../components/AcademicBooks";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LSM</title>
      </Helmet>
      <Banner></Banner>
      <About></About>
      <BookCategories></BookCategories>
      <AvailableBooks></AvailableBooks>
      <PopularBooks></PopularBooks>
      <AcademicBooks></AcademicBooks>
      <GiftBook></GiftBook>
      <Features></Features>
      <Faq></Faq>
      <Contact></Contact>
    </div>
  );
};

export default Home;
