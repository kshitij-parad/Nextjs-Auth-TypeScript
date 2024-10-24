import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/usersModel';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()

export async function POST(request: NextRequest) {
    try {
            const reqBody = await request.json();
            const {email, password } = reqBody

            console.log(reqBody)

           const user =  await User.findOne({email})
           
           if(!user){
            return NextResponse.json({ error: "User does not exits" }, { status: 400 })
           }

           console.log("user exits")

        const validPassword = await   bcryptjs.compare(password , user.password) 

        if(!validPassword){  return NextResponse.json({ error: "check your credintials" }, { status: 400 })}


        //creating jwt token

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token =  jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

        // const token =  jwt.sign(tokenPayload, process.env.TOKEN_SECRET || "kp", {expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Logged In success",
            success : true
        })

        response.cookies.set("token", token,{
            httpOnly:true
        })
        
        return response
    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}