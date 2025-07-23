import { useNavigate } from "react-router-dom";

export default function PostCard({ data }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/posts/${data.id}`);
  }

  return (
    <div className="card" onClick={handleClick}>
      <h4>{data.name}</h4>
      <p>{data.date}</p>
      <p>{data.title}</p>
    </div>
  );
}
