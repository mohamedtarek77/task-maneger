import React from 'react'

import axios from "axios";


const Form = ({post , posts,error,isEdit, setLoading ,setPost ,setError ,postId ,setPosts}) => {



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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });

    setError({ ...error, [name]: '' });
  };


  const handleEditPost = async () => {
    if (!post.title && !post.description) return;
    try {
      const response = await axios
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


  return (
    <div


    className="flex flex-col  w-70 "
  >
    <input

      className="p-1 m-2 bg-gray-200 border border-gray-300 border-2 rounded-md  h-10 "

      placeholder="Title"
      name="title"
      value={post.title}
      onChange={handleInputChange}

    />
    {error.title && <p className="text-red-500">{error.title}</p>}

    <textarea
      placeholder="Description"
      name="description"
      value={post.description}
      className="p-1 m-2 mb-5 bg-gray-200 border border-gray-300 border-2 rounded-md  h-16 "

      onChange={handleInputChange}

    />
    {error.description && <p className="text-red-500">{error.description}</p>}


    <button
      className="p-1 m-2 bg-gray-900 text-white border border-gray-300 border-2 rounded-md  h-10 flex flex-col items-center text-center "
      onClick={isEdit ? handleEditPost : handleAddPost}
    >
      {isEdit ? "Edit the task" : "Add New Task"}
    </button>



  </div>
  )
}

export default Form