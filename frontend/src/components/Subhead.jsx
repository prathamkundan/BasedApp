import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { reset } from '../features/posts/postSlice';
import { FaPlus, FaList } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai';

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

    const toLikedPosts = () => {
        if (window.location.pathname !== `/liked`) {
            dispatch(reset());
            navigate(`/liked`)
        }
    }

    return (
        <div style={{ "backgroundColor": "red" }}>
            <div className="container d-flex">
                <button className="btn btn-warning rounded-pill d-flex align-items-center my-2 mx-2" onClick={onCreate}> <FaPlus /><b className='mx-1'>Create</b></button>
                <button className="btn btn-warning rounded-pill d-flex align-items-center my-2" onClick={toMyPosts}><FaList /><b className='mx-1'>My posts</b>    </button>
                <button className="btn btn-warning rounded-pill d-flex align-items-center my-2 mx-2" onClick={toLikedPosts}><AiFillHeart/><b className='mx-1'>Liked</b>    </button>
            </div>
        </div>
    )
}

export default Subhead