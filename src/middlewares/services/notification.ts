import nodemailer from 'nodemailer';

export const sendNotification = async (email: string, productUrl: string, price: number) => {

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEV] Skipping sending a real email to ${email}`)
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Price Drop Alert!',
    text: `The price for the product at ${productUrl} has dropped to $${price}.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
  
};
