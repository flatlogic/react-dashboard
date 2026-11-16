import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { createPostRecord, listPosts, type PostRecord } from './postsService';

type CreatePostInput = {
  title: string;
  content: string;
};

type PostsState = {
  items: PostRecord[];
  fetchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  createStatus: 'idle' | 'loading' | 'failed';
  message: string | null;
  error: string | null;
};

const initialState: PostsState = {
  items: [],
  fetchStatus: 'idle',
  createStatus: 'idle',
  message: null,
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => listPosts());

export const createPost = createAsyncThunk<
  PostRecord,
  CreatePostInput,
  { rejectValue: string }
>('posts/createPost', async (payload, { rejectWithValue }) => {
  try {
    return await createPostRecord(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create post';
    return rejectWithValue(message);
  }
});

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    clearPostMessage(state) {
      state.message = null;
      state.error = null;
      state.createStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.fetchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.fetchStatus = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.fetchStatus = 'failed';
        state.error = action.error.message || 'Unable to load posts';
      })
      .addCase(createPost.pending, (state) => {
        state.createStatus = 'loading';
        state.message = null;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createStatus = 'idle';
        state.items = [action.payload, ...state.items];
        state.message = 'Post created successfully';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.error = action.payload ?? 'Unable to create post';
      });
  },
});

export const { clearPostMessage } = postsSlice.actions;

export default postsSlice.reducer;
