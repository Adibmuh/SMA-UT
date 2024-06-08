import { useContext } from "react"
import { StudentContext } from "../context/StudentContext"

export const useStudentsContext = () => {
    const context = useContext(StudentContext)

    if (!context) {
        throw Error("useStudentsContext must be used insided an StudentsContextProvider")
    }

    return context
}