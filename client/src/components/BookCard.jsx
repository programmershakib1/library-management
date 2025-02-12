import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import border from "../assets/border.png";
import { Zoom } from "react-awesome-reveal";

const BookCard = ({ book }) => {
  const { pathname } = useLocation();
  const { _id, name, author, image, category, quantity, rating } = book;

  return (
    <Zoom>
      <div className="dark:bg-c shadow-xl rounded-xl p-5 transition-transform hover:scale-105">
        <img className="w-full h-52 lg:h-48 rounded-xl" src={image} alt="" />
        <div className="flex justify-center items-center mt-5">
          <img src={border} alt="" />
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {name.length > 30 ? name.substring(0, 30) + "..." : name}
          </h2>
        </div>
        <div className="flex justify-between items-center mt-2">
          <h4 className="font-semibold">
            <i className="fa-solid fa-user"></i> {author}
          </h4>
          <p
            className={`font-semibold badge ${
              category === "Novel" ? "text-primary" : ""
            } ${category === "Thriller" ? "text-warning" : ""} ${
              category === "History" ? "text-success" : ""
            } ${category === "Drama" ? "text-secondary" : ""} ${
              category === "Sci-Fi" ? "text-error" : ""
            }`}
          >
            {category}
          </p>
        </div>
        <p className="font-semibold mt-1">
          <i className="fa-solid fa-book pr-2"></i> {quantity}
        </p>
        <div className="flex justify-between items-center">
          <ReactStars
            count={5}
            value={parseInt(rating)}
            size={30}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          ></ReactStars>
          {pathname === "/allBooks" ? (
            <Link to={`/updateBook/${_id}`} state={{ academicBook: false }}>
              <button className="border border-black px-5 py-0.5 font-bold rounded-md">
                Update
              </button>
            </Link>
          ) : (
            <Link to={`/bookDetails/${_id}`} state={{ academicBook: false }}>
              <button className="border border-black px-5 py-0.5 font-bold rounded-md">
                Details
              </button>
            </Link>
          )}
        </div>
      </div>
    </Zoom>
  );
};

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
