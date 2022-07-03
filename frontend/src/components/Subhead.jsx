import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/posts/postSlice';
import { FaPlus, FaList } from 'react-icons/fa'

function Subhead() {
    const { user } = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onCreate = () => {
        dispatch(reset());
        navigate('/create', { state: { toCreate: true, title: '', body: '', returnto: '/' } })
    }

    const toMyPosts = () => {
        if (window.location.pathname !== `/users/${user.username}`) {
            dispatch(reset());
            navigate(`/users/${user.username}`)
        }
    }

    return (
        <div style={{ "backgroundColor": "red" }}>
            <div className="container d-flex">
                <button className="btn btn-warning rounded-pill d-flex align-items-center my-2 mx-2" onClick={onCreate}> <FaPlus /><b>Create</b></button>
                <button className="btn btn-warning rounded-pill d-flex align-items-center my-2 " onClick={toMyPosts}><FaList /><b>My posts</b>    </button>
            </div>
        </div>
    )
}

export default Subhead