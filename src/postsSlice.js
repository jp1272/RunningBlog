import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  const posts = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost, thunkAPI) => {
    const { id, ...rest } = updatedPost;

    const postRef = doc(db, "posts", id);
    await updateDoc(postRef, rest);

    return updatePost;
  }
);

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      const newPosted = {
        id: action.payload.id,
        name: action.payload.name,
        body: action.payload.body,
        date: action.payload.date,
        title: action.payload.title,
      };
      state.posts.push(newPosted);
    },
    deletePosts: (state, action) => {
      state.posts = state.posts.filter((post) => {
        post.id !== action.payload;
      });
    },
    updatePosts: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );

      if (index !== -1) state.posts[index] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      });
  },
});

export const { setPosts, addPosts, deletePosts, updatePosts } =
  postsSlice.actions;
export default postsSlice.reducer;
