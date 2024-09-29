/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const ClassTable = ({ enrolledClassId, type }) => {
  const pageSize = 5; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [classDetails, setClassDetails] = useState([]);
  const [classData, setClassData] = useState([]);

  console.log(enrolledClassId);

  useEffect(() => {
    // Fetch classes from localStorage
    const classes = JSON.parse(localStorage.getItem("classes")) || [];

    // Find the specific class by enrolledClassId
    console.log(classes);

    const classData = classes.find(
      (classItem) => classItem.classGrade === String(enrolledClassId).trim()
    );

    // Set the class details (subjects and assigned teachers)
    if (classData) {
      setClassData(classData);
      setClassDetails(classData.classDetails);
    }
  }, [enrolledClassId]);

  // Paginate data
  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentSubjects = classDetails?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const label = `text-lg font-nunito font-semibold text-slate-500 w-[30%]`;

  return (
    <div className="bg-slate-50 shadow-md rounded-md overflow-hidden w-full flex flex-col gap-y-[2rem]">
      <div className="w-full h-full relative">
        <div className="flex ml-[2rem] mt-5 flex-col gap-y-5 ">
          {/* ClassName */}
          <div className="w-full flex ">
            <label className={label}>Class: </label>
            <p>{classData.classGrade}</p>
          </div>
        </div>
      </div>
      <table className="min-w-full">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Sr.No</th>
            <th className="py-2 px-4 text-left">Subjects</th>
            <th className="py-2 px-4 text-left">Assigned Teacher</th>
            {type !== "student" && (
              <th className="py-2 px-4 text-left">Action</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentSubjects?.length > 0 ? (
            currentSubjects.map((subject, index) => (
              <tr
                key={subject.subjectId}
                className="border-b border-slate-500 hover:bg-gray-50"
              >
                <td className="py-2 px-4">
                  {index + 1 + (currentPage - 1) * pageSize}
                </td>
                <td className="py-2 px-4">{subject.subjectName}</td>
                <td className="py-2 px-4">{subject.teacher}</td>
                {type !== "student" && (
                  <td className="py-2 px-4">
                    <button className="text-slate-900 hover:underline">
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No subjects available for this class.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {classDetails?.length > pageSize && (
        <div className="flex justify-end items-center py-4 px-6 bg-slate-200 border-t border-slate-200 outline-none">
          {Array.from({
            length: Math.ceil(classDetails.length / pageSize),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`text-sm text-slate-800 px-3 py-1 mx-1 border-2 border-slate-300 rounded-md ${
                currentPage === index + 1 ? "bg-slate-100" : "hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassTable;
