import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './Pages/AdminPage/Home';
import Layout from './Components/CommanComponent/LayoutComponent/Layout';
import UserManage from './Pages/AdminPage/UserManage';
import Login from './Components/AuthComponent/Login';
import { AuthData } from './Components/AuthComponent/AuthContext';
import Report from './Pages/AdminPage/Report';
import Feedback from './Pages/AdminPage/Feedback';
import Events from './Pages/AdminPage/Event';
import Resource from './Pages/AdminPage/Resource';
import Fdashbord from './Pages/FacultyPage/dashbord';
import EventList from './Pages/FacultyPage/Event';
import Attendance from './Pages/FacultyPage/attendancetracking';
import Member from './Pages/FacultyPage/membermanagement';
import EventCalander from './Pages/StudentPage/eventcalendar';
import Participation from './Pages/StudentPage/participationhistory';
import QrScanner from './Pages/StudentPage/qrcodescanner';
import FeedbackForm from './Pages/StudentPage/Feedback';

function App() {

  const { userType } = AuthData()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={(userType.isAdmin && <Navigate to="/" />) || (userType.isFaculty && <Navigate to="/" />) || (userType.isStudent && <Navigate to="/" />) || <Login/>} />
          <Route path='/' element={<Layout/>} >
            <Route index element={(userType.isAdmin && <AdminHome/>) || ((userType.isFaculty || userType.isStudent ) && <Fdashbord/> )  || <Navigate to="/login" /> }/>
           
            {//Admin routes
            }

            <Route path='usermanagement' element={(userType.isAdmin && <UserManage/>) || <Navigate to="/login" /> }/>
            <Route path='report' element={(userType.isAdmin && <Report/>) || <Navigate to="/login" />} />
            <Route path='feedback' element={((userType.isAdmin || userType.isFaculty) && <Feedback/>)|| (userType.isStudent && <FeedbackForm/>) ||<Navigate to="/login" />} />
            <Route path='event' element={(userType.isAdmin && <Events/>) ||  <Navigate to="/login" />} />
            <Route path='resource' element={(userType.isAdmin && <Resource/>) || <Navigate to="/login" />} />

            {/*Faculty routes */}

            <Route path='eventlist' element={(userType.isFaculty && <EventList/>) ||<Navigate to="/login" />}/>
            <Route path='attendance' element={(userType.isFaculty && <Attendance/>) ||<Navigate to="/login" />}/>
            <Route path='members' element={(userType.isFaculty && <Member/>) ||<Navigate to="/login" />}/>

            {/* Student Routes */}

            <Route path='eventclander' element={(userType.isStudent && <EventCalander/>) ||<Navigate to="/login" />}/>
            <Route path='participation' element={(userType.isStudent && <Participation/>) ||<Navigate to="/login" />}/>
            <Route path='qrcode' element={(userType.isStudent && <QrScanner/>) ||<Navigate to="/login" />}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
