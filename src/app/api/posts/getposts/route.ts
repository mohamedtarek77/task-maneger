import { connect } from "@/dpConfig/dpConfig"; 

import Post from "@/models/posts";

import { NextRequest ,NextResponse } from "next/server";

async function connectToDatabase() {
    await connect(); // Your database connection logic
  }

 export async function GET (request: NextRequest){

    try {


        await connectToDatabase(); // Ensure database connection before fetching data

        if (request.method !== "GET") {
          return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
        }

        
        const posts = await Post.find(); // Fetches all posts

        return NextResponse.json({
            success:true,
            data:posts,
        });

    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }