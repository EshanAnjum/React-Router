import React ,{useEffect , useState} from 'react'
import ReactDOM from 'react-dom/client'

// import './index.css'
import ReactDom from "react-dom/client";



import {BrowserRouter , Route , Routes, useParams, NavLink} from "react-router-dom";



const Home = ()=>{
  const [posts,SetPosts] = useState([]);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((data) => data.json())
      .then((data) => SetPosts(data))
      const myData = data=>data.json();
      // console.log(myData);
  }, []);

  return (
    <div>
      <div className="post-container">
        {
         posts.map((post) =>(
           <NavLink style={{display:'block'}} to={`/post/${post.id}`}>{post.title}</NavLink> 
        ))}
      </div>
    </div>
  );
};

const About = ()=>{
  return(
    <div>
      <h1>About</h1>
    </div>
  )
}

const Profile = ()=>{
  return(
    <div>
      <h1>Profile section</h1>
    </div>
  )
}

const Settings = ()=>{
  return(
    <div>
      <h1>Settings section</h1>
    </div>
  )
}


const SayUser = ()=>{
  const params = useParams();
  return(
    <div>
      <h1>Your name is {params.userName}</h1>
    </div>
  )
}

const PostPage = ()=>{
  const [data,setData] = useState(null)
  const params = useParams();
  console.log("params", params);

  useEffect(()=> {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`)
    .then((data)=>data.json())
    .then((data)=>setData(data))
  }, []);
  console.log("Data" ,data);

  if(data === null) return <p>Loading...</p>



  return(
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/account/profile' element={<Profile/>}/>
      <Route path='/user/:userName' element={<SayUser/>}/>
      <Route path='/post/:postId' element={<PostPage/>}/>

      <Route path='/account'>
        <Route path='profile' element={<Profile/>}/>
        <Route path='Settings' element={<Settings/>}/>

      </Route>

    </Routes>
   
    </BrowserRouter>
  </React.StrictMode>,
)
