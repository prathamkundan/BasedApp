import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../static/based-logos/based-logos.jpeg';
import Subhead from './Subhead';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => { return state.auth });

    const onLogout = async () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }

    return (
        <>
            <nav className="navbar sticky-top nav-bar-dark bg-dark">
                <div className="container bg-dark">

                    <Link className='link bg-dark' to='/'>
                        <h1 className="text-white header-head">
                            <img src={logo} alt="" width={70} height={70} className='m-3 border rounded-circle' />
                            based
                        </h1>
                    </Link>
                    <div className='bg-dark'>
                        <ul className='navbar-nav'>
                            {user ? (<li className='nav-item text-light'>
                                <button className='btn btn-dark' onClick={onLogout}>
                                    <h5><FaSignOutAlt /> Logout</h5>
                                </button>
                            </li>) :
                                (<>
                                    <li className='nav-item text-light'>
                                        <Link className='link' to='/login'>
                                            <h5><FaSignInAlt /> Login</h5>
                                        </Link>
                                    </li>
                                    <li className='nav-item text-light'>
                                        <Link className='link' to='/register'>
                                            <h5><FaUserAlt /> Register</h5>
                                        </Link>
                                    </li>
                                </>)}
                        </ul>
                    </div>
                </div>
            </nav>
            {user && (<Subhead></Subhead>)}
        </>
    );
}

export default Header;