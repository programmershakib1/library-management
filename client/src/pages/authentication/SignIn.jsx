import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const SignIn = () => {
  const {
    handleSignIn,
    handleGoogleLogin,
    handleGithubLogin,
    setUser,
    setEmailValue,
    locations,
    setLocations,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleSignIn(email, password)
      .then((result) => {
        setUser(result?.user);
        e.target.reset();

        const lastSignInTime = result?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };
        toast.success("User sign In successful");

        axiosSecure.patch("/user/login", loginInfo).then(() => {});

        if (locations) {
          navigate(locations);
        } else {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch((error) => {
        toast.error(error?.code);
      });
  };

  const handleEmail = () => {
    setEmailValue("");
    const email = emailRef.current.value;
    if (!email.includes("@") && !email == "") {
      return toast.error("Please provide a valid mail");
    } else {
      setEmailValue(email);
    }
  };

  const handleLocations = () => {
    setLocations(location.state);
  };

  return (
    <div className="md:mt-10 mx-5 md:mx-0">
      <Helmet>
        <title>LMS - Sign In</title>
      </Helmet>
      <div className="md:w-2/4 lg:w-1/4 mx-auto">
        <h2 className="text-center mb-5 font-black text-2xl font-row">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col">
            <label>
              <span className="font-semibold">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="Email"
              ref={emailRef}
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <div className="w-full flex flex-col mt-3">
            <label>
              <span className="font-semibold">Password</span>
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="mt-1 p-3 rounded-full border border-black"
              required
            />
          </div>
          <Link to="/forgetPassword" onClick={handleEmail}>
            <p className="text-xs font-semibold py-2 hover:underline text-center">
              Forget password?
            </p>
          </Link>
          <button className="w-full bg-primary py-2 rounded-full font-bold">
            Sign In
          </button>
        </form>
        <p className="pt-2 text-center text-sm font-semibold">
          Don&apos;t have an Account?<span> </span>
          <Link to="/signUp" onClick={handleLocations} className="underline">
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col md:flex-row gap-5 mt-5">
          <button
            onClick={() => {
              handleGoogleLogin()
                .then((result) => {
                  setUser(result.user);

                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };

                  axiosSecure.patch("/user/login", loginInfo).then(() => {
                    toast.success("User sign In successful");
                  });

                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="w-full bg-primary py-2 rounded-full font-bold"
          >
            <i className="fa-brands fa-google pr-2"></i>Google
          </button>
          <button
            onClick={() => {
              handleGithubLogin()
                .then((result) => {
                  setUser(result.user);

                  const email = result?.user?.email;
                  const lastSignInTime = result?.user?.metadata?.lastSignInTime;
                  const loginInfo = { email, lastSignInTime };

                  axiosSecure.patch("/user/login", loginInfo).then(() => {
                    toast.success("User sign In successful");
                  });

                  if (locations) {
                    navigate(locations);
                  } else {
                    navigate(location?.state ? location.state : "/");
                  }
                })
                .catch((error) => {
                  toast.error(error?.code);
                });
            }}
            className="w-full bg-primary py-2 rounded-full font-bold"
          >
            <i className="fa-brands fa-github pr-2"></i>Github
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
