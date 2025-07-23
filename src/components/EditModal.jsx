import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatePost } from "../postsSlice";
import { useNavigate } from "react-router-dom";

export default function EditModal({ onClose, post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState(post.name);
  const [body, setBody] = useState(post.body);
  const [date, setDate] = useState(post.date);
  const [title, setTitle] = useState(post.title);

  function handleUpdate(e) {
    e.preventDefault();

    dispatch(
      updatePost({
        id: post.id,
        name,
        body,
        title,
        date,
      })
    );

    onClose();
    navigate("/posts");
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Post</h2>
        <form onSubmit={handleUpdate}>
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <label htmlFor="name">Name:</label>
          <br />
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="title">Title:</label>
          <br />
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="body">Body:</label>
          <br />
          <textarea
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <br />
          <br />

          <label htmlFor="date">Date:</label>
          <br />
          <input
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <br />
          <br />

          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
}
