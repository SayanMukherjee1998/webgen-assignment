const express = require("express");
const router = express.Router();

//Dashboard page
const dashboardController = require("../controller/dashboardController");
router.get("/",dashboardController.userAuth,dashboardController.dashboard);


//CRUD product
    //Create product
        router.get('/addProduct',dashboardController.addProduct)
        router.post('/postAddProduct',dashboardController.postAddProduct)
    //Edit product
        router.get('/editProduct/:p_id',dashboardController.edit)
        router.post('/updateProduct',dashboardController.update)
    //Delete product
        router.get('/softDelete/:p_id',dashboardController.softDelete)


//Register Page
const registerController = require('../controller/registerController')
router.get('/register',registerController.register)
router.post('/postRegister',registerController.postRegister)


//Login page
const loginController = require('../controller/loginController')
router.get('/login',loginController.login)
router.post('/postLogin',loginController.postLogin)


//Logout page
const logoutController = require('../controller/logoutController')
router.get('/logout',logoutController.logout)

module.exports = router;
