import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import Posts from "./components/Posts";
import  Pagination from "./components/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerpage] = useState(12);


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(res.data);
      setLoading(false)
    }
    fetchPosts();
  }, []);
//Get current Post
  const indexLastPost = currentPage * postsPerPage;
  const indexOfFirsPost = indexLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirsPost, indexLastPost);

  //ChangePage

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog !</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
