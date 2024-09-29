import { PiStudentThin } from "react-icons/pi";
import { VscSymbolClass } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import ClassTable from "../compnents/ClassTable";
import { useEffect, useState } from "react";
import TeacherClassTable from "../compnents/TeacherClassaTable";

function Profile() {
  const { userID } = useParams();
  console.log(userID);
  const [currentUser, setCurrentUser] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
    phone: "",
    gender: "",
    password: "",
    enrolledDate: "",
    profession: "",
    randomId: "",
  });
  // Store any error messages
  const [errorMessages, setErrorMessages] = useState([]);

  const [isEditable, setEditable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form data
  const validateFormData = () => {
    const errors = [];

    if (!formData.name) {
      errors.push("Name is required.");
    }

    if (!formData.email) {
      errors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.push("Email format is invalid.");
    }

    if (!formData.dob) {
      errors.push("Date of Birth is required.");
    }

    if (!formData.phone) {
      errors.push("Phone number is required.");
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errors.push("Phone number must be 10 digits.");
    }

    if (!formData.gender) {
      errors.push("Gender is required.");
    }
    if (!formData.password) {
      errors.push("Password is required.");
    }

    setErrorMessages(errors);
    return errors.length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    if (!validateFormData()) {
      return; // If validation fails, don't proceed with submission
    }

    // Fetch userData from localStorage
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Find the user by randomId and update the details
    const updatedUserData = userData.map((user) =>
      user.randomId === userID
        ? { ...user, ...formData } // Update only the editable fields
        : user
    );

    // Save the updated userData back to localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUserData));

    alert("Profile updated successfully!"); // Show alert on successful update
    toggleEdit();
    setErrorMessages([]); // Clear error messages on successful submission
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Find the user based on userID
    const currentUser = userData.find((user) => user.randomId === userID);

    setCurrentUser(currentUser);
    if (currentUser) {
      // Update formData with user data from localStorage
      setFormData({
        name: currentUser.name || "",
        email: currentUser.email || "",
        dob: currentUser.dob || "",
        phone: currentUser.phone || "",
        gender: currentUser.gender || "",
        password: currentUser.password || "",
        enrolledDate: currentUser.enrolledDate || "",
        profession: currentUser.profession || "",
        randomId: currentUser.randomId || "",
      });
    }
  }, [userID]);

  const toggleEdit = () => {
    setEditable(!isEditable);
  };

  const label = `text-lg font-nunito font-semibold text-slate-500 w-[30%]`;

  return (
    <div className="flex flex-col lg:flex-row w-full justify-between gap-x-[8rem]">
      <div className="w-full md:w-[50%] min-h-[250px] relative">
        <h1 className="font-raleway font-bold text-xl text-slate-600 mt-5 flex gap-x-2">
          <PiStudentThin size={30} stroke={10} className="font-bold" />
          <span> Personal Details</span>
        </h1>
        <div className="flex ml-[2rem] mt-5 flex-col gap-y-5 w-full">
          {/* Name */}
          <div className="w-full flex ">
            <label className={label}>Name: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`font-raleway text-slate-700 font-semibold w-full ${
                isEditable
                  ? "border-2 border-slate-500 p-2 bg-transparent"
                  : "bg-transparent"
              }`}
            />
          </div>
          {/* Email */}
          <div className="w-full flex ">
            <label className={label}>Email: </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`font-raleway text-slate-700 font-semibold w-full ${
                isEditable
                  ? "border-2 border-slate-500 p-2 bg-transparent"
                  : "bg-transparent"
              }`}
            />
          </div>
          {/* DOB */}
          <div className="w-full flex ">
            <label className={label}>DOB: </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`font-raleway text-slate-700 font-semibold w-full ${
                isEditable
                  ? "border-2 border-slate-500 p-2 bg-transparent"
                  : "bg-transparent"
              }`}
            />
          </div>
          {/* Phone */}
          <div className="w-full flex ">
            <label className={label}>Phone: </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`font-raleway text-slate-700 w-full font-semibold ${
                isEditable
                  ? "border-2 border-slate-500 p-2 bg-transparent"
                  : "bg-transparent"
              }`}
            />
          </div>
          {/* Gender */}
          <div className="w-full flex ">
            <label className={label}>Gender: </label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              disabled={!isEditable}
              className={`font-raleway text-slate-700 font-semibold w-full ${
                isEditable
                  ? "border-2 border-slate-500 p-2 bg-transparent"
                  : "bg-transparent"
              }`}
            />
          </div>

          {isEditable && (
            <div className="w-full flex ">
              <label className={label}>Password: </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={!isEditable}
                className={`font-raleway text-slate-700 font-semibold w-full bg-transparent outline-none border-slate-500 ${
                  isEditable
                    ? "border-2 border-slate-500 p-2 bg-transparent"
                    : "bg-transparent"
                }`}
              />
            </div>
          )}

          {/* Edit Button */}
          <div className="w-full flex justify-end mb-[1rem]">
            <button
              onClick={!isEditable ? toggleEdit : handleSubmit}
              className={`w-[120px] h-[3rem] ${
                isEditable ? "bg-slate-700" : "bg-slate-500"
              } text-white font-bold rounded-md hover:bg-slate-700 font-nunito text-xl flex items-center justify-center`}
            >
              {isEditable ? "Save" : "Edit"}
            </button>
          </div>
        </div>
        {errorMessages.length > 0 && (
          <div className="error-messages">
            {errorMessages.map((error, index) => (
              <p key={index} style={{ color: "red" }}>
                {error}
              </p>
            ))}
          </div>
        )}
        <span className=" w-2 h-[5rem] absolute bg-slate-700 left-[-1rem] top-0"></span>
        <span className=" w-[5rem] h-2 absolute bg-slate-700 left-[-1rem] top-0"></span>
      </div>

      <div className="w-full relative mb-5 mr-5 flex flex-col">
        <h1 className="font-raleway font-bold text-xl text-slate-600 mt-5 flex gap-x-2">
          <VscSymbolClass size={30} stroke={10} className="font-bold" />
          <span> Class Details</span>
        </h1>

        <div className="w-full flex mt-5">
          {currentUser?.profession === "student" ? (
            <ClassTable
              enrolledClassId={currentUser.enrolledClass}
              type="student"
            />
          ) : (
            <TeacherClassTable />
          )}
        </div>
        <span className=" w-2 h-[5rem] absolute bg-slate-700 left-[-1rem] top-0"></span>
        <span className=" w-[5rem] h-2 absolute bg-slate-700 left-[-1rem] top-0"></span>
      </div>
    </div>
  );
}

export default Profile;
