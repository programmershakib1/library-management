import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../firebase/firebase.config";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { imageUpload } from "../../utils/utils";

const UpdateProfile = () => {
  const [uploadImage, setUploadImage] = useState();
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    let name = user?.displayName;

    if (form.name.value) {
      name = form.name.value;
    }

    let photo = user?.photoURL;

    try {
      if (uploadImage?.image) {
        const imageUrl = await imageUpload(uploadImage.image);

        if (imageUrl) {
          photo = imageUrl;
        } else {
          toast.error("Image upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      e.target.reset();
      setUploadImage(false);
      toast.success("Profile update successful");

      setUser({ displayName: name, photoURL: photo });
      navigate("/profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:mt-9 dark:mt-10 md:dark:mt-24 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Update Profile</title>
      </Helmet>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="relative w-36 h-36 border-2 border-black dark:border-white rounded-full flex justify-center items-center">
          <label
            htmlFor="profilePhoto"
            className="w-full h-full flex items-center justify-center rounded-full cursor-pointer"
          >
            {uploadImage ? (
              <img
                className="w-full h-full rounded-full object-cover"
                src={uploadImage?.url}
                alt="Uploaded profile"
              />
            ) : (
              <h4 className="text-xl font-semibold">Profile</h4>
            )}
          </label>
          <input
            id="profilePhoto"
            type="file"
            name="image"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              setUploadImage({
                image: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
              })
            }
          />
        </div>
        <div className="flex flex-col w-4/5 md:w-1/2 lg:w-1/4 mx-auto">
          <label>
            <span className="font-semibold">Name</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Name"
            className="py-3 rounded-full shadow-md mt-1 pl-3 dark:bg-c"
          />
        </div>
        <div className="flex justify-center mt-3">
          <button className="bg-black py-0.5 px-6 text-white dark:bg-c rounded-full font-bold">
            {loading ? (
              <div className="flex justify-center items-center">
                <span className="loading loading-spinner text-white"></span>
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </form>
      <p className="font-semibold mt-2 text-center">
        Back to
        <Link to="/profile" className="pl-1 underline">
          Profile
        </Link>
      </p>
    </div>
  );
};

export default UpdateProfile;
