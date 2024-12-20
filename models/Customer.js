const { DataTypes,Sequelize } = require("sequelize");
const { sequelize } = require("../config/db");


const Customer=sequelize.define('Customer',{
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password: { type: DataTypes.STRING, allowNull: false },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    mobile:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    customerCity:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    customerState:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    customerCountry:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    customerAddress:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    customerBids:{
        type:Sequelize.TEXT,
        allowNull:true,

    }


})
module.exports={Customer}