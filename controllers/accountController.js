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

const setConfig = (requestRef)=>{
    let signature = md5(`${requestRef};${clientSecret}`)
    const data = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Signature": signature
    }
    return data
}


const encrypt = (item)=>{
    let response = Encryption.encrypt(clientSecret, item)
    return response
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
    console.log(bankUri)
    const requestRef = uuidv4()

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
            "mock_mode": debug ? "inspect" : "Live",
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
        let data = response.data.data.provider_response
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
        return data
    }
    catch(error){
        // throw new Error(error.message)
        return error
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
        res.json(err)
    }
}

const getBalance = async (req, res)=>{
    // const loggedUser = req.user;
    let loggedUser = {
        phoneNumber1: 2349042388583,
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

    const requestRef = uuidv4()

    // const accountDetails = await Account.findOne({user: loggedUser})
    let accountDetails = {
        "account_number": "4432660852",
        "account_reference": "0e90d4e2-4905-42fe-afea-9833c8b53fae",
        "account_name": "James Olaosebikan",
        "bank_name": "Fidelity",
        "user": "undefined"
      }

    const details={
        "request_ref": requestRef,
        "request_type": "get_balance",
        "auth": {
            "type": "bank.account",
            "secure": encrypt(accountDetails.account_number),
            "auth_provider": "Fidelity",
            "route_mode": null
        },
        "transaction": {
            "mock_mode": "Live",
            "transaction_ref": uuidv4(),
            "transaction_desc": "Checking for bank account",
            "transaction_ref_parent": null,
            "amount": 0,
            "customer": {
                "customer_ref": accountDetails.account_reference,
                "firstname": loggedUser.firstName,
                "surname": loggedUser.lastName,
                "email": loggedUser.email,
                "mobile_no": loggedUser.phoneNumber1
            },
            "meta": {
                "a_key": "a_meta_value_1",
                "b_key": "a_meta_value_2"
            },
            "details": null
        }
    }

    try{
        let response = await axios.post(`${bankUri}/transact`, details, {headers: setConfig(requestRef)})
        res.json(response.data)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
}

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


module.exports = {
    createAccount, testCreateAccount, getBalance, transferFund, withdrawFund, getAccount
}