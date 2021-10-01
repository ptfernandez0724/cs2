# Capstone 2: Backend Development
Backend for a buy and sell e-commerce platform where users can create an account, sell items, add items to cart and purchase them after.

## Tech Stack
- Node.js
- Express.js
- MongoDB

## Installation
```
git clone https://github.com/ptfernandez0724/cs2.git
npm i
```


## Start the server
```
npm start
```





## POST /users/register

_Creates an account which can be used to log in._

Example: POST  http://localhost:4000/users/register

Request body:
    
      {          
          "firstName": "John",
          "lastName": "Doe",
          "email": "johndoe@email.com",
          "password": "johndoe",
          "mobileNo": "09171234567  
      }
    
    
## POST /users/login

_Logs in an account and returns the bearer token which can be used to access secured services such as product posting, adding product to user cart, etc.._

Example: POST  http://localhost:4000/users/login

Request body:

      {
          "email": "johndoe@email.com",
          "password": "johndoe"  
      }

## POST /products/

_Creates a product._

Example: POST  http://localhost:4000/products/

_Requires a bearer token returned from POST /users/login_

Request body:

      {
          "name": "Iphone 13 pro",
          "description": "This is an unused iphone",
          "category": "Electronics",
          "price": 50000    
      }

## PUT /products/:productId

_Updates a product posted by the user._

Example: PUT  http://localhost:4000/products/:productId

_Requires a bearer token returned from POST /users/login_

Request body:

      {
          "name": "Iphone 13 pro",
          "description": "This is an unused iphone"
          "price": 50000    
      }

## PUT /products/:productId/archive

_Archives a product posted by the user._

Example: PUT  http://localhost:4000/products/:productId/archive

_Requires a bearer token returned from POST /users/login_


    
## POST /users/addtocart

_Adds the product to user's cart._

Example: POST  http://localhost:4000/users/addtocart

_Requires a bearer token returned from POST /users/login_

Request body:

      {
          "productId": "615439c5a06289de14889d0f" 
      }

## POST /users/checkout

_Lets the user checkout/order the product added in the cart._

Example: POST  http://localhost:4000/users/checkout

_Requires a bearer token returned from POST /users/login_

Request body:

      {
          "productId": "615439c5a06289de14889d0f" 
      }


## GET /users/orders

_Returns all the orders made by the user._

Example: GET  http://localhost:4000/users/orders

_Requires a bearer token returned from POST /users/login_



## POST /categories/

_Creates a new Category (for user admin only)._

Example: POST  http://localhost:4000/categories/

_Requires an admin bearer token returned from POST /users/login_

Request body:

      {
          "name": "Electronics"  
      }
  
## PUT /categories/:categoryId

_Updates a Category (for user admin only)._

Example: PUT  http://localhost:4000/categories/:categoryId

_Requires an admin bearer token returned from POST /users/login_

Request body:

      {
          "name": "Computers and Electronics" 
      }
    
## PUT /categories/:categoryId/archive

_Archives a Category (for user admin only)._

Example: PUT  http://localhost:4000/categories/:categoryId/archive

_Requires an admin bearer token returned from POST /users/login_

 

## GET /users/getallorders

_Returns all the orders made by all users (for admin user only)._

Example: GET  http://localhost:4000/users/getallorders

_Requires an admin bearer token returned from POST /users/login_

        


## GET /products/all

_Returns all products posted._

Example: GET  http://localhost:4000/users/all



## GET /products/:productId

_Returns a specific product posted._

Example: GET  http://localhost:4000/users/:productId



   
