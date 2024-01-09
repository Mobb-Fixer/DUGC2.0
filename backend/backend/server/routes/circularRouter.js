const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const app = express();
const circularRoute = express.Router();


const email = 'ktestkle@gmail.com';
const password = 'uhebyppldnazdhsz';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password,
  },
});

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

circularRoute.use(express.json());

circularRoute.post('/send-email', upload.single('file'), async (req, res) => {
  const file = req.file;
  const subject=req.body.subject;
  const text=req.body.text;
  const mailOptions = {
    from: email,
    subject,
    text,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

 const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error(`Error sending email to ${options.to}:, error.message`);
  }
};

// Function to generate email addresses based on a pattern
const generateEmails = (prefix, start, end, suffix) => {
  const emails = [];
  for (let i = start; i <= end; i++) {
    const paddedIndex = i.toString().padStart(3, '0');
    const email = `${prefix}${paddedIndex}${suffix}`;
    emails.push(email);
  }
  return emails;
};

// Replace '01fe21bcs' and 'example.kletech.ac.in' with your desired pattern
const prefix = '01fe21bcs';
const suffix = '@kletech.ac.in';

// Specify the range of email indices you want to send
const startIdx = 313;
const endIdx = 316; // For testing, reduce the range to a smaller number

// Generate the list of target email addresses
const targetEmails = generateEmails(prefix, startIdx, endIdx, suffix);

// Function to introduce a delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Send emails to each target address with a delay
const sendEmailsSequentially = async () => {
  for (const to of targetEmails) {
    mailOptions.to = to;

    await sendEmail(mailOptions);
    await delay(200); 
  }
};

// Start sending emails
sendEmailsSequentially();
});

module.exports = circularRoute;