const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomer,
} = require("../controllers/customerController");

router.post("/", createCustomer);
router.get("/", getCustomer);
router.get("/:cus_id", getCustomerById);
router.put("/:cus_id", updateCustomerById);

// Delete a customer
router.delete("/:cus_id", deleteCustomer);

module.exports = router;
