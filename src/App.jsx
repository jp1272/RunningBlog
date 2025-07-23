import CreatePost from "./pages/CreatePost";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Posts from "./pages/Posts";
import Resources from "./pages/Resources";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>
            <Link to="/posts" className="link">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/resources" className="link">
              Resources
            </Link>
          </li>
          <li>
            <Link to="/createpost" className="link">
              Create Post
            </Link>
          </li>
        </ul>
      </nav>
      <div className="content-area">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/createpost" element={<CreatePost />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
