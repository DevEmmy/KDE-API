## King David Elites - API

This API is provided for the Frontend developers to implement on the development side of the web app for certain functioanlities and features, which are:
- Login
- Sign up
- Uploading of Listings
- e.t.c...

Base URL:xhttps://kde-api.herokuapp.com/

USERS PROPERTY:
- firstName
- lastName
- otherNames
- sex
- dob (Date of Birth)
- email 
- phoneNumber
- password
- isAdmin (A boolean to check if a user is an admin)
- isSeller (A boolean to check if a user is a seller)
- savedListing (An Array to contain the ID of every listing to save)
- nationality
- stateOfResidence
- isVerified (A boolean to check if a user is verified)
- verificationId (A url of an document, but will be received in form of a url)
- profilePicture
- governmentId
- pronoun
- balanceAmount

Please Note: Always pass the authentication in headers, i.e token.

### Authentication
For the authentication, we've two api routes which will be for logging in and signing up for the first time.

- Sign up
    Parameters: firstName, lastName, otherNames, sex, dob, email, phoneNumber, password

    route: POST:"/users/sign-up"
    if successful, you'd get a JSON object, like:
    {
        "token": "eyJh...",
        "message": "Successful",
    "user": {
        "_id": "63608abf0953c44af4474e5f",
        "email": "eola@gmail.com",
        "password": "$2b$08$YxzTpeXzCco/O5SUovq2OuR4U9AzRpa26JDr2BBt.RLfJiMZj6idy",
        "isAdmin": false,
        "isSeller": false,
        "profilePicture": null,
        "createdAt": "2022-11-01T02:55:59.877Z",
        "updatedAt": "2022-11-01T02:55:59.877Z",
        "__v": 0
        }
    }

    else, if the email is in the database, a 403 response is returned

    else, the error message will be sent with a status code of 400

- Login
    route: POST: "/users/sign-in" 
    parameters: email, password
    if successful, you'd get a JSON object, like:
    {
        "token": "eyJh...",
        "message": "Successful",
    "user": {
        "_id": "63608abf0953c44af4474e5f",
        "email": "eola@gmail.com",
        "password": "$2b$08$YxzTpeXzCco/O5SUovq2OuR4U9AzRpa26JDr2BBt.RLfJiMZj6idy",
        "isAdmin": false,
        "isSeller": false,
        "profilePicture": null,
        "createdAt": "2022-11-01T02:55:59.877Z",
        "updatedAt": "2022-11-01T02:55:59.877Z",
        "__v": 0
        }
    }

    if the user inputs an incorrect password, a 403 status code is returned with an error message of "Wrong Password" as message

    else, a 400 status code is returned.

### Update a User type to Seller
This will update the user accout type to seller and will have the priviledge to list.

    To update a user's userType, they range from 0-2;
    0 - Buyer
    1 - Seller
    2 - Hybrid (Unavailable for now)
    
    route: PATCH: "/users/update-user-to-seller"
    if successful, a user object will be returned:
    {
        "_id": "63608abf0953c44af4474e5f",
        "email": "eola@gmail.com",
        "password": "$2b$08$YxzTpeXzCco/O5SUovq2OuR4U9AzRpa26JDr2BBt.RLfJiMZj6idy",
        "isAdmin": false,
        "userType": 1,
        "profilePicture": null,
        "createdAt": "2022-11-01T02:55:59.877Z",
        "updatedAt": "2022-11-01T02:55:59.877Z",
        "__v": 0
    }

    else, a 400 status code is returned.

### Delete User Account
This will delete the user account.
    route: DELETE: "/users/delete-account"
    if successful, a status code of 200 and a message of "User Account Deleted"

    else, a status code of 400 and a error message and error itself will be returned.


### Update User Account
This will update the user account profile.
    route: PATCH: "/users/update"
    if successful, the updated user object will be returned;
    else a 400 error will be returned

### Save a list
This endpoint is to save a list Id into the user object.
    parameter: listing
    route: PUT: "/users/add-to-saved/"
    if successful, the updated user object will be returned;
    else a 400 error will be returned

### Get signed in User details
This route will get the details of the signed in user.
    route: GET:"/users/me"
    if successful, the updated user object will be returned;
    else a 400 error will be returned

### Get a User detail
This route will get the details of a user, with its id.
    route: GET:"/users/:id"
    if successful, the updated user object will be returned;
    else a 400 error will be returned

### Verify User
    PATCH: "/users/verify-user"
    parameters: verificationId, nationality, verificationProfilePicture, verificationType
    response format: json
    response: User Object

    note: Pass the verificationId as an object of keys: front and back to hold the front view of the id and same for back.

### Add Bank Details
    PATCH: "/users/bank-details",
    parameters: accountNo, bankName, accountName
    response format: json
    reponse

    ```message: "Updated Successfully",
        user: "User Object"
    ```

### View Profile
    PATCH: "/users/view/:id"
    

## Listing
The route below this will be related to Listings

Property of each List:
- _id
<!-- - category (This happen to be a model of a reference Id, one to many relationship on tables) -->
- title (The title of a list)
- location
- postedBy (a user model with a reference ID)
- features (An array of features of a list)
- description (A description of the property)
- images (An array of images)
- videos (An array of Videos)
- price (don't ask me!)
- year (year at which the list was created or renovated)
- carCondition
- engineType
- colour
- model (car model)
- noOfBed
- noOfBathroom
- views

### Get all listings from the database
    GET: "/listings/all"
    if successful; a list of all 

### Uploading a list
    POST: "/listings/upload-list/"
    parameters:
    - all above in the properties, except available
     response:
     if successful:
     {
        message: ...,
        list: ...
     }

### Delete a list
    DELETE: "/listings/id/" 

    id: the id of the list to be deleted
    response: 
    {
        message: "Listing Deleted"
    }

### Update a List
    PATCH: "/listings/make-unavailable/id"

    id: the id of the list to be updated;

    response: list properties;

### Make a list Unavailable
    PATCH: "/listings/make-unavailable/id/
    
    response: list properties;

### Get a list of users listings
    GET: "/listings/user-listing"
    response: list of properties


### View a list
    PATCH: "/listings/view:id"
    responnse: null

### save a list
    PATCH: "/listings/save/:id"
    response:
    ```
        {
            status: "Saved
        }
    ```json

    the status can either be "Saved" or "Unsaved" and this route can be used to save and also unsave a list.


## Notifications
    The following are the properties of every notification.

    title: title of the notification
    sender: a user object which sends the notification, and this might not be parsed from the client end

    message: the notification content

    type: the type of the notification which is either 0 or 1, 0 for just information nd 1 for a linked type of notification

    read: a boolean to tell if the notification is read or not

    receiver: a user object which owns the notification

    
### Get all users notifications
    GET: "/notifications/all"
    response: an array of notifications

### Read a notification
    GET: "/notifications/read/:id"
    parameter: id
    response: the notification object

### Send Notification
    POST: "/notifications"
    response: {
        message: "Notification Sent"
    }

### Get number of unread notifications
    GET: "/notifications/unread"
    response: {
        unread: 2
    }