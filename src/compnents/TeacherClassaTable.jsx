import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the teacherId from the URL

const TeacherClassTable = () => {
  const { userID } = useParams(); // Extract the teacherId from the URL
  const [classData, setClassData] = useState([]);

  // Fetch data from localStorage when the component mounts
  useEffect(() => {
    const storedClasses = localStorage.getItem("classes");
    if (storedClasses) {
      const parsedClasses = JSON.parse(storedClasses);
      // Filter classes based on the teacherId
      const filteredClasses = parsedClasses
        .map((classItem) => {
          const filteredSubjects = classItem.classDetails?.filter(
            (subject) => subject.teacherId === userID
          );
          return filteredSubjects.length > 0
            ? { ...classItem, subjects: filteredSubjects }
            : null;
        })
        .filter(Boolean); // Remove null entries where no subject is assigned to the teacher
      setClassData(filteredClasses);
    }
  }, [userID]);

  return (
    <div className="bg-slate-200 shadow-md rounded-md overflow-hidden w-full">
      <table className="min-w-full">
        <thead className="bg-slate-700 text-white">
          <tr>
            <th className="py-2 px-4 text-left">Sr.No</th>
            <th className="py-2 px-4 text-left">Class Name</th>
            <th className="py-2 px-4 text-left">Subjects Assigned</th>
          </tr>
        </thead>
        <tbody>
          {classData.length > 0 ? (
            classData?.map((classItem, index) => (
              <tr
                key={classItem.classGrade}
                className="border-b border-slate-500 hover:bg-gray-50"
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">Class {classItem.classGrade}</td>
                <td className="py-2 px-4">
                  <ul>
                    {classItem.subjects.map((subject, subIndex) => (
                      <li key={subIndex}>{subject.subjectName}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">
                No subjects assigned to this teacher.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherClassTable;
