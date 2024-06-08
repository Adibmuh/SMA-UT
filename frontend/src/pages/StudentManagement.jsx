/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import StudentList from "../components/Students/StudentList";
import StudentForm from "../components/Students/StudentForm";

const StudentManagement = () => {
    const [students, setStudents] = useState(null)
    

    useEffect(() => {
        const fetchStudents = async () => {
            const response = await fetch("/api/students")
            const json = await response.json()
            console.log("response: ", response);

            if (response.ok) {
                setStudents(json)
            }
        }

        fetchStudents();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto h-screen">
                <h1 className="text-2xl font-semibold pt-10 justify-center flex py-2">
                    Welcome to Student Management
                </h1>
                <div className="grid  grid-cols-2 gap-5">
                    <div className="mt-20">
                        <StudentList students={students} />
                    </div>

                    <div>
                        <StudentForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentManagement;
