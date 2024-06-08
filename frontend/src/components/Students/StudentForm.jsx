import React, { useState, useEffect } from "react";
import { useStudentsContext } from "../../hooks/useStudentsContext";

const StudentForm = () => {
    const { dispatch, studentToEdit } = useStudentsContext();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [age, setAge] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    useEffect(() => {
        if (studentToEdit) {
            setName(studentToEdit.name);
            setAddress(studentToEdit.address);
            setAge(studentToEdit.age);
        }
    }, [studentToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const student = { name, address, age };

        if (studentToEdit) {
            const response = await fetch(`/api/students/${studentToEdit._id}`, {
                method: "PATCH",
                body: JSON.stringify(student),
                headers: { "Content-Type": "application/json" },
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields || []);
            } else {
                dispatch({ type: "UPDATE_STUDENT", payload: json });
                dispatch({ type: "SET_STUDENT_TO_EDIT", payload: null });
                setName("");
                setAddress("");
                setAge("");
                setError(null);
                setEmptyFields([]);
            }
        } else {
            const response = await fetch("/api/students", {
                method: "POST",
                body: JSON.stringify(student),
                headers: { "Content-Type": "application/json" },
            });

            const json = await response.json();
            if (!response.ok) {
                setError(json.error);
                setEmptyFields(json.emptyFields || []);
            } else {
                setName("");
                setAddress("");
                setAge("");
                setError(null);
                setEmptyFields([]);
                dispatch({ type: "CREATE_STUDENT", payload: json });
            }
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit} className="px-5 rounded-md py-10">
                <h3 className="text-xl font-bold text-center underline">
                    {studentToEdit ? "Edit Student" : "Create New Student"}
                </h3>

                <div className="flex flex-col gap-4 mt-5 items-center">
                    <div className="flex items-center">
                        <label className="w-[80px] font-semibold">Name</label>
                        <span className="mr-5 -ml-2">:</span>
                        <input
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className={
                                emptyFields.includes("name")
                                    ? "rounded-lg py-1.5 w-[200px] outline-none px-3 text-sm border border-red-600"
                                    : "rounded-lg py-1.5 w-[200px] outline-none px-3 text-sm"
                            }
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-[80px] font-semibold">Age</label>
                        <span className="mr-5 -ml-2">:</span>
                        <input
                            type="number"
                            onChange={(e) => setAge(e.target.value)}
                            value={age}
                            className={
                                emptyFields.includes("age")
                                    ? "rounded-lg py-1.5 w-[200px] outline-none border border-red-600 px-3 text-sm"
                                    : "rounded-lg py-1.5 w-[200px] outline-none px-3 text-sm"
                            }
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="w-[80px] font-semibold">
                            Address
                        </label>
                        <span className="mr-5 -ml-2">:</span>
                        <textarea
                            onChange={(e) => setAddress(e.target.value)}
                            value={address}
                            className={
                                emptyFields.includes("address")
                                    ? "rounded-lg py-1.5 w-[200px] outline-none px-3 text-sm border border-red-600"
                                    : "rounded-lg py-1.5 w-[200px] outline-none px-3 text-sm"
                            }
                        ></textarea>
                    </div>
                </div>

                <div className="text-center mx-auto flex my-5 max-w-[300px]">
                    <button className="bg-sky-400 text-white w-full font-bold py-1.5 rounded-md active:scale-90">
                        {studentToEdit ? "Update Student" : "Add Student"}
                    </button>
                </div>
                {error && (
                    <div className="text-center bg-red-700 p-5 rounded-lg max-w-[450px] mx-auto">
                        <p className="text-white font-semibold">{error}</p>
                    </div>
                )}
            </form>
        </>
    );
};

export default StudentForm;
