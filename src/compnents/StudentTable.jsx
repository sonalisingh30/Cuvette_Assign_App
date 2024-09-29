/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const StudentsTable = ({ selectedClass }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Retrieve user data from localStorage
    const users = JSON.parse(localStorage.getItem("userData")) || [];

    // Filter out only the students enrolled in the selected class
    const filteredStudents = users.filter(
      (user) =>
        user.profession === "Student" &&
        (!selectedClass || user.enrolledClass === selectedClass.classGrade)
    );
    setStudents(filteredStudents);
  }, [selectedClass]);

  return (
    <div className="w-full mt-10">
      <h2 className="text-2xl font-bold mb-5">
        {selectedClass
          ? `Students Enrolled in Class ${selectedClass.classGrade}`
          : "All Students"}
      </h2>

      {students.length === 0 ? (
        <p>No students enrolled in this class.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Student Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Mobile Number</th>
              <th className="border border-gray-300 p-2">Date of Birth</th>
              <th className="border border-gray-300 p-2">Fees Paid</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.randomId}>
                <td className="border border-gray-300 p-2">{student.name}</td>
                <td className="border border-gray-300 p-2">{student.email}</td>
                <td className="border border-gray-300 p-2">{student.phone}</td>
                <td className="border border-gray-300 p-2">{student.dob}</td>
                <td className="border border-gray-300 p-2">
                  {student.feesPaid}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentsTable;
