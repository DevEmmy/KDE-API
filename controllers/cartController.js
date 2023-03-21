
const createCart = async (req, res)=>{
    let loggedUser = req.user;
    try {
        let cart = {
            user: loggedUser
        }
    } catch (error) {
        
    }
}

module.exports = {
    createCart
}