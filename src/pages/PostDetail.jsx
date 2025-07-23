import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  query,
  where,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import EditModal from "../components/EditModal";
import { useState, useEffect } from "react";

export default function PostDetail() {
  const [showModal, setShowModal] = useState(false);
  const [postData, setPostData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadPost = async () => {
      const postRef = doc(db, "posts", id);
      const snapshot = await getDoc(postRef);

      if (snapshot.exists()) {
        setPostData({ id: snapshot.id, ...snapshot.data() });
      } else {
        setPostData(null);
      }
    };

    loadPost();
  }, [id]);

  const navigate = useNavigate();

  if (!postData) return <p>...Loading</p>;

  function handleClose() {
    setShowModal(false);
  }

  async function handleDelete() {
    const q = query(collection(db, "posts"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    let docSelected;

    querySnapshot.forEach((post) => {
      console.log("Matched doc:", post.id, post.data());
      docSelected = doc(db, "posts", post.id);
    });

    try {
      console.log(docSelected);
      await deleteDoc(docSelected);
      console.log("Document deleted successfully");
      navigate("/posts");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  return (
    <div>
      <h1>
        {postData.name}
        <span className="material-symbols-rounded icon" onClick={handleDelete}>
          delete
        </span>
        <span
          className="material-symbols-rounded icon"
          onClick={() => {
            setShowModal(true);
          }}
        >
          edit
        </span>
      </h1>
      <p>{postData.date}</p>
      <p>{postData.body}</p>
      {showModal && <EditModal post={postData} onClose={handleClose} />}
    </div>
  );
}
