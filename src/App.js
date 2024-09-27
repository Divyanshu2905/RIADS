// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';

import { Home } from './components/Home.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import About from './screens/about';
import Admin_Attendance from './screens/AdminPanel/scenes/Admin_Attendance.js';
import Admin_CandidateProfile from './screens/AdminPanel/scenes/Admin_CandidateProfile.js';
import Admin_Dashboard from './screens/AdminPanel/scenes/Admin_Dashboard.js';
import Admin_Notice from './screens/AdminPanel/scenes/Admin_Notice.js';
import Admin_Questions from './screens/AdminPanel/scenes/Admin_Questions.js';
import Admin_Result from './screens/AdminPanel/scenes/Admin_Result.js';
import Admin_Study from './screens/AdminPanel/scenes/Admin_Study.js';
import Candidate_Attendance from './screens/CandidatePanel/scenes/Candidate_Attendance.js';
// import Candidate_Dashboard from './screens/CandidatePanel/scenes/Candidate_Dashboard.js';
import Candidate_Result from './screens/CandidatePanel/scenes/Candidate_Result.js';
import Admin_Payments from './screens/AdminPanel/scenes/Admin_Payments.js';
import Admin_Courses from './screens/AdminPanel/scenes/Admin_Courses.js';
import Admin_Enrollments from './screens/AdminPanel/scenes/Admin_Enrollment.js';
import Candidate_Courses from './screens/CandidatePanel/scenes/Candidate_Courses.js';
import Candidate_StudyMaterial from './screens/CandidatePanel/scenes/Candidate_StudyMaterial.js';
import Candidate_Test from './screens/CandidatePanel/scenes/Candidate_Test.js';
import Candidate_ViewRegistration from './screens/CandidatePanel/scenes/Candidate_ViewRegistration.js';
import CandidateTest from './screens/CandidatePanel/scenes/CandidateTest.jsx';
import Contact from './screens/contact.jsx';
import ForgotPassword from './screens/ForgotPassword.js';
import Login from './screens/Login.js';
import Notice from './screens/notice.jsx';
import Register from './screens/register';
import Signup from './screens/Signup.js';
import Study from './screens/study.jsx';
import UpdateProfile from './screens/UpdateProfile.jsx';

function App() {
  return (
    <div className='App'>
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/notice' element={<Notice />} />
          <Route path='/login' element={<Login />} />
          <Route path='/study' element={<Study />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/update-profile'
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
          {/* <Route
            path='/candidate-dashboard'
            element={
              <PrivateRoute>
                <Candidate_Dashboard />
              </PrivateRoute>
            }
          /> */}
          <Route
            path='/candidate-attendance'
            element={
              <PrivateRoute>
                <Candidate_Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path='/candidate-studymaterial'
            element={
              <PrivateRoute>
                <Candidate_StudyMaterial />
              </PrivateRoute>
            }
          />
          <Route
            path='/candidate-result'
            element={
              <PrivateRoute>
                <Candidate_Result />
              </PrivateRoute>
            }
          />
          <Route
            path='/candidate-test'
            element={
              <PrivateRoute>
                <Candidate_Test />
              </PrivateRoute>
            }
          />
          <Route
            path='/candidate-viewregistration'
            element={
              <PrivateRoute>
                <Candidate_ViewRegistration />
              </PrivateRoute>
            }
          />

          <Route
            path='/candidate-courses'
            element={
              <PrivateRoute>
                <Candidate_Courses />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin-dashboard'
            element={
              <PrivateRoute>
                <Admin_Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-attendance'
            element={
              <PrivateRoute>
                <Admin_Attendance />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-courses'
            element={
              <PrivateRoute>
                <Admin_Courses />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-enrollments'
            element={
              <PrivateRoute>
                <Admin_Enrollments />
              </PrivateRoute>
            }
          />

          <Route
            path='/admin-notice'
            element={
              <PrivateRoute>
                <Admin_Notice />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-study'
            element={
              <PrivateRoute>
                <Admin_Study />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-questions'
            element={
              <PrivateRoute>
                <Admin_Questions />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-result'
            element={
              <PrivateRoute>
                <Admin_Result />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-payments'
            element={
              <PrivateRoute>
                <Admin_Payments />
              </PrivateRoute>
            }
          />
          <Route
            path='/admin-candidateprofile'
            element={
              <PrivateRoute>
                <Admin_CandidateProfile />
              </PrivateRoute>
            }
          />
          <Route path='/test' element={<CandidateTest />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

