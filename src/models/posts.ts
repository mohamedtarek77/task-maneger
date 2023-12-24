import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: [true, "please provide a title"],
  },
  description: {
    type: String,
    require: [true, "please provide a description"],
  },
});


const Post  = mongoose.models.posts || mongoose.model("posts",postSchema);

export default Post;