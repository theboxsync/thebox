const customerQuery = require("../models/customerQueryModel");
const User = require("../models/userModel");

const addCustomerQuery = async (req, res) => {
    try {
        console.log("req.body", req.body);
        const user_id = req.user;
        const {message, purpose} = req.body;
        const user = await User.findById(user_id);
        if(!user) return res.status(404).json({ message: "User not found" });   
        console.log("user", user);
        const user_name = user.name;
        const query = await customerQuery.create({
            user_name,
            user_id,
            purpose,
            message
        });
        res.status(201).json(query);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

const getCustomerQueryByUser = async (req, res) => {
    try {
        const user_id = req.user;
        const queries = await customerQuery.find({user_id});
        res.status(200).json(queries);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addCustomerQuery };