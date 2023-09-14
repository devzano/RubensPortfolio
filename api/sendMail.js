const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  
  const { name, email } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Beta Signup',
    text: `Name: ${name}, Email: ${email}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
};
