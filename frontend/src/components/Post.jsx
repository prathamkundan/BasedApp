import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, deletePost } from '../features/posts/postSlice';
import { addLike, removeLike } from '../features/auth/authSlice';
import { AiFillLike, AiOutlineLike, AiFillEdit, AiFillDelete, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Modal from './Modal';

import '../static/Post.css';

export const Post = ({ post, postDate, unameColorHash, fromCurrUser, isLiked, likefunctions, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [expand, setExpand] = useState(false);
  const [modal, setModal] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(post.likes);

  const toggleModal = () => {
    setModal(!modal);
  }

  const toggleExpand = () => {
    setExpand(!expand);
  }

  const onUserClick = () => {
    if (window.location.pathname !== `/users/${post.author.username}`) {
      dispatch(reset());
      navigate(`/users/${post.author.username}`)
    }
  }

  const onEditClick = () => {
    dispatch(reset());
    navigate(`/edit/${post._id}`, { state: { toCreate: false, title: post.title, body: post.body, returnto: window.location.pathname } })
  }

  const onDeleteClick = () => {
    dispatch(deletePost(post._id));
    setDeleted(true);
    toast.success("Post Deleted");
  }

  const onLikeClick = async () => {
    if (token == null) {
      toast("Login to like posts!");
    }
    else {
      if (liked) {
        try {
          await likefunctions[1](post._id, token);
          dispatch(removeLike( post._id ))
          setLikes(likes - 1);
          setLiked(!liked);
        } catch (err) {
          toast.error(err.message);
        }
      }
      else {
        try {
          await likefunctions[0](post._id, token);
          setLikes(likes + 1);
          dispatch(addLike(post._id))
          setLiked(!liked);
        } catch (err) {
          toast.error(err.message);
        }
      }
    }
  }
  return (
    deleted ? ("") : (
      <>
        <div className="media-body p-4 border border-secondary rounded mt-4 ">
          {modal && <Modal content={{ heading: "Confirm delete?", body: "Are you sure you want to delete post titled: " + post.title }} closeAction={toggleModal} completeAction={onDeleteClick}></Modal>}

          <h4 className="mt-1">
            {post.title}
          </h4>

          <div className="container d-flex p-0 align-items-center justify-content-between">
            <div className='d-flex align-items-center'>
              <p className='h8 my-0 mr-2'><b>by:</b></p>
              <button className={`user-tag mx-1 ${unameColorHash}`} onClick={onUserClick}>{post.author.username}</button>
            </div>
            <div className='d-flex align-items-center date'>
              <b>{postDate}</b>
            </div>
          </div>


          <div className="d-flex justify-content-between">
            <div className='d-flex mt-3'>
              <button
                className='function-tag'
                onClick={toggleExpand}
              >
                {expand ? (<><AiFillCaretUp />Hide</>) : (<><AiFillCaretDown />Show</>)}
              </button>
              {fromCurrUser && (
                <>
                  <button
                    className='function-tag yellow'
                    onClick={onEditClick}
                  > <AiFillEdit /> Edit Post
                  </button>
                  <button
                    className='function-tag red'
                    onClick={toggleModal}
                  >
                    <AiFillDelete /> Delete
                  </button>
                </>
              )}
            </div>


            <div className="likebox d-flex align-items-center mt-2 p-0">
              <b className='h8'>{likes}</b>
              {!liked ? (<AiOutlineLike size={22} onClick={onLikeClick} className='like-button mx-2' />) :
                (<AiFillLike size={22} onClick={onLikeClick} className='like-button mx-2' />)}


            </div>
          </div>


          {expand && <p className='post-body mt-3'>{post.body}</p>}

        </div>
      </>
    )
  )
}

export default Post;