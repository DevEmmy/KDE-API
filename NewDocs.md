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
    - method: POST
    - route: "/users/sign-up/sign
    - if successful, you'd get a JSON object,
    - like:
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
    - method: POST
    - route: "/users/sign-in" 
    - parameters: 
    - email
    - password

    - if successful, you'd get a JSON object, - 
    - like:
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

    - if the user inputs an incorrect password, a 403 status code is returned with an error message of "Wrong Password" as message


## User Endpoints
Properties:
```
    {
    firstName: User's first Name
    lastName: User's last Name
    otherNames: User's other names
    about: An About overview of a user, although it has a default value
    cover: User's cover picture
    facebookUrl: String,
    instagramUrl: String,
    websiteUrl: String,
    address: Residential Address
    country: Country at which user resides
    state: State at which user resides
    city: City at which user resides 
    sex: obviously gender,
    dob: Date of Birth,
    email: User's email
    phoneNumber1: User's Primary phone Number
    phoneNumber2: User's Secondary phone number
    password:  User's Password
    isAdmin: Flag to check is user is an Admin
    
    savedListing: An array of Listing Ids at which user have saved

    pageViews: 
    {
        value: the number of people who have viewed user's profile
        users: an array of User objects who viewed user's profile
    },

    totalSaved: {
        value: the number of people who have saved one of user's list
        users: an array of User objects who have saved one of user's list
    },


    
    // For verification
    nationality: User's nationality
    isVerified: true or false value
    verificationType: {

    }
    verificationId:  {
        front: front page of ID,
        back: back page of ID
    }
    verifiedProfilePicture: user's passport

    profilePicture: User's profile Picture

    pronoun: User's Pronoun

    // I am unsure about these for now
    balanceAmount: Number,
    zipCode: Number,

    // for bank details
    accountNo: {type: Number},
    bankName: String,
    accountName: {type: String},
    

    //auth
    resetPasswordToken: String,
    resetPasswordExpires: Date,

    //type of account
    accountType: {
        0 for Buyer,
        1 for Seller
    }
    subscribed: Flag indicating in user has subscribed 
    noOfSubscription: Number of times at which a user has subscribed
    totalListing: Total Number of Lists a User has made
    sellerType: {
        0 for inidividual
        1 for company
    }
}
```

- Update User Account
    - This will update the user account profile.
    - method:  PATCH
    - route: "/users/update"
    - body: based on what should be updated

    - if successful, the updated user object will be returned;
    - else a 400 error will be returned

- Get All Users
    - This endpoint is to get all users
    - method: GET
    - route: "/users/all-users"

- Delete User Account
    - Obviously to delete the user account
    - method: DELETE
    - route: "/users/delete-account"

-  Save a list
    - This endpoint is to save a list Id into the user object.
        - parameter: listing
        - method: PUT
        - route: "/users/add-to-saved/"
        - if successful, the updated user object will be returned;
        else a 400 error will be returned

- Get signed in User details
    - This route will get the details of the - signed in user.
    - method: Get
    - route: "/users/me"
    - if successful, the updated user object will be returned;
    - else a 400 error will be returned

- Get a User detail
    - This route will get the details of a user, with its id.
    - method: GET
    - route: "/users/:id"
    - if successful, the user object will be returned;
    - else a 400 error will be returned

- Verify User
    - method: PATCH
    - route: "/users/verify"
    - parameters: verificationId, nationality, - verifiedProfilePicture, verificationType
    - response format: json
    - response: User Object

    - note: Pass the verificationId as an object of keys(front and back to hold the front view of the id and same for back).

- View Profile
    - method: PATCH
    - route: "/users/view/:id"
    
- Forgotten Password
    - method: POST
    - route: "/users/forgotten-password"
    - body:
    ```
        {
            email: "joe@mail.com"
        }
    ```
    - response: "Check your mail"
    ** A reset link will be sent to the provided email

- Reset Password
    - method: post
    - route: "/users/reset-password"
    - body:
    ```
        {
            password,
            token
        }
    ```
    - response: User object get returned


- Change account Type (Buyer: 0, Seller: 1)
    - method: PATCH
    - route: "/users/change-account-type"
    - parameters: 
    ```
        accountType: Number
    ```
    - response:

    ```
        {
            message: "Updated Successfully",
            user: UserObject
        }
    ```

- Change seller Type (Individual: 0, Community: 1)
    - method: PATCH
    - route: "/users/select-seller-type"
    - parameters: 
    ```
        sellerType: Number
    ```
    - response:

    ```
        {
            message: "Updated Successfully",
            user: UserObject
        }
    ```

## Listings

- Properties:
    ```
    category: {type: Schema.Types.ObjectId, ref:"Category"},
    title: {type: String, required:true},
    location: {type: String, required:true},
    postedBy: {type: Schema.Types.ObjectId, ref:"User", required: true},
    features: {type:Array},
    description: {type: String, required:false},
    images: {type: Array, required: false},
    videos: {type: Array, required: false},
    available: {type: Boolean, default: true},
    price: Number,
    attachedDocument: {type:Array},
    year: {type: Number},
    carCondition: String,
    engineType: String,
    colour: String,
    model: String,
    noOfBed: Number,
    noOfBathroom: Number,
    locationISO: string,
    views: [
        {type: Schema.Types.ObjectId, ref:"User"},
    ],
    thoseWhoSaved: [
        {type: Schema.Types.ObjectId, ref:"User"},
    ],
    ```

