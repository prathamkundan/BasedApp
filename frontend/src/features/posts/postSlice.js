import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postHelper from './postsHelper';

const initialState = {
    posts: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const getPosts = createAsyncThunk(
    'posts/get',
    async (_, thunkAPI) => {
        try {
            return await postHelper.getPosts();
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getPostsByUser = createAsyncThunk(
    'posts/getByUser',
    async (username, thunkAPI) => {
        try {
            return await postHelper.getPostsByUser(username);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const getLikedPosts = createAsyncThunk(
    'posts/liked',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postHelper.getLiked(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const createPost = createAsyncThunk(
    'posts/create',
    async (postData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postHelper.createPost(postData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const updatePost = createAsyncThunk(
    'posts/update',
    async (postData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postHelper.updatePost(postData.id, postData.post, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const deletePost = createAsyncThunk(
    'posts/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await postHelper.deletePost(id, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
)

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = action.payload;
            })

            .addCase(getPostsByUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPostsByUser.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getPostsByUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = action.payload;
            })

            .addCase(getLikedPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLikedPosts.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(getLikedPosts.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = action.payload;
            })

            .addCase(createPost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = action.payload;
            })

            .addCase(updatePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = action.payload;
            })

            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isLoading = false;
                state.posts = state.posts.filter((post) => post._id !== action.payload.id);
            })
    }
})

export const { reset } = postSlice.actions;
export default postSlice.reducer;