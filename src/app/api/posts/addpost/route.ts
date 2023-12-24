import { connect } from "@/dpConfig/dpConfig"; // Import your MongoDB connection function

import Post from "@/models/posts";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    console.log("1");

    const reqBody = await request.json();
    const { title, description } = reqBody;

    console.log(reqBody);
    const post = await Post.findOne({ title });

    if (post) {
      return NextResponse.json(
        {
          error: "post already exists",
        },
        { status: 400 }
      );
    }

    const newPost = new Post({
      title,
      description,
    });
    const savedPost = await newPost.save();
    console.log(savedPost);

    return NextResponse.json({
      message: "post created successfully",
      success: true,
      savedPost,
    });
  } catch (error: any) {
    console.log("Error:", error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
