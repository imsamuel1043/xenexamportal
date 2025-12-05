import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Nav from "./Components/Nav";
import Banner from "./Components/Banner";
import Home from "./Components/Homepage/Home";
import Footer from "./Components/Footer";
import Admin from "./Components/Admins/Admin";
import Students from "./Components/Admins/Students";
import Signup from "./Components/Homepage/Signup";
import Courses from "./Components/Admins/Courses";
import OngoingExam from "./Components/Admins/OngoingExam";
import AssignExam from "./Components/Admins/AssignExam";
import QuestionBank from "./Components/Admins/QuestionBank";
import ExamResults from "./Components/Admins/ExamResults";
import Batches from "./Components/Admins/Batches";
import UserManagement from "./Components/Admins/UserManagement";
import UserGroup from "./Components/Admins/UserGroup";
import Permission from "./Components/Admins/Permission";
import LoginAdmin from "./Components/Homepage/LoginAdmin";

import StudentDash from "./Components/Students/StudentDash";
import StudentLayout from "./Components/Layouts/StudentLayout";
import Studentexam from "./Components/Students/Studentexam";
import Studentresult from "./Components/Students/Studentsresult";
import FeeBalance from "./Components/Students/FeeBalance";

import ProtectedRoute from "./Components/ProtectedRoute";
import LoginStudent from "./Components/Homepage/LoginStudent";
import StudentDetails from "./Components/Admins/StudentDetails";
import CompletedExamDetails from "./Components/Admins/CompletedExamDetails";

import { DataProvider } from "./Components/DataContext";
import Fees from "./Components/Admins/Fees";

import { NotificationProvider } from "./Components/NotificationContext";


// ======================= APP LAYOUT ========================= //

function AppLayout() {
  const location = useLocation();

  const hideNavRoutes = [
    "/signup",
    "/loginadmin",
    "/loginstudent",
    "/students/:id",
  ];

  const hideNav = hideNavRoutes.includes(location.pathname);

  const hideFooterRoutes = [
    "/signup",
    "/loginadmin",
    "/loginstudent",

    "/admin",
    "/students",
    "/courses",
    "/live",
    "/bank",
    "/result",
    "/batch",
    "/managment",
    "/group",
    "/permission",
    "/assign",
    "/fees",

    "/student/dashboard",
    "/exam",
    "/Studentresults",
    "/feebalance",
    "/students/:id",
  ];

  const hideFooter = hideFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideNav && <Nav />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Home />
            </>
          }
        />

        <Route path="/students/:id" element={<StudentDetails />} />
        <Route
          path="/completed-exams/:id"
          element={<CompletedExamDetails />}
        />

        <Route path="/Signup" element={<Signup />} />
        <Route path="/loginadmin" element={<LoginAdmin />} />
        <Route path="/loginstudent" element={<LoginStudent />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute role="admin">
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute role="admin">
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/live"
          element={
            <ProtectedRoute role="admin">
              <OngoingExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assign"
          element={
            <ProtectedRoute role="admin">
              <AssignExam />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bank"
          element={
            <ProtectedRoute role="admin">
              <QuestionBank />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute role="admin">
              <ExamResults />
            </ProtectedRoute>
          }
        />

        <Route
          path="/batch"
          element={
            <ProtectedRoute role="admin">
              <Batches />
            </ProtectedRoute>
          }
        />

        <Route
          path="/managment"
          element={
            <ProtectedRoute role="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/group"
          element={
            <ProtectedRoute role="admin">
              <UserGroup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/permission"
          element={
            <ProtectedRoute role="admin">
              <Permission />
            </ProtectedRoute>
          }
        />

        <Route
          path="/fees"
          element={
            <ProtectedRoute role="admin">
              <Fees />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentLayout>
                <StudentDash />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/exam"
          element={
            <ProtectedRoute role="student">
              <StudentLayout>
                <Studentexam />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/Studentresults"
          element={
            <ProtectedRoute role="student">
              <StudentLayout>
                <Studentresult />
              </StudentLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/feebalance"
          element={
            <ProtectedRoute role="student">
              <StudentLayout>
                <FeeBalance />
              </StudentLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}


function App() {
  return (
    <NotificationProvider>
      <DataProvider>
        <Router>
          <AppLayout />
        </Router>
      </DataProvider>
    </NotificationProvider>
  );
}

export default App;
