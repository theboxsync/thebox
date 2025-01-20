const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middlewares");

router.route("/sendmail").post(authController.sendMail);

router.route("/emailcheck").post(authController.emailCheck);

router.route("/register").post(authController.register);
router.route("/update-tax").put(authMiddleware, authController.updateTax);

router.route("/login").post(authController.login);
router.route("/manager-login").post(authController.managerLogin);

router.route("/logout").get(authController.logout);

router.route("/sendadminotp").post(authController.sendAdminOtp);
router.route("/verifyadminotp").post(authController.verifyAdminOtp);
router.route("/resetadminpassword").post(authController.resetAdminPassword);

router.route("/userdata").get(authMiddleware, authController.getUserData);
router.route("/getmanagerdata").get(authMiddleware, authController.getManagerData);
router.route("/getmanagerdata/:id").get(authController.getManagerDataById);
router.route("/updatemanager/:id").put(authMiddleware, authController.updateManager);
router
  .route("/deletemanager")
  .post(authMiddleware, authController.deleteManager);
router.route("/changemanagerpassword").post(authMiddleware, authController.changeManagerPassword);

router.route("/addmenu").post(authMiddleware, authController.addMenu);
router.route("/getmenudata").get(authMiddleware, authController.getMenuData);
router.route("/getmenucategories").get(authMiddleware, authController.getMenuCategories);
router.route("/getmenudata/:id").get(authController.getMenuDataById);
router.route("/updatemenu/:id").put(authMiddleware, authController.updateMenu);
router
  .route("/deletemenu/:id")
  .delete(authMiddleware, authController.deleteMenu);
router.route("/setspecialdish/:id").put(authMiddleware, authController.setSpecialMenu);
router.route("/removespecialdish/:id").put(authMiddleware, authController.removeSpecialMenu);
router.route("/updateDishAvailability/:id").put(authMiddleware, authController.updateDishAvailability);

router.route("/getinventorydata").get(authMiddleware, authController.getInventoryData);
router.route("/getinventorydata/:id").get(authMiddleware, authController.getInventoryDataById);
router.route("/addinventory").post(authMiddleware, authController.addInvetory);
router.route("/deleteinventory/:id").delete(authMiddleware, authController.deleteInventory);
router.route("/updateinventory/:id").put(authMiddleware, authController.updateInventory);
router.route("/completeinventoryrequest").post(authMiddleware, authController.completeInventoryRequest);
router.route("/rejectinventoryrequest/:id").post(authMiddleware, authController.rejectInventoryRequest);

router.route("/getstaffpositions").get(authMiddleware, authController.getStaffPositions);
router.route("/staffdata").get(authMiddleware, authController.getStaffData);
router.route("/staffdata/:id").get(authMiddleware, authController.getStaffDataById);
router.route("/addstaff").post(authMiddleware, authController.addStaff);
router.route("/updatestaff/:id").put(authMiddleware, authController.updateStaff);
router.route("/deletestaff/:id").delete(authMiddleware, authController.deleteStaff);

router.route("/getdiningareas").get(authMiddleware, authController.getDiningAreas);
router.route("/checktable").get(authMiddleware, authController.checkTable);
router.route("/addtable").post(authMiddleware, authController.addTable);
router.route("/gettabledata").get(authMiddleware, authController.getTableData);
router
  .route("/gettabledata/:id")
  .get(authMiddleware, authController.getTableDataById);
router.route("/updatetable").put(authMiddleware, authController.updateTable);
router
  .route("/deletetable/:id")
  .delete(authMiddleware, authController.deleteTable);

router.route("/addorder").post(authMiddleware, authController.addOrder);
router.route("/updateorder").put(authMiddleware, authController.updateOrder);

router
  .route("/getorderdata/:id")
  .get(authMiddleware, authController.getOrderData);
router
  .route("/ordercontroller")
  .post(authMiddleware, authController.orderController);

router.route("/addcustomer").post(authMiddleware, authController.addCustomer);
router
  .route("/getcustomerdata/:id")
  .get(authMiddleware, authController.getCustomerData);

router.route("/showkots").get(authMiddleware, authController.showKOTs);
router.route("/updatedishstatus").put(authMiddleware, authController.updateDishStatus);
router.route("/updatealldishstatus").put(authMiddleware, authController.updateAllDishStatus);

router
  .route("/getorderhistory")
  .get(authMiddleware, authController.orderHistory);

router.route("/addmanager").post(authMiddleware, authController.addManager);

router.route("/addqsr").post(authMiddleware, authController.addQSR);

router.route("/getqsrdata").get(authMiddleware, authController.getQSRData);
router.route("/getqsrdata/:id").get(authController.getQSRDataById);

router.route("/updateqsr/:id").put(authMiddleware, authController.updateQSR);
router.route("/deleteqsr").post(authMiddleware, authController.deleteQSR);
router.route("/changeqsrpassword").post(authMiddleware, authController.changeQSRPassword);

router.route("/qsr-login").post(authController.qsrLogin);

router.route("/addsubscriptionplan").post(authMiddleware, authController.addSubscriptionPlan);
router.route("/getsubscriptionplans").get(authMiddleware, authController.getSubscriptionPlans);

router.route("/getusersubscriptioninfo").get(authMiddleware, authController.getUserSubscriptionInfo);

router.route("/buysubscriptionplan").post(authMiddleware, authController.buySubscriptionPlan);

router.route("/updateuser").put(authMiddleware, authController.updateUser);

router.route("/updatecharges").put(authMiddleware, authController.updateCharges);

module.exports = router;
