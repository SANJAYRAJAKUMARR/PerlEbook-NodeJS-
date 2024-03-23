const nodemailer = require("nodemailer");
const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'boozsqtcnrpqnu9idwf0-mysql.services.clever-cloud.com',
    user: 'urkeaoxlzhsrc6ro',
    password: 'Ps90SB2PkXDuKNU3tF5b',
    database: 'boozsqtcnrpqnu9idwf0',
    port:3306,
    connectTimeout:10000,
});
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Sanjay@12',
//     database: 'sanju',
//     connectTimeout: 10000,
//   });
// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    
    console.log('Connected to MySQL');
});

// Retrieve book details from the books table for the given username
const useremail = process.argv[2];
console.log(useremail);
const query = 'SELECT name, author, price FROM books WHERE useremail = ?';
connection.query(query, [useremail], (err, results) => {
    if (err) {
        console.error('Error querying MySQL:', err);
        return;
    }

    // Store the book details in req.session.email
    const bookDetails = results;
    console.log('Book details:', bookDetails);

    // Use the obtained email and book details to send the email
    //sendMail(useremail, bookDetails);
    insertIntoOrders(useremail, bookDetails);
    deleteFromBooks(useremail);
});

// Define the function to send the email
async function sendMail(email, bookDetails) {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "sanjayrajakumarr@gmail.com",
            pass: "lnyv umxo ygtg xapz",
        },
    });
    
    // Construct the email content
    const info = await transporter.sendMail({
        from: '"sanjayrajakumarr" <sanjayrajakumarr@gmail.com>',
        to: email,
        subject: "Book Order-Reg",
        html: `
            
            <img src="cid:sanjayrajakumarr@gmail.com" width="200" height="200">
            <h4>Perl Ebook</h4>
            <h3>Your Order has been placed Successfully!</h3>
            <p>Order Details:</p>
            <ul>
                ${bookDetails.map(book => `<li>BookName: ${book.name}, Author: ${book.author}, Price: $${book.price}</li>`).join('')}
            </ul>
        `,
        attachments: [{
            filename: 'check-mark.png',
            path: './public/book_images/check-mark.png',
            cid: 'sanjayrajakumarr@gmail.com'
        }]
    });
    
  

    console.log(info.messageId);
}
const status="ordered placed";
function insertIntoOrders(email, bookDetails) {
    const insertQuery = 'INSERT INTO orders (bookname, author, price, useremail,status) VALUES (?, ?, ?, ?,?)';
    
    bookDetails.forEach(book => {
        const values = [book.name, book.author, book.price, email,status];
        
        connection.query(insertQuery, values, (err, results) => {
            if (err) {
                console.error('Error inserting into orders table:', err);
                return;
            }
            
            console.log('Inserted into orders table:', results);
        });
    });
}

function deleteFromBooks(email) {
    const deleteQuery = 'DELETE FROM books WHERE useremail = ?';

    connection.query(deleteQuery, [email], (err, results) => {
        if (err) {
            console.error('Error deleting from books table:', err);
            return;
        }

        console.log('Deleted from books table:', results);
    });
}