const express = require('express');
const session = require('express-session');
const PDFDocument = require('pdfkit');
const path = require('path');
const upload=require('express-fileupload');
const fs = require('fs');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const ejs= require('ejs');
const { Sequelize, DataTypes } = require('sequelize');
const port = 3001;
app.use(upload());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, "/public")));
const pdfFolderPath = path.join('public', 'uploads');


app.get('/', (req, res) => {  
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true in production with HTTPS
}));


app.use('/pdfs', express.static(pdfFolderPath));
// Create a MySQL connection
const connection = mysql.createConnection({
    host: 'sql3.freesqldatabase.com',
    user: 'sql3678838',
    password: 'NyQCcWak27',
    database: 'sql3678838',
    connectTimeout: 10000,
});



// Connect to the MySQL database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    
    console.log('Connected to MySQL');
});

// Create a route to handle adding a book to the database
app.post('/addtocart', (req, res) => {
    // Retrieve book data from the request body
    const { name, author, price } = req.body;
    console.log('name:',name);
    console.log('author:',author);
    console.log('price:',price);
    const useremail=req.session.email;

    // Insert the book data into the database
    const sql = 'INSERT INTO books (name, author, price,useremail) VALUES (?, ?, ?,?)';
    connection.query(sql, [name, author, price,useremail], (err, results) => {
        if (err) {
            console.error('Error inserting data into MySQL:', err);
            res.status(500).send('Error adding book to cart');
        } else {
            console.log('Book added to cart:', results);
            // res.status(200).send('Book added to cart');
            // res.send('book added to cart');
            // res.render(__dirname + '/views/Addtocart');
            res.redirect('/cart');
           
        }
    });
});



//mailsend
app.post('/send-email', (req, res) => {
  const { exec } = require('child_process');

  // Pass the email address as a command-line argument
  const command = `node send-email.js ${req.session.email}`;

  exec(command, (error, stdout, stderr) => {
      if (error) {
          console.error(`Error executing send-email.js: ${error}`);
          return res.status(500).json({ error: 'Internal server error' });
      }
      console.log(`Email script output: ${stdout}`);
      // res.json({ message: 'Order Placed Successfully! Check mail for further details!' });
  });
});



//printing data in addtocart page
app.get('/cart', (req, res) => {
  // Use the getCartData function to retrieve data for the current user
  getCartData(req, (results) => {
    // Render the EJS page with the fetched data
    res.render('cart', { cart: results });
  });
});

// Modify the getCartData function to accept req as a parameter
function getCartData(req, callback) {
  const useremail = req.session.email;

  const query = 'SELECT * FROM books WHERE Useremail = ?';

  connection.query(query, [useremail], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      callback([]);
    } else {
      callback(results);
    }
  });
}


  
  app.get('/generate-pdf', (req, res) => {
    // Retrieve the user's cart data
    getCartData((cart) => {
        // Create a new PDF document
        const pdfDoc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="user_cart.pdf"');

        // Pipe the PDF document to the response
        pdfDoc.pipe(res);

        // Add content to the PDF based on the user's cart data
        pdfDoc.fontSize(18).text('Items You Bought', { align: 'center' });
        pdfDoc.moveDown();

        cart.forEach((book) => {
            // Load book image from file path
            const imagePath = path.join(__dirname, 'public/book_images', `${book.name.toLowerCase()}.jpg`);
            const imageBuffer = fs.readFileSync(imagePath);

            // Add image to the PDF
            pdfDoc.image(imageBuffer, { width: 200, height: 220 });

            // Add text to the PDF
            pdfDoc.fontSize(24).text(`Book Name: ${book.name}`);
            pdfDoc.fontSize(12).text(`Author: ${book.author}`);
            pdfDoc.fontSize(12).text(`Price: $${book.price}`);
            pdfDoc.moveDown();
        });

        // Finalize the PDF document
        pdfDoc.end();
    });
});


