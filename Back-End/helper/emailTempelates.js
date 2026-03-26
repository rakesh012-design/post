export const sendVerificationEmailTempelate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Verification Code</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:40px 0;">
    <tr>
      <td align="center">
        
        <table width="500" cellpadding="0" cellspacing="0" border="0" 
          style="background:#ffffff; border-radius:10px; padding:40px; box-shadow:0 4px 10px rgba(0,0,0,0.1);">
          
          <tr>
            <td align="center">
              <h1 style="margin:0; color:#0046c7;">Welcome to Random App 🎉</h1>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 0;">
              <p style="font-size:16px; color:#555; margin:0;">
                Thank you for signing up. Use the verification code below to complete your registration.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 0;">
              <div style="
                display:inline-block;
                padding:15px 30px;
                font-size:28px;
                font-weight:bold;
                letter-spacing:5px;
                color:#ffffff;
                background-color:#0046c7;
                border-radius:8px;">
                {verificationCode}
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding-top:20px;">
              <p style="font-size:14px; color:#888; margin:0;">
                This code will expire in 10 minutes.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
