import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { register, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username, email, password, password2 } = formData;
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => { return state.auth })

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());
    }, [user, isError, isLoading, isSuccess, message, navigate, dispatch])

    const formUpdate = (e) => {
        setFormData((prevstate) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not match")
        } else {
            const userData = { username, email, password };
            dispatch(register(userData));
        }

    }


    return (
        <div className='row my-5'>
            <div className="col-lg-3" />
            <div className="col-lg-6">
                <h1> <FaUserAlt /> Register </h1>
                <form onSubmit={formSubmit}>
                    <div className="form-group my-3">
                        <label>Email</label>
                        <input name='email' value={email} onChange={formUpdate} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group my-3">
                        <label>Username</label>
                        <input name='username' value={username} onChange={formUpdate} type="text" className="form-control" id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group my-3">
                        <label>Password</label>
                        <input name='password' value={password} onChange={formUpdate} type="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="form-group my-3">
                        <label>Confirm Password</label>
                        <input name='password2' value={password2} onChange={formUpdate} type="password" className="form-control" id="password2" placeholder="Confirm password" />
                    </div>
                    <button type="submit" className="btn btn-warning my-3">Register</button>
                </form>
                <p>Already have an account? <Link to='/login'>Login</Link></p>
            </div>
            <div className="col-lg-3" />
        </div>
    )
}

export default Register;