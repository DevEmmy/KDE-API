## King David Elites - API

This API is provided for the Frontend developers to implement on the development side of the web app for certain functioanlities and features, which are:
- Login
- Sign up
- Uploading of Listings
- e.t.c...

Base URL: [https://kde-api.herokuapp.com/]https://kde-api.herokuapp.com/

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
    route: PATCH: "/users/update-user-to-seller"
    if successful, a user object will be returned:
    {
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