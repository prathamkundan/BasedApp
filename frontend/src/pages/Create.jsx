import { useSelector, useDispatch } from 'react-redux';
import { reset, createPost, updatePost } from '../features/posts/postSlice';
import { AiFillEdit } from 'react-icons/ai'
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import logo from '../static/based-logos/based-logos.jpeg';
import Sidebar from '../components/Sidebar';

function Create() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = useParams();

    const { isError, isSuccess, message } = useSelector((state) => state.posts);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [postData, setPostData] = useState({
        title: location.state.title,
        body: location.state.body,
    });

    const { title, body } = postData;

    const create_message = "Please do not post something incredily stupid... The creator is yet to develop some sort of moderation system"
    const edit_message = "You can edit your post. You cannot edit your title. Why you ask? Reddit does it that way..."

    useEffect(() => {
        if (location.state.toCreate && !isSuccess){
            setPostData({title:'', body:''})
        }
        if (!user) {
            dispatch(reset());
            navigate('/');
            toast("Log in to create posts!");
        }
        if (isError) {
            toast.error(message);
        }
        if (isSuccess) {
            toast.dismiss();
            if (location.state.toCreate)toast.success("Posted successfully!");
            else toast.success("Edited successfully!");
            setIsSubmitted((prevState) => true);
        }
        return () => { dispatch(reset()) };
    }, [dispatch, navigate, user, isError, message, isSuccess, location])


    const postSubmitAction = () => {
        dispatch(reset());
        navigate(location.state.returnto);
    }


    const formUpdate = (e) => {
        setPostData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    const formSubmit = (e) => {
        e.preventDefault();
        if (location.state.toCreate) dispatch(createPost(postData));
        else{
            const toBeUpdated = {id:postId, post: postData}
            dispatch(updatePost(toBeUpdated));
        }
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-lg-8 py-5">
                    {location.state.toCreate ?
                        (<h1><AiFillEdit /> Create a post </h1>) :
                        (<h1><AiFillEdit /> Edit your post </h1>)
                    }

                    <form onSubmit={formSubmit}>

                        <div className="form-group py-3">
                            <label >Title</label>
                            <input
                                onChange={formUpdate}
                                value={title}
                                type="text"
                                className="form-control"
                                name="title"
                                required={true}
                                placeholder="Title"
                                disabled={isSubmitted || !location.state.toCreate}
                            />
                        </div>

                        <div className="form-group py-3">
                            <label>What are your thoughts?</label>
                            <textarea
                                onChange={formUpdate}
                                value={body}
                                className="form-control"
                                name='body'
                                required={true}
                                rows="3"
                                placeholder='Post body'
                                disabled={isSubmitted}
                            ></textarea>
                        </div>

                        {!isSubmitted ?
                            (<button type="submit" className="btn btn-warning my-3">Submit</button>) :
                            (<button onClick={postSubmitAction} className="btn btn-warning my-3">Go Back</button>)
                        }

                    </form>
                </div>
                <div className="col-lg-4 position-relative">
                    <Sidebar logo={logo} message_head={"Show us what you think!"} message_body={location.state.toCreate?create_message:edit_message}></Sidebar>
                </div>
            </div>
        </div>
    )
}

export default Create