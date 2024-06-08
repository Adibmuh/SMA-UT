import React from "react";
import { useStudentsContext } from "../../hooks/useStudentsContext";

const StudentDetail = ({ student, index }) => {
    const { dispatch } = useStudentsContext();

    const handleClickDelete = async () => {
        const response = await fetch("/api/students/" + student._id, {
            method: "DELETE",
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: "DELETE_STUDENT", payload: json });
        }
    };

    const handleClickEdit = () => {
        dispatch({ type: "SET_STUDENT_TO_EDIT", payload: student });
    };

    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {index}
            </td>
            <td className="px-6 py-4">{student.name}</td>
            <td className="px-6 py-4">{student.address}</td>
            <td className="px-6 py-4">{student.age}</td>
            <td className="px-6 py-4 flex gap-2">
                <button
                    onClick={handleClickEdit}
                    className="py-1 px-4 bg-blue-700 text-white rounded-lg font-semibold"
                >
                    Edit
                </button>
                <button
                    onClick={handleClickDelete}
                    className="py-1 px-4 bg-red-700 text-white rounded-lg font-semibold"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default StudentDetail;