- Get all Listings
    - methods: GET
    - queries: page & category(slug)
    - route: "/listings/all?page=1&category=real-estate"
    - response: Array of lists


- Get Listing By Id
    - method: GET
    - route: "/listings/each/:id"

- Get LoggedIn User
    - method: GET
    - route: "/listings/user-listing"
    - response: Array of lists

- Create List
    - method: POST
    - route: "/listings/upload-list"
    - requirements: 
        - category Id
        - minimum of 4 images
        - videos
        - others
    - response: 
    ```
    {
        message: ...,
        list: ...
     }
    ```

- Delete a List
    - method: DELETE
    - route: "/listings/:id/" 
    - parameter:
        - id: the id of the list to be deleted
        - response: 
    ```
    {
        message: "Listing Deleted"
    }
    ```

- Update a List
    - method: PATCH
    - route: "/listings/updated/:id"
    - parameter: id
    - response: updated list

- Make List Unavailable
    - method: PATCH
    - route: "/listings/make-unavailable/:id/"
    - parameter: id
    - response: updated list

- View a List
    - method: PATCH
    - route: "/listings/view:id"
    - response:
    ```
    {status: 1}
    ```

    Note: The User who posted the List will get Notified.

- Save a List
    method: PATCH
    route: "/listings/save/:id"
    response:
    ```
        {
            status: 1
        }
    ```json

    the status can either be "1" or "0" and this route can be used to save and also unsave a list.

- Search a List


## Category
    - properties:
    ```
        {
            title: Title to be viewed on client,
            slug: To be used in routing
        }
    ```

    - Get all Categories
        - route: "/categories/all"
        - method: GET
        - response: Array of Categories

    - To Create New Category
        - route: "/categories/new"
        - method: POST

    - To delete Category
        - route: "/categories/:id"
        - method: DELETE
        
    - To Updated
        - route: "/categories/:id"
        - method: PATCH
    
    - Get Category By ID
        - route: "/categories/:id"
        - method: GET

## Notification
    The following are the properties of every notification.

    ```{title: title of the notification
    sender: a user object which sends the notification, and this might not be parsed from the client end

    message: the notification content

    type: the type of the notification which is either 0 or 1, 0 for just information nd 1 for a linked type of notification

    read: a boolean to tell if the notification is read or not

    receiver: a user object which owns the notification}
    ```

    - Get all Users Notification
        - method: GET
        - route: "/notifications/all"
        - response: An array of notifications

    - Read a Notification
        - method: GET
        - route: "/notifications/read/:id"
        - parameter: id
        - response: the notification object

    - Send Notification
        - method: POST
        - route: "/notifications/"
        - payload: 
        ```{
            title, message, sender, type, link, read, receiver
        }```

    - Get Number of Unread Notification
        - method: GET
        - route: "/notifications/unread"
        - response: {
            unread: 2
        }




## How Messages Work
- A Conversation needs to be initiated which will contain two people to be involved.

- So this conversation Id will be used as a reference to send messages to.

### Conversation
    - properties:
    ```
        {
            messages: Array of members,
            _id
        }
    ```
    - Get all Conversations
        - method: GET
        - route: "/conversations/user-conversations"

    - Create a New Conversation
        - Note: This will check if such exist, if it does, it'd return its object, else, it'd create a new one
        - method: POST
        - route: "/conversations/new-conversation/:id"
        - parameter:
            - id represents the id of the other user to chat with

    - Get a particular conversation object
        - method: GET
        - route: "/conversations/:id"
        - parameter:
            - id represents the conversation's id

### Messages
    - Properties:
    ```
        {
            conversationId,
            _id,
            sender,
            messageContent
        }
    ```

    - Get all messages in a conversation
        method: GET
        route: "/messages/:conversationId"

    - Send Message
        method: POST
        route: "/messages/send-message"
        - NOTE: the conversationId is necessary

## Members
    - Properties:
    ```
        {
            firstName: {type: String, require: true},
            lastName:  {type: String, require: true},
            whatsapp: String,
            twitter: String,
            linkedIn: String,
            role: String,
        }
    ```

    - Get all members
        - route: "/members/all-members"
        method: GET

## Blog
    - Properties:
    ```
        {
            title: String,
            content: String,
            coverImg: String,
            slug: String,
            author: User's Id of who created Blog
            category: Category's Id of what the blog speaks about
        }
    ```

    - GET All Blogs
        - method: GET
        - route: "/blogs/all"
        - response: Array of Blog

    - Get Blog by Slug
        - route: "/blogs/:slug"
        - parameter: slug
        - method: GET
        - response: Blog object

    - Create Blog
        - route: "/blogs/"
        - method: POST
        - response: Blog's Object

    - Delete Blog
        - route: "/blogs/:slug"
        - method: DELETE
        - response: "Deleted Successfully'

    - Updated Blog
        - route: "/blogs/:slug"
        - method: PATCH
        - response: "Updated Successfully'