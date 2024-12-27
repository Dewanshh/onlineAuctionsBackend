

const { where,Op } = require("sequelize");
const {Product} = require("../models/Products");
const {Customer} = require("../models/Customer");


  
exports.createProduct=async(req, res)=> {
    try {
      const newProduct = await Product.create({
        title: req.body.title,
        sellerName: req.body.sellerName,
        city: req.body.city,
        minimumBid: req.body.minimumBid,
        bidStartDate: req.body.bidStartDate,
        productType: req.body.productType,
        productImage:Buffer.from(req.body.productImage, 'base64') ,
        productDescription: req.body.productDescription,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({message:{ error: error.message },"Errror":"Ther eis some error"});
    }
  };
  exports.getProducts = async (req, res) => {
    try {
      const productsList = await Product.findAll({
        order: [['createdAt', 'DESC']], 
      });
      return res.status(200).json(productsList);
    } catch (e) {
      console.log(e);
      res.status(500).json({ Error: e });
    }
  };
  

exports.getProductById=async (req,res)=>{
  try{
    const id=req.params.id;
    const response=await Product.findOne({where:{id:id}});
    res.status(200).json(response)
  }catch(e)
  {
    res.status(500).json({"Error":e});
    console.log(e);
  }
}

exports.deleteProductById=async (req,res)=>{
  try{
    const id=req.params.id;
    
    const customers = await Customer.findAll({
      where: {
        customerBids: {
          [Op.like]: `%${id}%`,
        }
      }
    });
    
    for (let customer of customers) {
      let customerBids = JSON.parse(customer.customerBids) || [];
      
      
      const updatedBids = customerBids.filter(bid => bid !== id.toString());
      
      customer.customerBids = JSON.stringify(updatedBids);
      await customer.save();
    }
    
    const response=await Product.destroy({where:{id:id}});

    if(!response) res.status(404).json({"Error":"Product Not Found"});

    res.status(200).json("Product Deleted Succesfully.")
  }catch(e)
  {
    res.status(500).json({"Error":e});
    console.log(e);
  }
}