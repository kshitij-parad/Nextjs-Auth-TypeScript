import nodemailer from 'nodemailer'
import brcyptjs from 'bcryptjs'
import User from '@/models/usersModel';

export const sendEmail = async ({ email, emailType, userId }: any) => {

    try {

        //TODO: configure mail for usage
        console.log(userId)
        const hashedToken = await brcyptjs.hash(userId+"", 10);

        if (emailType === "VERIFY") {

           const updatedUser = await User.findByIdAndUpdate(userId, { 
            $set:{
                verifyToken: hashedToken, 
                verifyTokenExpiry: new Date(Date.now() + 3600000)} 
            })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { 
                $set:{
                    forgotPasswordToken: hashedToken, 
                    forgotPasswordTokenExpiry: new Date(Date.now() + 3600000)} 
                })
        }



        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "258050afd16503", //😱
                pass: "5abb494a9ca65b" //😱
            }
        });


        const mailOptions = {
            from: 'dev.kshitij@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password", // Subject line
            html: ` <p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser.
            <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
        }

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse;
    }
    catch (error: any) {
        throw new Error(error.message + "in mailer")
    }
}