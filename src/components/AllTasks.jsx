import React from 'react'

import Post from "./Post"

async function getData (){
    // const res = await fetch ("process.env.NEXT_PUBLIC_MONGODB_URI!")
    const res = await fetch ("http://localhost:3000/api/posts/getposts",{cashe:"no-store"});
    if(!res.ok) return notFound();
    return res.json();

}

const AllTasks = async () => {

    const data = await getData()
  return (
    <div className="flex flex-wrap">
    {
    data?.data?.map((post) => (
      <Post
        key={post._id}
        post={post}
        // posts={posts}
        // setIsEdit={setIsEdit}
        // setPost={setPost}
        // setPosts={setPosts}
        // setPostId={setPostId}
      />
    ))}
  </div>
  )
}

export default AllTasks