const express = require("express");
const router = express.Router();
const dashboardController = require("../../controller/api controller/dashboardApi");
router.get("/",dashboardController.dashboard);

//CRUD product
    //Create product
    router.get('/addProduct',dashboardController.addProduct)
    router.post('/postAddProduct',dashboardController.postAddProduct)
//Edit product
    router.get('/editProduct/:p_id',dashboardController.edit)
    router.post('/updateProduct/:p_id',dashboardController.update)
//Delete product
    router.get('/softDelete/:p_id',dashboardController.softDelete)

module.exports = router