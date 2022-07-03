import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset, deletePost } from '../features/posts/postSlice';
import { AiFillEdit, AiFillDelete, AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Modal from './Modal';

import '../static/Post.css';

export const Post = ({ post, postDate, unameColorHash, fromCurrUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [deleted, setDeleted] = useState(false);
  const [expand, setExpand] = useState(false);
  const [modal, setModal] = useState(false);

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

  return (
    deleted ? ("") : (
      <>
        <div className="media-body p-4 border border-secondary rounded mt-4 ">
          {modal && <Modal content={{ heading: "Confirm delete?", body: "Are you sure you want to delete post titled: " + post.title }} closeAction={toggleModal} completeAction={onDeleteClick}></Modal>}
          <h4 className="mt-1">
            {post.title}
          </h4>
          <div className="container d-flex p-0 align-items-center justify-content-between">
            <div className='d-flex'>
              <p className='h8 my-0 mr-2'><b>by:</b></p>
              <button className={`user-tag mx-1 ${unameColorHash}`} onClick={onUserClick}>{post.author.username}</button>
            </div>
            <p className='my-0 mr-2 date'><b>{postDate}</b></p>
          </div>

          <div className='button-container mt-3'>
            <button
              className='function-tag'
              onClick={toggleExpand}
            >
              {expand ? (<><AiFillCaretUp className='mx-1' />Hide</>) : (<><AiFillCaretDown />Expand</>)}
            </button>
            {fromCurrUser && (
              <>
                <button
                  className='function-tag'
                  onClick={onEditClick}
                > <AiFillEdit /> Edit Post
                </button>
                <button
                  className='function-tag'
                  onClick={toggleModal}
                >
                  <AiFillDelete /> Delete
                </button>
              </>
            )}
          </div>
          {expand && <p className='post-body mt-3'>{post.body}</p>}

        </div>
      </>
    )
  )
}

export default Post;