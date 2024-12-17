const { Customer } = require("../models/Customer");



exports.fetchCustomers=async(req, res)=> {
    try {
      const customerData = await Customer.findAll()
      res.status(201).json(customerData);
    } catch (error) {
      res.status(500).json({message:{ error: error.message },"Errror":"Ther eis some error"});
    }
  };