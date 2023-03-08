## King David Elites API

This API is provided for the Frontend developers to implement on the client side of the web app for certain functioanlities and features

<h3>Base URL: https://kde-api.herokuapp.com/</h3>

Note*: 
- For any request, so attach the token in the header, so if not required, it'd just do away with it
- Anything like :id means the id to be parsed is a dynamic value, so adding the ":" is not required


## Authentication
For the authentication, we've two api routes which will be for logging in and signing up for the first time.

- Sign up:
    parameteres:
    - firstName
    - lastName
    - email
    - password
    method: POST
    route: "/users/sign-up/sign
    if successful, you'd get a JSON object, like:
    ```{
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
    }```

- Login
    method: POST
    route: "/users/sign-in" 
    parameters: 
    - email
    - password

    if successful, you'd get a JSON object, like:
    ```{
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
    }```

    if the user inputs an incorrect password, a 403 status code is returned with an error message of "Wrong Password" as message

## User Endpoints

- Update User Account
    This will update the user account profile.
    method:  PATCH
    route: "/users/update"
    body: based on what should be updated

    if successful, the updated user object will be returned;
    else a 400 error will be returned

- Get All Users
    This endpoint is to get all users
    method: GET
    route: "/users/all-users"

- Delete User Account
    Obviously to delete the user account
    method: DELETE
    route: "/users/delete-account"

-  Save a list
    This endpoint is to save a list Id into the user object.
        parameter: listing
        method: PUT
        route: "/users/add-to-saved/"
        if successful, the updated user object will be returned;
        else a 400 error will be returned

- Get signed in User details
    This route will get the details of the signed in user.
    method: Get
    route: "/users/me"
    if successful, the updated user object will be returned;
    else a 400 error will be returned

- Get a User detail
    This route will get the details of a user, with its id.
    method: GET
    route: "/users/:id"
    if successful, the user object will be returned;
    else a 400 error will be returned

- Verify User
    method: PATCH
    route: "/users/verify"
    parameters: verificationId, nationality, verifiedProfilePicture, verificationType
    response format: json
    response: User Object

    note: Pass the verificationId as an object of keys(front and back to hold the front view of the id and same for back).

- View Profile
    method: PATCH
    route: "/users/view/:id"
    
- Forgotten Password
    method: POST
    route: "/users/forgotten-password"
    body:
    ```
        {
            email: "joe@mail.com"
        }
    ```
    reponse: "Check your mail"
    ** A reset link will be sent to the provided email

- Reset Password
    method: post
    route: "/users/reset-password"
    body:
    ```
        {
            password,
            token
        }
    ```
    response: User object get returned


- Change account Type (Buyer: 0, Seller: 1)
    method: PATCH
    route: "/users/change-account-type"
    parameters: 
    ```
        accountType: Number
    ```
    response:

    ```
        {
            message: "Updated Successfully",
            user: UserObject
        }
    ```

- Change seller Type (Individual: 0, Community: 1)
    method: PATCH
    route: "/users/select-seller-type"
    parameters: 
    ```
        sellerType: Number
    ```
    response:

    ```
        {
            message: "Updated Successfully",
            user: UserObject
        }
    ```