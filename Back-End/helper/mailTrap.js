import  {MailtrapClient} from 'mailtrap'
import {sendVerificationEmailTempelate} from './emailTempelates.js'




export const sendVerificationCodeEmail=async(userEmail,verificationCode)=>{

  const TOKEN = "e60170b1e2eff910c511d652b69a1f91";
  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Mailtrap Test",
  };
  const recipients = [
    {
      email: userEmail,
    }
  ];

  try{
  client
    .send({
      from: sender,
      to: recipients,
      subject: "Verification code",
      html:sendVerificationEmailTempelate.replace("{verificationCode}",verificationCode),
      category: "Integration Test",
    })
  }catch(e){
    console.log(e.message)
  }
}