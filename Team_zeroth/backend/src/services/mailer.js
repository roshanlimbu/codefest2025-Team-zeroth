import express from "express";
import nodemailer from "nodemailer";
import 'dotenv/config';

const app = express();
const PORT = process.env.MAILER_PORT;

app.use(express.json());

const otpStorage = new Map(); 

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(toEmail) {
  const otp = generateOTP();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "topazkayle@gmail.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Email message
  const mailOptions = {
    from: '"OTP verification" <topazkayle@gmail.com>',
    to: toEmail,
    subject: "Your Verification Code",
    html: `
      <p>Your OTP code is:</p>
      <h2>${otp}</h2>
      <p>This code expires in 5 minutes.</p>
    `,
  };

  await transporter.sendMail(mailOptions);

  return otp; 
}

// this is test api
app.get("/", (req, res) => {
  res.status(200).json({message: "OTP Mailer Service is running."});
});



// API endpoint to send OTP
app.post("/sendOTP", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: "Email is required" 
      });
    }

    const otp = await sendOTPEmail(email);

    otpStorage.set(email, {
      otp: otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
    });

    console.log(`OTP sent to ${email}: ${otp}`); // Log for development

    res.status(200).json({ 
      success: true, 
      message: "OTP sent successfully to " + email
    });

  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to send OTP",
      error: error.message 
    });
  }
});

app.post("/verifyOTP", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: "Email and OTP are required" 
      });
    }

    const storedData = otpStorage.get(email);
    
    if (!storedData) {
      return res.status(400).json({ 
        success: false, 
        message: "No OTP found for this email. Please request a new one." 
      });
    }

    if (Date.now() > storedData.expiresAt) {
      otpStorage.delete(email);
      return res.status(400).json({ 
        success: false, 
        message: "OTP has expired. Please request a new one." 
      });
    }

    if (storedData.otp === otp) {
      otpStorage.delete(email); 
      return res.status(200).json({ 
        success: true, 
        message: "OTP verified successfully. You can now proceed with registration." 
      });
    } else {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid OTP. Please try again." 
      });
    }

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ 
      success: false, 
      message: "Failed to verify OTP",
      error: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Send POST request to http://localhost:${PORT}/sendOTP with payload: { "email": "example@gmail.com" }`);
});
