const { v4: uuidv4 } = require('uuid');
require("dotenv").config
const axios = require("axios")
const md5 = require('md5');

const apiKey = process.env.API_KEY
const clientSecret = process.env.CLIENT_SECRET
const bankUri = process.env.BANK_URI

const setConfig = (requestRef)=>{
    let signature = md5(`${requestRef};${clientSecret}`)
    const data = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Signature": signature
    }
    return data
}

const createAccount  = async (details)=>{
    console.log(bankUri)
    const requestRef = uuidv4()
    let data = {
        request_ref:requestRef,
        request_type: "open_account",
        auth: {
            "type": null,
            "secure": null,
            "auth_provider": "FidelityVirtual",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "Live",
            "transaction_ref": "9238239",
            "transaction_ref_parent": null,
            "transaction_desc": "Creating of Account",
            "amount": 0,
            "customer": {
                "customer_ref": details.number,
                "firstname": details.firstName,
                "surname": details.lastName,
                "email": details.email,
                "mobile_no": details.number
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": {
                "name_on_account": details.firstName + " " + details.lastName,
                "middlename": details.middleName,
                "dob": details.dob,
                "gender": details.gender,
                "title": details.title,
                "address_line_1": details.address,
                "address_line_2": details.city,
                "city": details.city,
                "state": details.city,
                "country": details.country
            }
        }
    }

    const data2 = {
        "request_ref": requestRef,
        "request_type": "open_account",
        "auth": {
            "type": null,
            "secure": null,
            "auth_provider": "FidelityVirtual",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "inspect",
            "transaction_ref": uuidv4(),
            "transaction_desc": "A random transaction",
            "transaction_ref_parent": null,
            "amount": 0,
            "customer": {
                "customer_ref": details.number,
                "firstname": details.firstName,
                "surname": details.lastName,
                "email": details.email,
                "mobile_no": details.number
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": {
                "name_on_account": details.firstName + " " + details.lastName,
                "middlename": details.middleName,
                "dob": details.dob,
                "gender": details.gender,
                "title": details.title,
                "address_line_1": details.address,
                "address_line_2": details.city,
                "city": details.city,
                "state": details.city,
                "country": details.country
            }
        }
    }
    try{
        let response = await axios.post(`${bankUri}/transact`, data2, {headers:setConfig(requestRef)})
        return response.data
    }
    catch(error){
        // throw new Error(error.message)
        console.log(error)
    }
}


const testCreateAccount = async (req, res)=>{
    let details = {
        number: 2349042388583,
        firstName: "James",
        lastName: "Olaosebikan",
        middleName: "Oluwasegun",
        gender: "M",
        address: "No 21",
        email: "emmy@mail.com",
        city: "Abeokuta",
        state: "Ogun State",
        country: "Nigeria",
        title: "Mr"
    }

    try{
        let response = await createAccount(details)
        res.json(response)
    }
    catch(err){
        console.log(err)
    }
    
}

module.exports = {
    createAccount, testCreateAccount
}