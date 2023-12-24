"use client"

import React ,{useState} from 'react'

import axios from "axios";


import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';



const Post = ({ post,posts , setPostId ,setIsEdit,setPost,setPosts }) => {



    const EditPost = (id, title, description) => {
        setPostId(id);
        setIsEdit(true);
        setPost({ title, description });
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
        <div key={post._id} className=" flex flex-col w-60  min-w-52  max-w-64 bg-gray-600  border border-black rounded-md m-2 p-2">

            <div className="flex flex-col">
                <h3 className="text-md text-gray-300 ">{post.title}</h3>


                <p className="text-md text-gray-300 break-words ">{post.description}</p>

            </div>


            <div className="flex flex-wrap flex-1 items-end justify-center  w-auto">

                <button
                    className="  px-2 py-2 mx-2 mt-5  border border-black rounded-md w-16 "

                    onClick={() => EditPost(post._id, post.title, post.description)}


                >
                    {/* Edit */}
                    <PencilIcon className='h-5 w-5' />

                </button>

                <button
                    className="  px-2 py-2 mx-2  mt-5 border border-black rounded-md w-16"

                    onClick={() => handleRemovePost(post._id)}
                >
                    {/* Delete */}

                    <TrashIcon className='h-5 w-5' />


                </button>
            </div>

        </div>
    )
}

export default Post