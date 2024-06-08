import { createContext, useReducer } from "react";

export const StudentContext = createContext();

export const StudentReducer = (state, action) => {
    switch (action.type) {
        case "SET_STUDENTS":
            return {
                ...state,
                students: action.payload,
            };
        case "CREATE_STUDENT":
            return {
                students: [action.payload, ...state.students],
            };
        case "DELETE_STUDENT":
            return {
                ...state,
                students: state.students.filter(
                    (s) => s._id !== action.payload._id
                ),
            };
        case "UPDATE_STUDENT":
            return {
                ...state,
                students: state.students.map((student) =>
                    student._id === action.payload._id
                        ? action.payload
                        : student
                ),
            };
        case "SET_STUDENT_TO_EDIT":
            return {
                ...state,
                studentToEdit: action.payload,
            };
        default:
            return state;
    }
};

export const StudentContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(StudentReducer, {
        students: [],
        studentToEdit: null,
    });

    return (
        <StudentContext.Provider value={{ ...state, dispatch }}>
            {children}
        </StudentContext.Provider>
    );
};
