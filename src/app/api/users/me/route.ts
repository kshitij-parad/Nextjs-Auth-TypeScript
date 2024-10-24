import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/usersModel';
import { NextRequest, NextResponse } from 'next/server';



connect()

export async function POST(request: NextRequest){
    //extract data from token

    const userId =  await getDataFromToken(request);
    const user = await User.findOne({_id: userId}).select("-password")

    if(!user){
        return NextResponse.json({message:"User not found", status : 400})
    }

    return NextResponse.json({
        message: "User Found!",
        data : user
    })
}