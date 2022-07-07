import PostContainer from '../components/PostContainer';
import Sidebar from '../components/Sidebar';
import logo from '../static/based-logos/based-logos.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getLikedPosts } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LikedPosts() {
    const { posts, isError } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.auth);

    const front_message = `This is a (bit too) simplistic blog application made using the MERN stack. This is the creator's first full-stack project.\nNo, it does not have dark mode.\nYes, that's bad.`
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/');
        dispatch(getLikedPosts());
        return () => { dispatch(reset()); }
    }, [dispatch, navigate, user])

    return (
        <div className="row p-3">

            <div className="col-lg-8">
                {isError ?
                    (
                        <h2 className='my-5'>Something went wrong</h2>
                    ) :
                    (<>

                        <div className="col-lg-8">
                            <h2 className='my-3'>Posts liked by you</h2>
                        </div>

                        {/* If user has no posts */}
                        <PostContainer posts = {posts} user = {user}/>

                    </>)
                }

            </div>
            <div className="col-lg-4 position-relative">
                <Sidebar logo={logo} message_head={"Welcome to Based"} message_body={front_message}></Sidebar>
            </div>

        </div>
    )
}

export default LikedPosts