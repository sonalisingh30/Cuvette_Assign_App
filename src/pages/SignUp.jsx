/* eslint-disable no-unused-vars */
// Form.js
import { useState } from "react";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLockClosed,
  HiCalendar,
  HiOutlineUsers,
  HiBriefcase,
  HiArrowNarrowRight,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import useGenerateUniqueId from "../hooks/useGenerateUniqueId";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    profession: "",
    dob: "",
    phone: "",
    feesPaid: 0,
    enrolledClass: "",
  });
  const { randomId } = useGenerateUniqueId();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const classes = JSON.parse(localStorage.getItem("classes")) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Automatically update fees when a class is selected
    if (name === "enrolledClass") {
      const selectedClass = classes.find((cls) => cls.classGrade === value);
      setFormData((prevData) => ({
        ...prevData,
        feesPaid: selectedClass ? selectedClass.studentFees : 0,
      }));
    }
  };

  const validateForm = () => {
    let formErrors = {};

    if (!formData.name) {
      formErrors.name = "Full Name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }
    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.phone) {
      formErrors.phone = "Phone number is required";
    }
    if (!formData.dob) {
      formErrors.dob = "Date of Birth is required";
    }
    if (!formData.gender) {
      formErrors.gender = "Please select your gender";
    }
    if (!formData.profession) {
      formErrors.profession = "Please select your profession";
    }
    if (formData.profession === "Student" && !formData.enrolledClass)
      formErrors.enrolledClass = "Class selection is required for students";
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      const { confirmPassword, ...dataToSubmit } = formData;

      // Retrieve existing data from localStorage
      const existingUsers = JSON.parse(localStorage.getItem("userData")) || [];

      // Check if the email already exists
      const emailExists = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (emailExists) {
        setIsLoading(false);
        setErrors({
          email: "Email already exists, please use a different email",
        });
        return;
      }
      // If email is unique, add the new user
      const updatedUsers = [
        ...existingUsers,
        { ...dataToSubmit, enrolledDate: Date.now(), randomId },
      ];

      // Store the updated users back into localStorage
      localStorage.setItem("userData", JSON.stringify(updatedUsers));

      // Log the final form data
      console.log("Stored Data:", updatedUsers);
      setIsLoading(false);
      // Optionally, you can reset the form after successful submission
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        profession: "",
        dob: "",
        phone: "",
      });

      setErrors({}); // Clear errors after successful submission
    } else {
      setIsLoading(false);
      setErrors(formErrors); // Set validation errors
    }
  };

  const inputStyles = `w-full h-full outline-none px-3 border-none font-raleway font-bold text-slate-600 bg-transparent`;
  const divStyles = `flex items-center mb-5 border-2 border-slate-400 h-[3rem] w-[320px] sm:w-[420px] rounded-[8px] overflow-hidden pl-2`;
  const errorStyle = `mt-[-1rem] w-full text-sm text-red-800 font-semibold mb-2`;

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col gap-y-4">
      <div className="font-semibold font-raleway text-[2rem] flex flex-col items-center justify-center">
        <img src="/assets/logo.svg" className="w-[240px]" />
        <p className="text-slate-400">Register</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        {/* Full Name Input */}
        <div className={divStyles}>
          <label htmlFor="name">
            <HiUser size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputStyles}
            id="name"
          />
        </div>
        {errors.name && <p className={errorStyle}>{errors.name}</p>}

        {/* Email Input */}
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

        {/* Phone Number Input */}
        <div className={divStyles}>
          <label htmlFor="phone">
            <HiPhone size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={inputStyles}
            id="phone"
          />
        </div>
        {errors.phone && <p className={errorStyle}>{errors.phone}</p>}

        {/* Date of Birth Input */}
        <div className={divStyles}>
          <label htmlFor="dob">
            <HiCalendar size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={inputStyles}
            id="dob"
          />
        </div>
        {errors.dob && <p className={errorStyle}>{errors.dob}</p>}

        {/* Password Input */}
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

        {/* Confirm Password Input */}
        <div className={divStyles}>
          <label htmlFor="confirmPassword">
            <HiLockClosed size={`2rem`} className="text-slate-500" />
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={inputStyles}
            id="confirmPassword"
          />
        </div>
        {errors.confirmPassword && (
          <p className={errorStyle}>{errors.confirmPassword}</p>
        )}

        {/* Gender Radio Buttons */}
        <div className="flex w-full items-center justify-between mb-5">
          <div className="w-[40%] flex gap-2 items-center">
            <HiOutlineUsers size={`2rem`} className="text-slate-500 inline" />
            <label className="font-semibold font-nunito text-slate-800">
              Select Gender
            </label>
          </div>
          <div className="w-[30%] flex items-center">
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
              id="male"
              className="radio-input hidden"
            />
            <label
              className="ml-2 font-raleway font-[500] cursor-pointer custom-radio"
              htmlFor="male"
            >
              Male
            </label>
          </div>
          <div className="w-[30%] flex items-center">
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
              id="female"
              className="radio-input hidden"
            />
            <label
              className="ml-2 font-raleway font-[500] cursor-pointer custom-radio"
              htmlFor="female"
            >
              Female
            </label>
          </div>
        </div>
        {errors.gender && <p className={errorStyle}>{errors.gender}</p>}

        {/* Profession Radio Buttons */}
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
        {/* Class Dropdown for Students */}
        {formData.profession === "Student" && (
          <div className={divStyles}>
            <label htmlFor="classSelect">
              <HiOutlineUsers size={`2rem`} className="text-slate-500" />
            </label>
            <select
              name="enrolledClass"
              id="enrolledClass"
              value={formData.enrolledClass}
              onChange={handleChange}
              className={inputStyles}
            >
              <option value="">Select Class</option>
              {classes.map((cls) => (
                <option key={cls.classGrade} value={cls.classGrade}>
                  {cls.classGrade}
                </option>
              ))}
            </select>
          </div>
        )}
        {errors.enrolledClass && (
          <p className={errorStyle}>{errors.enrolledClass}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-slate-500 text-white py-2 px-4 rounded-md font-nunito w-full"
        >
          {isLoading ? (
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-white border-t-transparent"></span>
          ) : (
            <span> Sign Up</span>
          )}
        </button>

        <Link to="/signin" className="flex mt-5 w-full justify-center gap-x-2">
          <p className="text-semibold font-semibold text-slate-400">
            Do you have an account?
          </p>
          <span className="font-bold text-slate-500">SignIn</span>
        </Link>

        <Link to="/admin" className="flex mt-5 w-full justify-center gap-x-2">
          <p className="text-semibold font-semibold text-slate-800 flex items-center gap-x-5">
            Admin Panel <HiArrowNarrowRight />
          </p>
        </Link>
      </form>
    </div>
  );
};

export default SignUp;
