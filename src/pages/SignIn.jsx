import { useState } from "react";
import { HiBriefcase, HiLockClosed, HiMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";

/* eslint-disable no-unused-vars */
function SignIn() {
  const inputStyles = `w-full h-full outline-none px-3 border-none font-raleway font-bold text-slate-600 bg-transparent`;
  const divStyles = `flex items-center mb-5 border-2 border-slate-400 h-[3rem] w-[320px] sm:w-[420px] rounded-[8px] overflow-hidden pl-2`;
  const errorStyle = `mt-[-1rem] w-full text-sm text-red-800 font-semibold mb-2`;

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    profession: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.email) {
      formErrors.email = "Email is required";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }
    if (!formData.profession) {
      formErrors.profession = "Please select your profession";
    }
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Retrieve user data from localStorage
      const storedUsers = JSON.parse(localStorage.getItem("userData")) || [];

      // Check if the email and password match with any stored user
      const userMatch = storedUsers.find(
        (user) =>
          user.email === formData.email &&
          user.password === formData.password &&
          user.profession === formData.profession
      );
      console.log(userMatch);

      if (userMatch) {
        // Handle successful login (e.g., store session, redirect)
        console.log("Login successful!");
        navigate(`/dashboard/${userMatch.randomId}/${userMatch.profession}`); // Example: Redirect to a dashboard
      } else {
        // Show an error if no matching user is found
        setErrors({ general: "Invalid email, password, or profession" });
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="w-[320px] sm:w-[420px] min-h-screen mx-auto flex flex-col justify-center items-center gap-y-[2rem]">
      <div className="font-semibold font-raleway text-[2rem] flex flex-col items-center justify-center">
        <img src="/assets/logo.svg" className="w-[240px]" />
        <p className="text-slate-400">Sign In</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center ">
        <div className={divStyles}>
          <label htmlFor="email">
            <HiMail size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputStyles}
            id="email"
          />
        </div>
        {errors.email && <p className={errorStyle}>{errors.email}</p>}

        <div className={divStyles}>
          <label htmlFor="password">
            <HiLockClosed size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputStyles}
            id="password"
          />
        </div>
        {errors.password && <p className={errorStyle}>{errors.password}</p>}

        <div className="flex w-full items-center justify-between mb-5">
          <div className="w-[40%] flex gap-2 items-center">
            <HiBriefcase size={`2rem`} className="text-slate-500 inline" />
            <label className="font-semibold font-nunito text-slate-800">
              Select Profession
            </label>
          </div>
          <div className="w-[30%] flex items-center">
            <input
              type="radio"
              name="profession"
              value="Student"
              checked={formData.profession === "Student"}
              onChange={handleChange}
              id="student"
              className="radio-input hidden"
            />
            <label
              className="ml-2 font-raleway font-[500] cursor-pointer custom-radio"
              htmlFor="student"
            >
              Student
            </label>
          </div>
          <div className="w-[30%] flex items-center">
            <input
              type="radio"
              name="profession"
              value="Teacher"
              checked={formData.profession === "Teacher"}
              onChange={handleChange}
              id="teacher"
              className="radio-input hidden"
            />
            <label
              className="ml-2 font-raleway font-[500] cursor-pointer custom-radio"
              htmlFor="teacher"
            >
              Teacher
            </label>
          </div>
        </div>
        {errors.profession && <p className={errorStyle}>{errors.profession}</p>}

        {errors.general && <p className={errorStyle}>{errors.general}</p>}

        <button
          type="submit"
          className="bg-slate-500 text-white py-2 px-4 rounded-md font-nunito w-full"
        >
          {isLoading ? (
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></span>
          ) : (
            <span>Sign In</span>
          )}
        </button>

        <Link to="/signup" className="flex mt-5 w-full justify-center gap-x-2">
          <p className="text-semibold font-semibold text-slate-400">
            Don&apos;t have an account?
          </p>
          <span className="font-bold text-slate-500">SignUp</span>
        </Link>
      </form>
    </div>
  );
}

export default SignIn;
