import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/usersModel';


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody

        console.log(token)


        console.log("Received token:", token);
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        console.log("User found:", user);

        if (!user) {
            return NextResponse.json({ error: "Invalid Token : in verify emial" }, { status: 400 })
        }

        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({ message: "email Verified successfully", success: true }, { status: 200 })


    }
    catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}