import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;
    const { user, isError, isLoading, isSuccess, message } = useSelector((state) => { return state.auth })

    const formUpdate = (e) => {
        setFormData((prevstate) => ({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username, password
        }
        dispatch(login(userData));
    }

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
        if (isSuccess || user) {
            toast.dismiss();
            toast.success("Welcome back!");
            navigate('/')
        }
        dispatch(reset());
    }, [user, isError, isLoading, isSuccess, message, dispatch, navigate])

    return (
        <div className='row my-5'>
            <div className="col-lg-3" />
            <div className="col-lg-6">
                <h1> <FaSignInAlt /> Login </h1>
                <form onSubmit={formSubmit}>
                    <div className="form-group my-3">
                        <label>Username</label>
                        <input
                            name='username'
                            value={username}
                            onChange={formUpdate}
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="form-group my-3">
                        <label>Password</label>
                        <input
                            name='password'
                            value={password}
                            onChange={formUpdate}
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-warning my-3">Login</button>
                </form>
                <p>New here? <Link to='/register'>Register</Link></p>
            </div>
            <div className="col-lg-3" />
        </div>
    )
}

export default Login