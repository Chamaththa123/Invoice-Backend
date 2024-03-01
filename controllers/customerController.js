const dbService = require("../services/customerDBService");

const createCustomer = async (req, res) => {
  try {
    const {
      cus_name,
      cus_mail,
      entity,
      phone,
      attention,
      address_line1,
      address_line2,
      city,
      note,
    } = req.body;
    await dbService.insertCustomer(
      cus_name,
      cus_mail,
      entity,
      phone,
      attention,
      address_line1,
      address_line2,
      city,
      note
    );
    res.json({
      message: "customer added successfully",
    });
  } catch (err) {
    console.error("Error creating employee:", err);
    res
      .status(500)
      .json({ message: "Error creating employee", error: err.message });
  }
};

const getCustomer = async (req, res) => {
  try {
    const customer = await dbService.fetchCustomer();
    res.json(customer);
  } catch (err) {
    console.error("Error fetching customer:", err);
    res
      .status(500)
      .json({ message: "Error fetching customer", error: err.message });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { cus_id } = req.params;
    const customer = await dbService.fetchCustomerById(cus_id);
    if (customer.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(customer[0]);
  } catch (err) {
    console.error("Error fetching customer by ID:", err);
    res
      .status(500)
      .json({ message: "Error fetching customer by ID", error: err.message });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const { cus_id } = req.params;
    const {
      cus_name,
      cus_mail,
      entity,
      phone,
      attention,
      address_line1,
      address_line2,
      city,
      note,
    } = req.body;
    await dbService.updateCustomer(
      cus_id,
      cus_name,
      cus_mail,
      entity,
      phone,
      attention,
      address_line1,
      address_line2,
      city,
      note
    );
    res.json({ message: "Customer updated successfully" });
  } catch (err) {
    console.error("Error updating customer:", err);
    res
      .status(500)
      .json({ message: "Error updating customer", error: err.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { cus_id } = req.params;
    await dbService.deleteCustomer(cus_id);
    res.json({ message: "Customer deleted successfully" });
  } catch (err) {
    console.error("Error deleting customer:", err);
    res
      .status(500)
      .json({ message: "Error deleting customer", error: err.message });
  }
};

module.exports = {
  createCustomer,
  getCustomer,
  getCustomerById,
  updateCustomerById,
  deleteCustomer,
};
