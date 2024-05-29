import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";



import {
  BrowserRouter,
  Routes,
  Route,
  useParams,
  NavLink,} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));



//Home Component to display home page with list of posts.
const Home = () => {
  const [posts, setPosts] = useState([]);   //This will store and update our posts.

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((data) => data.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    // Displaying titles on screen.
    <div>
      <div className="post-container">
        {posts.map((post) => (
          <NavLink
            className="post-titles"
            style={{ display: "block" }}
            to={`/post/${post.id}`}
          >
            {post.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

//About Component to display about page.
const About = () => {
  return (
    <div>
      <h1>This is About page</h1>
    </div>
  );
};


//Profile Component to display Profile page.
const Profile = () => {
  return (
    <div>
      <h1>This is Profile Page</h1>
    </div>
  );
};

//Settings Component to display settings page.
const Settings = () => {
  return (
    <div>
      <h1>This is Settings Page</h1>
    </div>
  );
};


// Component to display username 
const SayUser = () => {
  const params = useParams();

  console.log("params", params);
  return (
    <div>
      <h1>Your Name is :  {params.userName}</h1>
    </div>
  );
};


//Component to display content of a specific post.
const PostPage = () => {
  const params = useParams();
  const [data, setData] = useState(null);
  console.log("Params", params);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
      .then((data) => data.json())
      .then((data) => setData(data));
  }, []);

  console.log("Data", data);

  if (data === null) return <p>Loading...</p>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:postId" element={<PostPage />} />
        <Route path="/user/:userName" element={<SayUser />} />

        {/* Nesting of paths */}
        <Route path="account">
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


