import { Link, Outlet } from 'react-router-dom';
import './Layout.css'
import { AuthData } from '../../AuthComponent/AuthContext';

const Layout = () => {

    const { logout , userType } = AuthData()

    const handleLogout = async() => {
        try {
            await logout()
        } catch (e) {
            console.log(e)
        }
    }

    return(
        <>
        <div className="layoutComponent" >
            <div className="layoutHeader">
                <h1> MONITORING SYSTEM</h1>
            </div>
            <div className='layoutNavbar'>
                <nav>
                    { userType.isAdmin &&
                    <ul className='navList' >
                        <li><Link className='navLinks'  to='/'>Dashbord</Link> </li>
                        <li><Link className='navLinks' to='usermanagement'>User Management</Link> </li>
                        <li><Link className='navLinks' to='event'>Event Oversight</Link> </li>
                        <li><Link className='navLinks' to='resource'>Resource Oversight</Link> </li>
                        <li><Link className='navLinks' to='report'>Report</Link> </li>
                        <li><Link className='navLinks' to='feedback'>Feedback</Link> </li>
                    </ul>
                    }
                    { userType.isFaculty &&
                    <ul className='navList' >
                        <li><Link className='navLinks'  to='/'>Dashbord</Link> </li>
                        <li><Link className='navLinks' to='eventlist'>Event</Link> </li>
                        <li><Link className='navLinks' to='attendance'>Attendance</Link> </li>
                        <li><Link className='navLinks' to='members'>Members</Link> </li>
                        <li><Link className='navLinks' to='feedback'>Feedback</Link> </li>
                    </ul>
                    }
                    { userType.isStudent &&
                    <ul className='navList' >
                        <li><Link className='navLinks'  to='/'>Dashbord</Link> </li>
                        <li><Link className='navLinks' to='eventclander'>EventCalander</Link> </li>
                        <li><Link className='navLinks' to='participation'>Participation</Link> </li>
                        <li><Link className='navLinks' to='qrcode'>QR Code  </Link> </li>
                        <li><Link className='navLinks' to='feedback'>Feedback</Link> </li>
                    </ul>
                    }
                    <ul className='logoutList'>
                        <li className='navLogout' onClick={ handleLogout }><p className='navLinks'>Logout</p></li>
                    </ul>
                </nav>
            </div>
        </div>
        <Outlet/>
        </>
    )
}

export default Layout;