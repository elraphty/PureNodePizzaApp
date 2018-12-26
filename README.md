# PURE NODE PIZZZA API
An api using raw node, that allow users to place pizza orders, users should send an items payload which will be an array of objects and the objects

## Built With
  ### Node Core Api
    * https module
    * http module
    * url module 
    * stringdecoder module
    * fs module
    * path module
    * util module
    * debug module

# Installation.
  * Install [Nodejs](https://nodejs.org/en/download/)
  * Clone this repo ``` git clone https://github.com/elraphty/PureNodePizzaApp.git ```
  * Run ```node index.js``` to start server
  * Modify lib/config.js to provision mailgun api key, stripe api key

## Features covered by the api
- Users canlog in and logout of the app. via the token get and delete endpoints, tokens expires after 24 hours
- Users can be created via the users post endpoint
- Users can check their existing details via the users get endpoint
- Users can be edit their existing details via the users put endpoint
- Users can delete their profile via the users delete endpoint
- Users can check available items via the items get endpoint
- A user can add items to cart via the carts post endpoint 
- A user can modify cart content via the carts put endpoint
- A user can check his current cart content via the carts get endpoint
- A user can empty his cart via the carts delete endpoint
- A user can place his pizza order via the order endpoint