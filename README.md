# Hotel_booking

Hotel Booking Website
This project is a hotel booking website where users can search for hotels, book rooms, and make payments using Stripe. The frontend is built using React with Bootstrap for styling, and the backend is implemented using Node.js, Express, MongoDB for database management, JWT for authentication, bcrypt for password hashing, Morgan for logging, and Stripe for handling payments.

Features
Search Hotels: Users can search for hotels based on various criteria such as location, check-in/check-out dates, number of guests, etc.

Book Hotels: Once a user has found a suitable hotel, they can select the room type and proceed with the booking process.

Payments with Stripe: Users can make secure payments using the Stripe payment gateway.

Authentication: Users can sign up and log in to their accounts. JWT is used to handle authentication.

Authorization: Certain routes and features are protected and only accessible to authenticated users.

OTP Validation Only Genuine Email person Can log in to My app because once he SignUp a opt will be send to their Email Address

Forgot Password Opt Verification Link will be Generate 

For Providing Security to My node or epxress I have used A library called Helmet it removes the http:headers like in which technology my project is running also prevent from ClickJacking attacks

## Features
- Login page
- Register page
- form validation
- Login Authetication
- Delete Hotels
- view all hotels
- Book hotels using Stripe
- Edit hotels
- OTP Validation
- ForgotPassword validaton


## What I used in Frontend
- React.js.
- Redux/@toolkit.
- React typewriter effect
- React router
- Cloudinary to store the link of image after make it resize
- React Toastify
- AntDesign library
- React hooks
- axios
## what i used in Backedn
- Mongodb
- mongoose
- express js
- node js
- axios
- morgan
- nodemon
- JsonWebtoken
- cors
- Middleware
- dotenv
- helmet

## Deployment Link
- https://keshri522.github.io/Hotel_booking/

   ## Sometimes Server slow to take time to reload the hotels
  -- backend deployed on render
  - https://keshrihotelbooking.onrender.com/api/getHotels
    

 
## Deployment

To deploy this project run

```bash
  npm run deploy
```


## 🚀 About Me
I'm a full stack developer...
- Write a mail on :rkeshri522@gmail.com


## Starting the App

To start,run the following comman

```bash
  npm start
```


## Running Tests

To run tests, run the following command

```bash
  npm run test
```
## If you would like to contribute to this project, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push the changes to your fork: `git push origin feature/your-feature`
5. Open a pull request describing your changes

## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

