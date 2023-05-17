const { v4: uuidv4 } = require('uuid');
require("dotenv").config
const axios = require("axios")
const md5 = require('md5');
const Account = require("../models/account.model")
const Encryption = require('node_triple_des');
const { createTransaction } = require('./transactionsControllers');

const apiKey = process.env.API_KEY
const clientSecret = process.env.CLIENT_SECRET
const bankUri = process.env.BANK_URI
const debug = process.env.DEBUG
const mock = "Live";

const setConfig = (requestRef)=>{
    let signature = md5(`${requestRef};${clientSecret}`)
    const data = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Signature": signature
    }
    console.log(data)
    return data
}

const crypto = require('crypto');
function encrypt(sharedKey, plainText) {
    const bufferedKey = Buffer.from(sharedKey, 'utf16le');
    const key = crypto.createHash('md5').update(bufferedKey).digest();
    const newKey = Buffer.concat([key, key.slice(0, 8)]);
    const IV = Buffer.alloc(8, '\0');
    const cipher = crypto.createCipheriv('des-ede3-cbc', newKey, IV).setAutoPadding(true);
    let value = (cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64'))
    console.log(value)
    return value
}

const getBankCode = async (bankName)=>{
    const response = await fetch(`https://api.paystack.co/bank?country=nigeria`);
    const data = await response.json();
    const bank = data.data.find((bank) => bank.name.toLowerCase() === bankName.toLowerCase());
    if (!bank) {
      throw new Error(`Bank not found: ${bankName}`);
    }
    return bank.code;
  }

const createAccount  = async (details)=>{
    const requestRef = uuidv4()

    try{
        let data = {
            "request_ref": requestRef,
            "request_type": "open_account",
            "auth": {
                "type": null,
                "secure": null,
                "auth_provider": "FidelityVirtual",
                "route_mode": null
            },
            "transaction": {
                "mock_mode": mock,
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

        let response = await axios.post(`${bankUri}/transact`, data, {headers:setConfig(requestRef)})
        data = response.data.data.provider_response
        data = {
            'account_number': data.account_number,
            'account_reference': data.account_reference,
            'account_name': data.account_name,
            'bank_name': data.bank_name,
            'bank_code': data.bank_code,
            'user': String(details.userId),
        }

        console.log(data)
        // let newAccount = new Account(data)
        // newAccount = await newAccount.save()
        return response.data
    }
    catch(error){
        // throw new Error(error.message)
        return error
    }
}


const testCreateAccount = async (req, res)=>{
    console.log(mock)
    let details = {
        number: 2347042719028,
        firstName: "Simeon",
        lastName: "Ogunyinka",
        middleName: "Patrick",
        gender: "M",
        address: "No 21",
        email: "simeon60@gmail.com",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
        title: "Mr"
    }

    try{
        let response = await createAccount(details)
        res.json(response)
    }
    catch(err){
        res.json(err)
    }
}

const getBalance = async (req, res)=>{
    // const loggedUser = req.user;
    let loggedUser = {
        number: 2347042719024,
        firstName: "Emmy",
        lastName: "Olaosebikan",
        middleName: "Patrick",
        gender: "M",
        address: "No 21",
        email: "eolaosebikan60@gmail.com",
        city: "Abeokuta",
        state: "Ogun State",
        country: "Nigeria",
        title: "Mr"
    }

    const requestRef = uuidv4()

    // const accountDetails = await Account.findOne({user: loggedUser})
    let accountDetails = {
        "account_number": "9020022879",
        "account_reference": "b392271e-3e0c-4862-8f96-108cdbfb3f9f",
        "account_name": "Emmy Olaosebikan",
        "bank_name": "Fidelity",
        "bank_code": "070",
        "user": "undefined"
      }

    let det = {
        "auth": {
        "type": null,
        "secure": null,
        "route_mode": null,
        "auth_provider": "FidelityVirtual"
        },
        "request_ref": requestRef,
        "transaction": {
        "meta": null,
        "amount": 500,
        "details": null,
        "customer": {
        "email": "null",
        "surname": "Ogunyinka",
        "firstname": "Simeon",
        "mobile_no": "2347042719028",
        "customer_ref": "2347042719028",
        "transaction_ref_parent": null
        },
        "mock_mode": "Live",
        "transaction_ref": uuidv4(),
        "transaction_desc": "collect",
        "transaction_ref_parent": null
        },
        "request_type": "transaction_notification"
        }

    let deta = {
        "auth": {
            "type": null,
            "secure": null,
            "route_mode": null,
            "auth_provider": "FidelityVirtual"
            },
            "mock_mode": "Live",
        "transaction_ref": uuidv4(),
        "transaction_desc": "collect",
        "transaction_ref_parent": null,
        "request_type": "transaction_notification",
        "requester": "Simple Payments",
        "mock_mode": "live",
        "details": {
            "amount": 50,
            "status": "Successful|Failed",
            "provider": "FidelityVirtual",
            "customer_ref": "2349870818",
            "customer_email": "simeon60@gmail.com",
            "transaction_ref": uuidv4(),
            "customer_surname": "Ogunyinka",
            "transaction_desc": "{{transaction_description}}",
            "transaction_type": "collect",
            "customer_firstname": "Simeon",
            "customer_mobile_no": "2347042719028",
            "data":null
        },
        "app_info": {
            "app_code": null
        }
    }
    try{
        let response = await axios.post(`${bankUri}/transact`, deta, {headers: setConfig(requestRef)})
        console.log(response)
        res.json(response.data)
    }
    catch(err)
    {
        console.log(err)
        res.status(400).json(err)
    }
}

const initiateTransaction = async (request)=>{
    let user = request.user
    const requestRef = uuidv4()
    const transferDetails = request
    const loggedUserBankAccount = await AccountDetails.findOne({user: user._id})

    const details = {
        "request_ref": requestRef,
        "request_type": "transfer_funds",
        "auth": {
            "type": "bank.account",
            "secure": encrypt(loggedUserBankAccount.account_number),
            "auth_provider": "Fidelity",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "Live",
            "transaction_ref": uuidv4(),
            "transaction_desc": "A random transaction",
            "transaction_ref_parent": null,
            "amount": request.amount,
            "customer": {
                "customer_ref": loggedUserBankAccount._id,
                "firstname": user.firstName,
                "surname": user.lastName,
                "email": user.email,
                "mobile_no": user.phoneNumber1
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": {
                "destination_account": request.destination_account,
                "destination_bank_code": getBankCode(request.destination),
                "otp_override": true
            }
        }
    }

    try{
        let response = await axios.post(`${bankUri}/transact`, details, {headers: setConfig(requestRef)})
        return response.data
    }
    catch(err)
    {
        console.log(err)
    }
};


const transferFund = async (req, res)=>{
    
    const loggedUser = req.user;
    const requestRef = uuidv4()
    const transferDetails = req.body

    const loggedUserBankAccount = await AccountDetails.findOne({user: loggedUser._id})
    const receiverBankAccount =await AccountDetails.findOne({user: transferDetails.receiver}).populate("user")


    const details = {
        "request_ref": requestRef,
        "request_type": "transfer_funds",
        "auth": {
            "type": "bank.account",
            "secure": encrypt(loggedUserBankAccount.account_number),
            "auth_provider": "Fidelity",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "Live",
            "transaction_ref": uuidv4(),
            "transaction_desc": "A random transaction",
            "transaction_ref_parent": null,
            "amount": transferDetails.amount,
            "customer": {
                "customer_ref": loggedUserBankAccount._id,
                "firstname": loggedUser.firstName,
                "surname": loggedUser.lastName,
                "email": loggedUser,
                "mobile_no": loggedUser.phoneNumber1
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": {
                "destination_account": receiverBankAccount.account_number,
                "destination_bank_code": receiverBankAccount.bank_code,
                "otp_override": true
            }
        }
    }

    try{
        let response = await axios.post(`${bankUri}/transact`, details, {headers: setConfig(requestRef)})

        const transaction1 = {
            message: `Transer of ${"NGN" + this.amount} to ${receiverBankAccount.account_name} - ${receiverBankAccount.account_number}`,
            amount: transferDetails.amount,
            credit: false,
            user: loggedUser
        }

        await createTransaction(transaction1)

        const transaction2 = {
            message: `Received  ${"NGN" + this.amount} from ${loggedUserBankAccount.account_name}`,
            amount: transferDetails.amount,
            credit: true,
            user: transferDetails.receiver
        }
        await createTransaction(transaction2)

        res.json(response.data)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}

const withdrawFund = async (req, res)=>{
    const loggedUser = req.user;
    const requestRef = uuidv4()
    const {amount} = req.body

    const loggedUserBankAccount = await AccountDetails.findOne({user: loggedUser._id})

    const details = {
        "request_ref": requestRef,
        "request_type": "transfer_funds",
        "auth": {
            "type": "bank.account",
            "secure": encrypt(loggedUserBankAccount.account_number),
            "auth_provider": "Fidelity",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "Live",
            "transaction_ref": uuidv4(),
            "transaction_desc": "A random transaction",
            "transaction_ref_parent": null,
            "amount": amount,
            "customer": {
                "customer_ref": loggedUserBankAccount._id,
                "firstname": loggedUser.firstName,
                "surname": loggedUser.lastName,
                "email": loggedUser,
                "mobile_no": loggedUser.phoneNumber1
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": {
                "destination_account": loggedUser.accountNo,
                "destination_bank_code": getBankCode(loggedUser.bankName),
                "otp_override": true
            }
        }
    }

    try{
        let response = await axios.post(`${bankUri}/transact`, details, {headers: setConfig(requestRef)})

        const transaction1 = {
            message: `Withdrawal of ${"NGN" + this.amount} to your Bank Account`,
            amount: amount,
            credit: false,
            user: loggedUser
        }

        await createTransaction(transaction1)
        res.json(response.data)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}

const getAccount = async(req, res)=>{
    const loggedUser = req.user
    try{
        let loggedUserBankAccount = await Account.findOne({user: loggedUser._id})
        res.json(loggedUserBankAccount)
    }
    catch(err){
        res.status(400).json(err)
    }
}

const fundWallet = async (req, res)=>{
    const {amount, narration, transaction_ref} = req.body;
    const loggedUser = req.user;

    try{
       let loggedUserBankAccount = await Account.findOne({user: loggedUser._id})
    loggedUserBankAccount.amount += amount;
    loggedUserBankAccount = await Account.findOneAndUpdate({user: loggedUser._id}, loggedUserBankAccount, {new: true})

    let transaction = {
        user: loggedUser,
        amount: amount,
        credit: true,
        message: "Funding my wallet",
        transaction_ref: transaction_ref
    }

    transaction = await createTransaction(transaction); 
    res.json({message: "Transaction Made Successfuly"})
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {
    createAccount, testCreateAccount, getBalance, transferFund, withdrawFund, getAccount, initiateTransaction
}