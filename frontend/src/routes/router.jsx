import { createBrowserRouter } from "react-router-dom";
import StudentManagement from "../pages/StudentManagement";

const router = createBrowserRouter([
    {
        path: '/',
        element: <StudentManagement />
    }
])

export default router