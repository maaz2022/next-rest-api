import connect from "@/lib/db";
import User from "@/lib/models/user";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

const ObjectId = require("mongoose").Types.ObjectId;

export const GET = async () => {
    try{
        await connect();
        const users = await User.find();
        return new NextResponse(JSON.stringify(users), {status: 200});
    } catch (err: any) {
        return new NextResponse("Error in fetching users" + err.message, {status:500});
    }
}

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        await connect();
        const newUser = new User(body);
         await newUser.save();
        return new NextResponse(
            JSON.stringify({message: 'User is created' ,user: newUser}), 
            {status: 201}
        );
    }catch(err: any) {
        return new NextResponse("Error in creating user" + err.message, 
            {status: 500}
        );
    }

}

export const PATCH = async (request: Request) => {
    try {
      const body = await request.json();
      const { userId, newUsername } = body;
  
      await connect();
      if (!userId || !newUsername) {
        return new NextResponse(
          JSON.stringify({ message: "ID or new username not found" }),
          { status: 400 }
        );
      }
  
      if (!Types.ObjectId.isValid(userId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
          status: 400,
        });
      }
  
      const updatedUser = await User.findOneAndUpdate(
        { _id: new ObjectId(userId) },
        { username: newUsername },
        { new: true }
      );
  
      if (!updatedUser) {
        return new NextResponse(
          JSON.stringify({ message: "User not found in the database" }),
          { status: 400 }
        );
      }
  
      return new NextResponse(
        JSON.stringify({ message: "User is updated", user: updatedUser }),
        { status: 200 }
      );
    } catch (error: any) {
      return new NextResponse("Error in updating user" + error.message, {
        status: 500,
      });
    }
  };

  export const DELETE = async (Request: Request) => {
   try {
    const {searchParams} =   new URL(Request.url);
    const userId = searchParams.get('userId');

    if(!userId) {
        return new NextResponse(
            JSON.stringify({message: "User ID not found"}), 
        {status: 400}
    );
    }
    if (!Types.ObjectId.isValid(userId)) {
        return new NextResponse(JSON.stringify({ message: "Invalid User id" }), {
          status: 400,
        });
      }
      await connect();
      const deletedUser = await User.findByIdAndDelete(
        new Types.ObjectId(userId)
      );
      if(!deletedUser) {
        return new NextResponse(
            JSON.stringify({message: "User not found in the database"}), 
        {status: 400}
        );
      }
      return new NextResponse(
        JSON.stringify({message: "User is deleted", user: deletedUser}),
        {status: 200}
      );

   }catch (error: any) {
    return new NextResponse("error in deleting user" + error.message,{
        status: 500,
    });
   }
}