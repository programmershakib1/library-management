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
      <div className="shadow-xl rounded-xl p-5 transition-transform hover:scale-105">
        <img className="w-full h-52 lg:h-72 rounded-xl" src={image} alt="" />
        <div className="flex justify-center items-center mt-5">
          <img src={border} alt="" />
        </div>
        <div className="flex items-center justify-between mt-5">
          <h2 className="text-xl font-bold">{name}</h2>
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
        <h4 className="font-semibold mb-3 mt-3">Author : {author}</h4>
        <p className="font-semibold">Quantity : {quantity}</p>
        <div className="flex items-center gap-2">
          <p className="font-semibold">Rating : </p>
          <ReactStars
            count={5}
            value={parseInt(rating)}
            size={30}
            edit={false}
            isHalf={true}
            activeColor="#ffd700"
          ></ReactStars>
        </div>
        {pathname === "/allBooks" ? (
          <Link to={`/updateBook/${_id}`} state={{ academicBook: false }}>
            <button className="w-full btn btn-sm px-6 font-bold rounded-sm mt-3">
              Update
            </button>
          </Link>
        ) : (
          <Link to={`/bookDetails/${_id}`} state={{ academicBook: false }}>
            <button className="w-full btn btn-sm px-6 font-bold rounded-sm mt-3">
              Details
            </button>
          </Link>
        )}
      </div>
    </Zoom>
  );
};

BookCard.propTypes = {
  book: PropTypes.object,
};

export default BookCard;
