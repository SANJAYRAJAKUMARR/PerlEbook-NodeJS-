const nodemailer = require("nodemailer");
// Import NodeMailer (after npm install)

async function main() {
// Async function enables allows handling of promises with await

  // First, define send settings by creating a new transporter: 
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "sanjayrajakumarr@gmail.com", // Your email address
      pass: "qrkw eiid ppue strv", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });
  
  // Define and send message inside transporter.sendEmail() and await info about send from promise:
  let info = await transporter.sendMail({
    from: '"sanjayrajakumarr" <sanjayrajakumarr@gmail.com>',
    to: "sanjayrajakumarr@gmail.com",
    subject: "Book Order-Reg",
    html: `
    <h1>Perl Ebook</h1>
    <p>Your Order has been placed Successfully!</p>
    <img src="cid:sanjayrajakumarr@gmail.com>"/ width="400">
    `,
    attachments: [{
        filename: 'reltivity.jpg',
        path: './public/book_images/relativity.jpg',
        cid: 'sanjayrajakumarr@gmail.com' // Sets content ID
      }]
  });

  console.log(info.messageId); // Random ID generated after successful send (optional)
}

main()
.catch(err => console.log(err));