import Post from '../components/Post';
import Sidebar from '../components/Sidebar';
import logo from '../static/based-logos/based-logos.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getPosts, getPostsByUser } from '../features/posts/postSlice';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import postUtilities from '../utilities/postUtilities';

function Postspage() {
    const { posts, isError } = useSelector((state) => state.posts);
    const { user } = useSelector((state) => state.auth);

    const { username } = useParams();

    const front_message = `This is a (bit too) simplistic blog application made using the MERN stack. This is the creator's first full-stack project.\nNo, it does not have dark mode.\nYes, that's bad.`
    const dispatch = useDispatch();

    useEffect(() => {
        if (username) dispatch(getPostsByUser(username));
        else dispatch(getPosts());
        return () => { dispatch(reset()); }
    }, [dispatch, username])

    return (
        <div className="row p-3">

            {isError ?
                (<div className="col-lg-8">
                    {/*In case user does not exist */}
                    <h2 className='my-5'>User does not exist</h2>
                </div>) :
                (<div className="col-lg-8">

                    <div className="col-lg-8">
                        {username ?
                            (<h2 className='my-3'>Posts by {username}</h2>) :
                            (<h2 className='my-3'>All Posts</h2>)
                        }
                    </div>

                    {/* If user has no posts */}
                    {posts.length === 0 ?
                        (<h2 className='my-5'>Nothing to show</h2>) :
                        (posts.map((post) =>
                            <Post 
                            key={post._id} 
                            post={post} 
                            unameColorHash ={postUtilities.hashUname(post.author.username)}
                            postDate = {postUtilities.dateify(post.createdAt)}
                            fromCurrUser={user && (post.author._id === user.id)}/>))
                    }

                </div>)
            }

            <div className="col-lg-4 position-relative">
                <Sidebar logo={logo} message_head={"Welcome to Based"} message_body={front_message}></Sidebar>
            </div>

        </div>
    )
}

export default Postspage