/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem("userData")) || [];

    // Filter out teachers and initialize salary if not present
    const teacherData = users.map((user) => {
      if (user.profession === "Teacher") {
        // Add salary if it doesn't exist
        return {
          ...user,
          salary: user.salary || 0, // Default to 0 if salary does not exist
        };
      }
      return user;
    });

    // Update the state with teacher data
    setTeachers(teacherData.filter((user) => user.profession === "Teacher"));
    // Update localStorage with initialized salary data if needed
    localStorage.setItem("userData", JSON.stringify(teacherData));
  }, []);

  const handleSalaryChange = (e, randomId) => {
    const updatedTeachers = teachers.map((teacher) => {
      if (teacher.randomId === randomId) {
        return { ...teacher, salary: Number(e.target.value) };
      }
      return teacher;
    });
    setTeachers(updatedTeachers);
  };

  const handleSave = (randomId) => {
    // Get the current data from localStorage
    const allUsers = JSON.parse(localStorage.getItem("userData")) || [];

    // Update the specific teacher's salary
    const updatedUsers = allUsers.map((user) => {
      if (user.randomId === randomId) {
        const updatedTeacher = teachers.find(
          (teacher) => teacher.randomId === randomId
        );
        return { ...user, salary: updatedTeacher.salary };
      }
      return user;
    });

    // Update localStorage
    localStorage.setItem("userData", JSON.stringify(updatedUsers));

    // Show alert to notify the user
    alert("Salary updated successfully!");
  };

  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold mb-5">Teacher's Salary Table</h2>
      {teachers.length === 0 ? (
        <p>No teachers available.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Teacher Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile Number</th>
              <th className="border border-gray-300 p-2">Date of Birth</th>
              <th className="border border-gray-300 p-2">Salary</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.randomId}>
                <td className="border border-gray-300 p-2">{teacher.name}</td>
                <td className="border border-gray-300 p-2">{teacher.email}</td>
                <td className="border border-gray-300 p-2">{teacher.phone}</td>
                <td className="border border-gray-300 p-2">{teacher.dob}</td>
                <td className="border border-gray-300 p-2">
                  <input
                    type="number"
                    value={teacher.salary}
                    onChange={(e) => handleSalaryChange(e, teacher.randomId)}
                    className="border-2 border-gray-400 p-1 w-full"
                  />
                </td>
                <td className="border border-gray-300 p-2">
                  <button
                    className="bg-slate-500 text-white py-1 px-3 rounded"
                    onClick={() => handleSave(teacher.randomId)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TeacherTable;
