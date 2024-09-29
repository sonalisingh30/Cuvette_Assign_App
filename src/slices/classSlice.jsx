/* eslint-disable no-unused-vars */
// src/redux/slices/classSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid"; // for generating random IDs

// Load data from localStorage
const loadFromLocalStorage = () => {
  const savedClasses = localStorage.getItem("classes");
  return savedClasses ? JSON.parse(savedClasses) : [];
};

// Load user data from localStorage
const loadUserData = () => {
  const savedUsers = localStorage.getItem("userData");
  return savedUsers ? JSON.parse(savedUsers) : [];
};

// Save data to localStorage
const saveToLocalStorage = (classes) => {
  localStorage.setItem("classes", JSON.stringify(classes));
};

// Initial state loaded from localStorage
const initialState = loadFromLocalStorage();

export const classSlice = createSlice({
  name: "classes",
  initialState,
  reducers: {
    // Create a new class
    addClass: (state, action) => {
      const newClass = {
        id: uuidv4(), // Generate a random ID for the class
        ...action.payload,
        classDetails: action.payload.classDetails.map((subject) => ({
          ...subject,
          subjectId: uuidv4(), // Generate a unique ID for each subject
        })),
      };
      state.push(newClass); // Use state.push() to add a new class
      saveToLocalStorage(state); // Save updated state to localStorage
    },

    // Edit a class by ID
    editClass: (state, action) => {
      const { id, updatedClass } = action.payload;
      const index = state.findIndex((cls) => cls.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedClass };
        saveToLocalStorage(state); // Save updated state to localStorage
      }
    },

    // Delete a class by ID
    deleteClass: (state, action) => {
      const id = action.payload;
      const updatedState = state.filter((cls) => cls.id !== id);
      saveToLocalStorage(updatedState); // Save updated state to localStorage
      return updatedState; // Return updated state
    },

    // Load classes from localStorage when the app starts
    loadClasses: (state) => {
      return loadFromLocalStorage(); // Return classes from localStorage
    },

    // Assign a teacher to a subject in a class
    assignTeacherToSubject: (state, action) => {
      const { classId, subjectName, teacherId } = action.payload;

      // Find the class by ID
      const selectedClass = state.find((c) => c.id === classId);

      if (selectedClass) {
        // Find the subject in the class by name
        const selectedSubject = selectedClass.classDetails.find(
          (subject) => subject.subjectName === subjectName
        );

        if (selectedSubject) {
          // Assign the teacher to the subject
          selectedSubject.teacherId = teacherId;

          // Update the teacherAssigned property based on whether the teacherId is set
          selectedSubject.teacherAssigned = teacherId
            ? selectedSubject.teacherId // Use teacherId or any relevant property to represent the teacher
            : null; // Reset to null if no teacher is assigned

          // Optionally find the teacher's name from localStorage (if you have it stored there)
          const allTeachers =
            JSON.parse(localStorage.getItem("userData")) || [];
          const assignedTeacher = allTeachers.find(
            (t) => t.randomId === teacherId
          );
          selectedSubject.teacher = assignedTeacher
            ? assignedTeacher.name
            : "Not Assigned";
        }
      }

      // Save updated state to localStorage
      saveToLocalStorage(state);

      alert("Teacher assigned succefully");
    },
  },
});

// Export the action creators
export const {
  addClass,
  editClass,
  deleteClass,
  loadClasses,
  assignTeacherToSubject,
} = classSlice.actions;

// Export the reducer
export default classSlice.reducer;
