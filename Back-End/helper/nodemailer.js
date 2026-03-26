const nodeMailer=require('nodemailer')
const dotenv=require('dotenv')
dotenv.config()


const transporter=nodeMailer.createTransport({
  service:'gmail',
  auth:{
    user:'rak04657@gmail.com',
    pass:process.env.GMAIL_PASS_KEY
  }
})

const sendPasswordResetEmail=async(email,verificationToken)=>{
  try{
    await transporter.sendMail({
      from:'rak04657@gmail.com',
      to:email,
      html:`<h1> your Token to reset password is </h1> <p>${verificationToken}</p>`,
      subject:'Password Verification Token'
    })
    console.log('mail sent to',email)
  }catch(e){
    console.log(e)
    throw new Error(e.message)
  }

}

module.exports={sendPasswordResetEmail}