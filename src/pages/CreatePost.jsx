import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPosts } from "../postsSlice";
import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [newName, setNewName] = useState("");
  const [newBody, setNewBody] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleNewPost(e) {
    e.preventDefault();

    try {
      const postCollection = collection(db, "posts");
      const newDocRef = doc(postCollection);
      const newPost = {
        id: newDocRef.id,
        name: newName,
        body: newBody,
        date: newDate,
        title: newTitle,
      };

      const docRef = await setDoc(newDocRef, newPost);
      dispatch(addPosts(newPost));
      console.log("Post written with ID: ", newDocRef.id);
      navigate("/posts");
    } catch (error) {
      console.error("Error adding post: ", err);
    }
  }

  return (
    <>
      <h1>Create Post</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
          required
        />
        <br />
        <br />

        <label htmlFor="title">Title:</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setNewTitle(e.target.value)}
          value={newTitle}
          required
        />
        <br />
        <br />

        <label htmlFor="body">Body:</label>
        <br />
        <textarea
          id="body"
          name="body"
          rows="4"
          cols="50"
          onChange={(e) => setNewBody(e.target.value)}
          value={newBody}
          required
        ></textarea>
        <br />
        <br />

        <label htmlFor="date">Date:</label>
        <br />
        <input
          type="text"
          id="date"
          name="date"
          onChange={(e) => setNewDate(e.target.value)}
          value={newDate}
          required
        />
        <br />
        <br />

        <button onClick={handleNewPost}>Add Post</button>
      </form>
    </>
  );
}
