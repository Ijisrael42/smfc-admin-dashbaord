import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import OtherLayout from './components/OtherLayout';
import MainLayout from './components/MainLayout';
import Account from './pages/Account';
import CustomerList from './pages/CustomerList';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductList from './pages/ProductList';
import Register from './pages/Register';
import Settings from './pages/Settings';

import SignIn from './pages/SignIn';

import FieldList from './pages/sidemenu/FieldList';
import ApplicationList from './pages/sidemenu/ApplicationList';
import TutorList from './pages/sidemenu/TutorList';
import StudentList from './pages/sidemenu/StudentList';
import QuestionList from './pages/sidemenu/QuestionList';
import SessionList from './pages/sidemenu/SessionList';
import EarningList from './pages/sidemenu/EarningList';
import SystemValueList from './pages/sidemenu/SystemValueList';
// import PushNotification from './pages/sidemenu/PushNotification';

import Field from './pages/others/Field';
import Application from './pages/others/Application';
import Tutor from './pages/others/Tutor';
import Student from './pages/others/Student';
import Question from './pages/others/Question';
import Session from './pages/others/Session';
import Earning from './pages/others/Earning';
import SystemValue from './pages/others/SystemValue';
import Profile from './pages/others/Profile';
import PrivateRoute from './components/PrivateRoute';

const routes = [
  {
    path: 'app', element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },

      { path: 'fields', element: <FieldList /> },
      { path: 'applications', element: <ApplicationList /> },
      { path: 'tutors', element: <TutorList /> },
      { path: 'students', element: <StudentList /> },
      { path: 'questions', element: <QuestionList /> },
      { path: 'sessions', element: <SessionList /> },
      { path: 'earnings', element: <EarningList /> },
      { path: 'systemvalues', element: <SystemValueList /> },
      // { path: 'push-notification', element: <PushNotification /> },
      // My routes
    ]
  },
  {
    path: 'app', element: <OtherLayout />,
    children: [
      { path: 'field/:id', element: <Field /> },
      { path: 'application/:id', element: <Application /> }, 
      { path: 'tutor/:id', element: <Tutor /> }, 
      { path: 'student/:id', element: <Student /> }, 
      { path: 'question/:id', element: <Question /> }, 
      { path: 'session/:id', element: <Session /> }, 
      { path: 'earning/:id', element: <Earning /> }, 
      { path: 'systemvalue/:id', element: <SystemValue /> }, 
      { path: 'profile', element: <Profile /> }, 
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signin', element: <SignIn /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <PrivateRoute /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