//remove from cart
app.post('/removefromcart', (req, res) => {
  // Retrieve book ID from the request body
  const bookname = req.body.bookname;

  // Delete the book from the database based on the ID
  const sql = 'DELETE FROM books WHERE name = ?';
  connection.query(sql, [bookname], (err, results) => {
    if (err) {
      console.error('Error deleting book from MySQL:', err);
      res.status(500).send('Error removing book from cart');
    } else {
      console.log('Book removed from cart:', results);
      res.redirect('/cart');
    }
  });
});

//storing files to upload folder
app.post('/publish',(req,res)=>{
  if(req.files){
    console.log(req.files)
    var file=req.files.file;
    var filename=file.name;
    const person_name=req.body.name;
    const status="submitted";
    console.log(filename)
    const uploadPath = path.join('public', 'uploads', filename);

    file.mv(uploadPath, function(err){
      if(err){
        res.send(err)
      }
      else{
        const insertQuery = 'INSERT INTO published (person_name, filename,status) VALUES (?, ?,?)';
        connection.query(insertQuery, [person_name, filename,status], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            } else {
                return res.send("File uploaded and data inserted successfully!");
            }
        });
      }
    })
  }
})

//redirect to login page
app.get('/login', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'Logins', 'login.html');
    res.sendFile(filePath);
});

//redirect to signup page
app.get('/signup', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'Logins', 'signup.html');
    res.sendFile(filePath);
});

//redirect to ebook page
app.get('/ebook', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'Ebooks', 'ebook_home.html');
    res.sendFile(filePath);
});

//redirect to chart page
app.get('/chart', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'Admin','chart', 'bar_chart.html');
    res.sendFile(filePath);
});

//redirect to data.csv file
//redirect to chart page
app.get('/data.csv', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'Admin','chart', 'data.csv');
    res.sendFile(filePath);
});

//signout to login
app.get('/signout', (req,res)=>{
  const filePath = path.join(__dirname, 'public', 'Logins', 'login.html');
    res.sendFile(filePath);
})

//published books
app.get('/pdfs-list', (req, res) => {
  // Assuming you have a database connection and a query function
  connection.query('SELECT * FROM published where status="submitted"', (err, results) => {
      if (err) {
          return res.status(500).send(err.message);
      }

      // Assuming the results are an array of objects with person_name and filename properties
      const pdfFiles = results;

      // Render the EJS page with the PDF files data
      res.render('pdfs-list', { pdfFiles });
  });
});

//redirect to profile page
app.get('/profile', (req, res) => {
  if (!req.session || !req.session.username) {
    console.error('Error: req.session or req.session.username is not defined');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const query = 'SELECT * FROM user_details WHERE UserName = ?';
  connection.query(query, [req.session.username], (err, results) => {
    if (err) {
      console.error('Error fetching user profile data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length === 0) {
      // User not found
      return res.status(404).json({ error: 'User not found' });
    }

    const userProfile = results[0];
    res.render('profile', { userProfile });
  });
});




//redirect to cart page
app.get('/cart', (req, res) => {
  res.render('cart'); // Assuming your EJS file is named "cart.ejs"
});

//redirect to popular page
app.get('/popular', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'popular_books', 'popular.html');
    res.sendFile(filePath);
});

//redirect to feelgood page
app.get('/feelgood', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'feel_good', 'sample.html');
    res.sendFile(filePath);
});

//redirect to admin_dashboard page
app.get('/admin',(req,res)=>{
  const query = 'SELECT * FROM published WHERE status != "submitted"';
  connection.query(query, (err, results) => {
      if (err) {
          console.error('Error fetching published records:', err);
          return res.status(500).send('Internal Server Error');
      }

      // Render the page with the fetched published records
      res.render('Admin_dashboard.ejs', { publishedRecords: results });
  });
})

