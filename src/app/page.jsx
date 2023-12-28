
"use client";

import React, { useState, useEffect,  } from "react";

import axios from "axios";


import Post from "@/components/Post";
import Form from "@/components/Form";



// async function getData() {
//   try {

//     // const res = await fetch("http://localhost:3000/api/posts/getposts" ,  {next: { revalidate: 10 },});

//     const res = await fetch("http://localhost:3000/api/posts/getposts" ,  { cache: 'no-store' });


//     // const res = await fetch("https://deluxe-croquembouche-fbf0df.netlify.app/api/posts/getposts" , 
    
//     // // {next: { revalidate: 10 },}
//     // { cache: 'no-store' }
    
//     // );


   

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     return res.json();
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// }





export default   function Home() {


  // const data = await getData()
  // console.log(data)


  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    title: '',
    description: '',
  });

  const [posts, setPosts] = useState([]);
  // const [posts, setPosts] = useState(data?.data);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);







  useEffect(() => {
    axios
      .get("/api/posts/getposts")
      .then((response) => {
        console.log(response?.data);

        setPosts(response?.data?.data);

        console.log(posts);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [post]);

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800 w-full border border-gray-300 border-2  ">
      <Form
        isEdit={isEdit}
        post={post}
        error={error}
        posts={posts} 
        setLoading={setLoading} 
        setPost={setPost} 
        setError={setError} 
        postId={postId} 
        setPosts={setPosts}
      />

      <h1 className="text-xl text-extrabold text-white m-5">Tasks</h1>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (


        <>
          <div className="flex flex-wrap">
          {
          

          
          posts?.map((post) => (
            <Post
              key={post._id}
              post={post}
              posts={posts}
              setIsEdit={setIsEdit}
              setPost={setPost}
              setPosts={setPosts}
              setPostId={setPostId}
            />
          ))}
        </div>

        </>
      

        
      )}
    </main>

  );
}
