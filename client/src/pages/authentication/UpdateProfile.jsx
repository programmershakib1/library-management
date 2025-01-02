import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase/firebase.config";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;

    const email = auth.currentUser?.email;
    const updatedUser = { email, name, photo };

    axiosSecure.patch("/user", updatedUser).then((res) => {
      if (res.data.modifiedCount) {
        updateProfile(auth.currentUser, { displayName: name, photoURL: photo })
          .then(() => {
            e.target.reset();
            toast.success("Profile update successful");
            navigate("/profile");
          })
          .catch((error) => {
            toast.error(error?.code);
          });
        setUser({ displayName: name, photoURL: photo });
      }
    });
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Update Profile</title>
      </Helmet>
      <div className="md:w-2/4 lg:w-1/4 mx-auto">
        <h2 className="text-center mb-5 font-black text-2xl font-row">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Name</span>
            </label>
            <input
              name="name"
              type="text"
              placeholder="Name"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label>
              <span className="font-semibold">Photo URL</span>
            </label>
            <input
              name="photo"
              type="text"
              placeholder="Photo url"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <button className="w-full bg-primary py-2 rounded-full font-bold mt-5">
            Update
          </button>
        </form>
        <p className="font-semibold mt-2 text-center">
          Back to
          <Link to="/profile" className="pl-1 underline">
            Profile
          </Link>
        </p>
      </div>
    </div>
  );
};

export default UpdateProfile;
