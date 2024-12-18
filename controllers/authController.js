const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require('../models/User'); 
const { Customer } = require('../models/Customer');
const { response } = require("express");

exports.loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {

    let user;
    if (role === "customer") {

      user = await Customer.findOne({ where: { email, role } });
    } else {

      user = await User.findOne({ where: { email, role } });
    }

    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.registerUser = async (req, res) => {
    const { email, password, role } = req.body;
  
    try {
      const existingUser = await User.findOne({ where: { email, role } });
      if (existingUser) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  

      const newUser = await User.create({
        email,
        password: hashedPassword,
        role,
      });
  

      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(201).json({ token, message: "User registered successfully" });
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ error: err.message });
    }
  };

  exports.registerCustomer=async(req,res)=>{
    const {email,password,name,mobile,role,customerCity,customerState,customerCountry,customerAddress}=req.body;
    try{
        const existingCustomer=await Customer.findOne({where:{email,role}});
        if(existingCustomer)
            return res.status(400).json({error:"User Already Exists"});
        const hashedPassword=await bcrypt.hash(password,10);
        const newCustomer=await Customer.create({
            email,
            password:hashedPassword,
            name,
            mobile,
            role,
            customerCity,
            customerAddress,
            customerState,
            customerCountry
        });
        const token=jwt.sign(
            {id:newCustomer.id,email:newCustomer.email,role:newCustomer.role},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )
        res.status(200).json({token,message:"Customer Created Succesfully"});
    }catch(e)
    {
        console.log("Error while adding customer",e);
        res.status(500).json({message:"Error while adding customers",error:e})
    }
    
  }