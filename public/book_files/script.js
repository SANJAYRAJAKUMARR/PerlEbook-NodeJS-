const imgs = document.querySelectorAll('.img-select a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

document.getElementById('mailsend').addEventListener('click', function() {
    // Make a request to the server to trigger the send-email.js script
    fetch('/send-email', { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Order Placed Successfully!');
      })
      .catch(error => console.error('Error sending email:', error));
  });


function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);

// JavaScript function to handle the "Add to Cart" button click event
// function addToCart() {
//     // Get the selected book's information (you may need to customize this based on your application)
//     const bookTitle = document.querySelector('.product-title').textContent;
//     const bookAuthor = document.querySelector('ul li:nth-child(1) span').textContent;
//     const bookPrice = document.querySelector('.new-price span').textContent;

//     // Create a new cart item element
//     const cartItem = document.createElement('div');
//     cartItem.classList.add('cart-item');

//     // Populate the cart item with book details
//     cartItem.innerHTML = `
//         <h2>${bookTitle}</h2>
//         <p>Author: ${bookAuthor}</p>
//         <p>Price: ${bookPrice}</p>
//     `;

//     // Append the cart item to the "addtocart" page
//     const addToCartPage = document.querySelector('addtocart-page'); // Replace with the actual ID or selector of your "addtocart" page
//     addToCartPage.appendChild(cartItem);
// }