//redirect to publish page
app.get('/publish', (req,res) =>{
  const filePath = path.join(__dirname, 'public', 'publish', 'publish.html');
    res.sendFile(filePath);
});

//redirect to home page
app.get('/home', (req,res) =>{
  const filePath = path.join(__dirname, 'public','home.html');
    res.sendFile(filePath);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//register user
app.post('/register', (req, res) => {
 
  const UserName=req.body.username;
  const Email=req.body.email;
  const Password=req.body.password;
  const Phone=req.body.phone;

  // Insert the user date
  const sql = 'INSERT INTO user_details(UserName, Email, Password, Phone) VALUES (?, ?, ?,?)';
  connection.query(sql, [UserName, Email, Password, Phone], (err, results) => {
      if (err) {
          console.error('Error inserting data into MySQL:', err);
          res.status(500).send('Error adding data to sql');
      } else {
          console.log('User id created:', results);
          
          res.redirect('/home');
         
      }
  });
});

//redirect to home from login
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the username and password exist in the database
  const query = 'SELECT * FROM user_details WHERE UserName = ? AND Password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
   
    if (results.length > 0) {
      // Successful login
      const user = results[0]; // Assuming there is only one user with the given username and password

      req.session.username = username;
      req.session.email = user.Email; // Assuming the email column in the user_details table is named 'Email'
      console.log(req.session.username);
      console.log(req.session.email);

      // Check if the user is admin
      if (username === 'admin' && password === '1') {
        return res.redirect('/admin');
      }

      return res.redirect('/home');
    } else {
      // Invalid credentials
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});






app.post('/update-status', (req, res) => {
  const filename = req.body.filename;
  const newStatus = req.body.status;

  // Update the status in your database based on filename
  // Implement the logic to update the status in your database
  // For example, you might use a SQL UPDATE query

  // Sample SQL query (make sure to adapt it to your database structure)
  const updateQuery = 'UPDATE published SET status = ? WHERE filename = ?';
  connection.query(updateQuery, [newStatus, filename], (err, result) => {
      if (err) {
          console.error('Error updating status:', err);
          // Handle the error appropriately (e.g., send an error response)
          res.status(500).send('Internal Server Error');
      } else {
          // Handle the success appropriately (e.g., send a success response)
          res.redirect('/pdfs-list');
      }
  });
});

app.get('/user-list', (req, res) => {
    // Select all data except the Password column
    const query = 'SELECT UserName, Email, Phone FROM user_details';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching user data:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Render the EJS page with the user data
        res.render('user-list', { users: results });
    });
});

app.get('/orders', (req, res) => {
  const useremail = req.session.email;
  const query = 'SELECT bookname, author, price,status FROM orders WHERE useremail = ?';

  connection.query(query, [useremail], (err, results) => {
      if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).send('Internal Server Error');
      }

      const orders = results;
      res.render('orders', { orders });
  });
});

app.get('/orders_status', (req, res) => {
  const useremail = req.session.email;
  const query = 'SELECT bookname, author, price,status FROM orders WHERE useremail = ?';

  connection.query(query, [useremail], (err, results) => {
      if (err) {
          console.error('Error querying MySQL:', err);
          return res.status(500).send('Internal Server Error');
      }

      const orders = results;
      res.render('orders_status', { orders });
  });
});
app.post('/update-orderstatus', (req, res) => {
  const bookname= req.body.bookname;
  const newStatus = req.body.newStatus;
  console.log("status is "+newStatus+" order id is "+bookname);
  // Assuming you have a table named 'orders' in your database
  const updateQuery = 'UPDATE orders SET status = ? WHERE bookname = ?';

  connection.query(updateQuery, [newStatus, bookname], (err, results) => {
    if (err) {
      console.error('Error updating status in MySQL:', err);
      return res.status(500).send('Internal Server Error');
    }

    // Assuming you want to redirect to the orders_status page after updating
    res.redirect('/admin');
  });
});