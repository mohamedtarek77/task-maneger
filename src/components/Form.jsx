import React from 'react'

const Form = ({post,error,isEdit,handleInputChange,handleEditPost,handleAddPost}) => {
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
      {isEdit ? "Edit Post" : "Add New Post"}
    </button>



  </div>
  )
}

export default Form