/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addClass,
  deleteClass,
  loadClasses,
  assignTeacherToSubject,
} from "../slices/classSlice";
import ClassModal from "../compnents/ClassModal";
import StudentsTable from "../compnents/StudentTable";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassPage = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teacherList, setTeacherList] = useState([]);
  const [selectedTeachers, setSelectedTeachers] = useState({}); // Track selected teachers per subject

  const classes = useSelector((state) => state.classes); // Retrieve class list from state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadClasses());
    fetchTeachers();
  }, [dispatch]);

  const handleCardClick = (classData) => {
    setSelectedClass(classData); // Set the clicked class to display details
  };

  const handleCloseModal = () => {
    setSelectedClass(null); // Close the class details modal
  };

  const handleAddClass = () => {
    setIsModalOpen(true); // Open the modal to create a new class
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleCreateClass = (newClassData) => {
    dispatch(addClass(newClassData)); // Dispatch action to add the new class
    setIsModalOpen(false); // Close the modal after class is added
  };

  const handleFormSubmit = (data) => {
    // Handle form submission for creating a new class
    const newClassData = {
      id: Math.random().toString(36).substr(2, 9), // Generate random ID
      ...data,
    };
    handleCreateClass(newClassData); // Call function to create the class
    console.log("Class Data Submitted:", newClassData);
  };

  const fetchTeachers = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    const filteredTeachers = userData.filter(
      (user) => user.profession === "Teacher"
    );
    setTeacherList(filteredTeachers);
  };

  const handleDeleteClass = (classId) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      dispatch(deleteClass(classId));
    }
  };

  const handleTeacherChange = (subjectId, teacherId) => {
    setSelectedTeachers((prev) => ({
      ...prev,
      [subjectId]: teacherId,
    }));

    // Dispatch action to assign the teacher to the subject
    dispatch(
      assignTeacherToSubject({
        classId: selectedClass.id,
        subjectName: subjectId,
        teacherId: teacherId,
      })
    );
  };
  console.log(selectedClass?.classGrade, "seected class");

  const calculateGenderCount = () => {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];

    // Filter students based on the required criteria
    const filteredStudents = userData.filter(
      (student) =>
        student.profession === "Student" &&
        String(student.enrolledClass) === String(selectedClass?.classGrade) // Check the enrolled class
    );

    // Initialize counters
    let maleCount = 0;
    let femaleCount = 0;

    // Count male and female students
    filteredStudents.forEach((student) => {
      if (student.gender === "Male") {
        maleCount++;
      } else if (student.gender === "Female") {
        femaleCount++;
      }
    });

    return { maleCount, femaleCount };
  };
  console.log(calculateGenderCount());
  useEffect(() => {
    const classData = JSON.parse(localStorage.getItem("classes")) || [];
    const currentClass = classData.find((cls) => cls.id === selectedClass?.id);
    if (currentClass) {
      const initialTeachers = currentClass.classDetails.reduce(
        (acc, subject) => {
          acc[subject.subjectName] = subject.teacherId || "";
          return acc;
        },
        {}
      );
      setSelectedTeachers(initialTeachers);
    }
  }, [selectedClass]);

  return (
    <div className="h-full w-full p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Class Management</h1>
        {/* Create Class Button */}
        <button
          className="bg-sl-500 text-white py-2 px-4 bg-slate-500 rounded hover:bg-slate-600"
          onClick={handleAddClass}
        >
          Create Class
        </button>
        <ClassModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
        />
      </div>

      {/* Class Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes?.map((classItem) => (
          <div
            key={classItem?.id}
            onClick={() => handleCardClick(classItem)}
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl cursor-pointer transition-all duration-300"
            style={
              selectedClass?.id === classItem?.id
                ? { background: "gray", color: "white" }
                : {}
            }
          >
            <h2 className="text-xl font-semibold">
              Class: {classItem.classGrade}
            </h2>
            <p className="mt-2">Year: {classItem.year}</p>
            <p className="mt-2">Fees: ₹{classItem.studentFees}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClass(classItem.id);
              }}
              className="mt-2 bg-slate-500 text-white py-1 px-2 rounded hover:bg-slate-600"
            >
              Delete Class
            </button>
          </div>
        ))}
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="w-full flex justify-center items-center mt-6">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4">
              Class {selectedClass.classGrade} Details
            </h2>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b py-2">Subject</th>
                  <th className="border-b py-2">Assigned Teacher</th>
                </tr>
              </thead>
              <tbody>
                {selectedClass.classDetails.map((subject, index) => (
                  <tr key={index}>
                    <td className="border-b py-2">{subject.subjectName}</td>
                    <td className="border-b py-2">
                      <select
                        value={selectedTeachers[subject.subjectName] || ""}
                        onChange={(e) =>
                          handleTeacherChange(
                            subject.subjectName,
                            e.target.value
                          )
                        }
                        className="border-slate-300 rounded-full border-2 p-3"
                      >
                        <option value="">Not Assigned</option>
                        {teacherList.map((teacher) => (
                          <option
                            key={teacher.randomId}
                            value={teacher.randomId}
                          >
                            {teacher.name}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setSelectedClass(null)}
              className="mt-4 bg-slate-500 text-white py-2 px-4 rounded hover:bg-slate-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {selectedClass && <StudentsTable selectedClass={selectedClass} />}

      {selectedClass && (
        <div className="w-full flex justify-center items-center mt-6">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Gender Distribution</h2>

            {/* Chart */}
            {selectedClass && (
              <Bar
                data={{
                  labels: ["Male", "Female"],
                  datasets: [
                    {
                      label: "Number of Students",
                      data: [
                        calculateGenderCount(selectedClass.students).maleCount,
                        calculateGenderCount(selectedClass.students)
                          .femaleCount,
                      ],
                      backgroundColor: ["#fb923c", "#fbbf24"],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: "top",
                    },
                    title: {
                      display: true,
                      text: "Male vs Female Students",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassPage;
