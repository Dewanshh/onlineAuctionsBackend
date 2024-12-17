const { Seller } = require("../models/Seller");

exports.createSeller = async (req, res) => {
  try {
    const { email, name, contactNumber, city, state, country, address, description } = req.body;

    const existingSeller = await Seller.findOne({ where: { email } });

    if (existingSeller) {
      return res.status(400).json({ message: "Seller Already Exists" });
    }

    const newSeller = await Seller.create({
      email,
      name,
      contactNumber,
      city,
      state,
      country,
      address,
      description,
    });

    res.status(201).json(newSeller);
  } catch (error) {
    res.status(500).json({
      message: { error: error.message },
      Error: "There is some error while creating the seller",
    });
  }
};
