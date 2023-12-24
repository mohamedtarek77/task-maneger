import {connect} from "@/dpConfig/dpConfig"

import Post from "@/models/posts"

import { NextRequest , NextResponse } from "next/server"

connect();


export async function PUT (request:NextRequest){
    try {
        const {id ,title,description } = await request.json();

        const updataPost = await Post.findByIdAndUpdate(id,{title , description },{new:true});

        if(!updataPost){
            return NextResponse.json({error:"Post not found"},{status:404});
        }

        return NextResponse.json({
            success: true,
            data: updataPost,
        });
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}