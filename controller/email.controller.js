import nodemailer from 'nodemailer';

function SendEmail(email, password)
{

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dwivediharsh4274@gmail.com',
          pass: 'zvegkrtoiazzeinj'
        }
      });
      
      var mailOptions = {
        from: 'dwivediharsh4274@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        html: "<h1>Welcome to eAuction</h1><p>you have successfully register on our site , yout login credentials are attached below</p><h3>Username = "+email+"</h3><h3>Password = "+password+"</h3><h2><a href= 'http://localhost:3000/verify/"+email+"'>Click on the link below verify your account</h2>"

      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });






}

export default SendEmail;