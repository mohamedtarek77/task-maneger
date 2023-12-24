// import {connect} from "@/dpConfig/dpConfig"

// import Post from "@/models/posts"

// import { NextRequest , NextResponse } from "next/server"

//  connect();

// export async function DELETE (request:NextRequest){

//     try {
//         const {id } = await request.json();

//         const deletedPost  = await Post.findByIdAndDelete(id);

//         if(!deletedPost){
//             return NextResponse.json({error:"Post not found"},{status:404});
//         }

//         return NextResponse.json({
//             success: true,
//             data: deletedPost,
//         });
//     } catch (error:any) {
//         return NextResponse.json({error:error.message},{status:500});
//     }
// }



import { connect } from "@/dpConfig/dpConfig";
import Post from "@/models/posts";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json?.();

    if (!id) {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: deletedPost,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
