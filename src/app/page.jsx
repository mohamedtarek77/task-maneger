
"use client";

import React, { useState, useEffect } from "react";

import axios from "axios";

import Post from "@/components/Post";
import Form from "@/components/Form";



export default function Home() {

  const [post, setPost] = useState({
    title: "",
    description: "",
  });

  const [error, setError] = useState({
    title: '',
    description: '',
  });

  const [posts, setPosts] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postId, setPostId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await axios.get("/api/posts/getposts");
  //       setPosts(response.data.data);
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, [post]);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

    setError({ ...error, [name]: '' });
  };

  const validateInputs = () => {
    let isValid = true;
    const newError = { ...error };

    if (post.title.trim() === '') {
      newError.title = 'Title is required';
      isValid = false;
    }

    if (post.description.trim() === '') {
      newError.description = 'Description is required';
      isValid = false;
    }

    setError(newError);
    return isValid;
  };


  const handleAddPost = async () => {
    // e.preventDefault();

    // if (!post.title && !post.description) return;

    if (validateInputs()) {


      try {
        setLoading(true);
        console.log("done");
        const response = await axios.post("/api/posts/addpost", post);

        console.log("post added", response?.data);
        setPost(response?.data);
        setPost({ title: "", description: "" });

      } catch (error) {
        console.log("post error", error);
      } finally {
        setLoading(false);
      }
    }
  };



  const EditPost = (id, title, description) => {
    setPostId(id);
    setIsEdit(true);
    setPost({ title, description });
  };

  // const handleEditPost =    () => {
  //   if (!post.title && !post.description) return;
  //   axios
  //     .put("/api/posts/editpost", {
  //       id: postId,
  //       title: post?.title,
  //       description: post?.description,
  //     })
  //     .then((response) => {
  //       const updatedPosts = posts.map((p) => (p._id === postId ? response.data.data : p));
  //       setPosts(updatedPosts);
  //       setIsEdit(false);
  //       setPost({ title: "", description: "" });
  //     })
  //     .catch((error) => {
  //       console.error("Error editing post:", error);
  //     });
  // };

  const handleEditPost = async () => {
    if (!post.title && !post.description) return;
    try {
      const response= await axios
        .put("/api/posts/editpost", {
          id: postId,
          title: post?.title,
          description: post?.description,
        })
          const updatedPosts = posts.map((p) => (p._id === postId ? response.data.data : p));
          setPosts(updatedPosts);
          setIsEdit(false);
          setPost({ title: "", description: "" });
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  const handleRemovePost = async (postId) => {
    try {
      await axios.delete('/api/posts/deletepost', {
        data: { id: postId },
      });
      const updatedPosts = posts.filter((p) => p._id !== postId);
      setPosts(updatedPosts);

    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-800 w-full border border-gray-300 border-2  ">
      <Form
        isEdit={isEdit}
        post={post}
        error={error}
        handleInputChange={handleInputChange}
        handleEditPost={handleEditPost}
        handleAddPost={handleAddPost}
      />

      <h1 className="text-xl text-extrabold text-white m-5">Tasks</h1>

      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              EditPost={EditPost}
              removePost={handleRemovePost}
            />
          ))}
        </div>
      )}
    </main>

  );
}
