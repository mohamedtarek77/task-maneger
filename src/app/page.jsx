
"use client";

import React, { useState, useEffect, use } from "react";

import axios from "axios";
import useSWR from 'swr';


import Post from "@/components/Post";
import Form from "@/components/Form";
import AllTasks from "@/components/AllTasks"

const fetcher = (...args) => fetch(...args).then((res) => res.json())

async function getTasks() {
  const res = await fetch("/api/posts/getposts")
  return res.json()
}


export default function Home() {

  // const { data, error1 } = useSWR('/api/posts/getposts', fetcher)

  // const tasks = await getTasks()

  // useEffect(()=>{
  //   console.log(tasks)
  // })

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    title: '',
    description: '',
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);




  // useEffect(() => {
  //   console.log('1')
  //   console.log(data)
  //   console.log(data?.data)


  //   console.log('2')

  //   try {
  //     setPosts(data?.data);
  //   } catch (error) {
  //     console.log(error)
  //   }

  // }, [post])


  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // setLoading(true);
  //       const response = await axios.get("api/posts/getposts");
  //       setPosts(response?.data?.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       // setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [post]);


  // useEffect(() => {
  //   fetch('/api/posts/getposts')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data?.data);
  //       setLoading(false)
  //     })
  // }, [post])



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

        {/* <div className="flex flex-wrap">
<AllTasks/>
        </div> */}
        </>
      

        
      )}
    </main>

  );
}
