import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/usersModel';

import bcryptjs from 'bcryptjs'


import { sendEmail } from '@/helpers/mailer';



connect()

export async function POST(request: NextRequest){
    try{
        const reqBody =  await request.json()
        const {username, email, password} = reqBody

        // validation on emails and password
        console.log(reqBody);

         const user = await User.findOne({email})

         if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
         }

         const salt = await bcryptjs.genSalt(10);

         const hashedPassword = await bcryptjs.hash(password,salt);

        const newUser =  new User({
            username,
            email, 
            password: hashedPassword
         })

         const savedUser = await newUser.save();

         console.log(savedUser);


         //send verification email

        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id})
        console.log("thi is test: " + savedUser._id)

        return NextResponse.json({
            message: "User registerd successfully",
            success : true,
            savedUser
        })

    }
    catch(error: any){
        return NextResponse.json({error: error.message + "in route "},{status: 500})
    }
}