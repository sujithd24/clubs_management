import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHome from './Pages/AdminPage/Home';
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
import AppSidebar from './Components/LayoutComponent/LayoutComponent';
import PdfUploadForm from './Pages/FacultyPage/pdfupload';
import PDFListComponent from './Pages/FacultyPage/pdfDisplay';
import Sdashboard from './Pages/StudentPage/dashbord';
import QRGenerator from './Components/CommanComponent/QrGenerator/QrGenerator';

function App() {

  const { userType } = AuthData()
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={(userType.isAdmin && <Navigate to="/" />) || (userType.isFaculty && <Navigate to="/" />) || (userType.isStudent && <Navigate to="/" />) || <Login/>} />
          <Route path='/' element={<AppSidebar/>} >
            <Route index element={(userType.isAdmin && <AdminHome/>) || ((userType.isFaculty  ) && <Fdashbord/> ) || userType.isStudent && <Sdashboard/>  || <Navigate to="/login" /> }/>
           
            {//Admin routes
            }

            <Route path='usermanagement' element={(userType.isAdmin && <UserManage/>) || <Navigate to="/login" /> }/>
            <Route path='report' element={(userType.isAdmin && <Report/>) || <Navigate to="/login" />} />
            <Route path='feedback' element={((userType.isAdmin || userType.isFaculty) && <Feedback/>)|| (userType.isStudent && <Feedback/>) ||<Navigate to="/login" />} />
            <Route path='event' element={((userType.isFaculty || userType.isAdmin)  && <Events/>) ||  <Navigate to="/login" />} />
            <Route path='resource' element={(userType.isAdmin && <Resource/>) || <Navigate to="/login" />} />

            {/*Faculty routes */}

            <Route path='eventlist' element={(userType.isFaculty && <EventList/>) ||<Navigate to="/login" />}/>
            <Route path='attendance' element={(userType.isFaculty && <Attendance/>) ||<Navigate to="/login" />}/>
            <Route path='members' element={(userType.isFaculty && <PdfUploadForm/>) ||<Navigate to="/login" />}/>
            <Route path='pdfdisplay' element={((userType.isFaculty || userType.isAdmin) && <PDFListComponent/>) ||<Navigate to="/login" />}/>
            <Route path='qr' element={(userType.isFaculty && <QRGenerator/>) ||<Navigate to="/login" />}/>

            {/* Student Routes */}

            <Route path='eventclander' element={(userType.isStudent && <EventCalander/>) ||<Navigate to="/login" />}/>
            <Route path='participation' element={(userType.isStudent && <Attendance/>) ||<Navigate to="/login" />}/>
            <Route path='qrcode' element={(userType.isStudent && <QrScanner/>) ||<Navigate to="/login" />}/>
            <Route path='feedbackform' element={(userType.isStudent && <FeedbackForm/>) ||<Navigate to="/login" />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
