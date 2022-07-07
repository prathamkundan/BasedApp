import axios from "axios";

const API_ROOT = '/api/posts/'

const getPosts = async ()=>{
    const response = await axios.get(API_ROOT);
    return response.data;
}

const getPostsByUser = async(username)=>{
    const response = await axios.get(API_ROOT+'user/'+username);
    return response.data;
}

const getLiked = async (token)=>{
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.get(API_ROOT+'liked', config);
    return response.data;
}

const createPost = async(postData, token) => {
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.post(API_ROOT, postData ,config);
    return response.data;
}

const updatePost = async (id, postData, token) => {
    const config = {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
    const response = await axios.put(API_ROOT+id, postData , config);
    return response.data;
}

const deletePost = async (id, token) => {
    const config = {
        headers:{
            Authorization : `Bearer ${token}`
        }
    }
    console.log(config)
    const response = await axios.delete(API_ROOT+id, config);
    return response.data;
}

const postHelper = { createPost, getPosts, getPostsByUser, getLiked, deletePost, updatePost };

export default postHelper;
