const db = require("../db/db");

const insertCustomer = (
  cus_name,
  cus_mail,
  entity,
  phone,
  attention,
  address_line1,
  address_line2,
  city,
  note
) => {
  const query =
    "INSERT INTO customer (cus_name, cus_mail, entity, phone, attention, address_line1, address_line2, city, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(
      query,
      [
        cus_name,
        cus_mail,
        entity,
        phone,
        attention,
        address_line1,
        address_line2,
        city,
        note,
      ],
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};

const fetchCustomer = () => {
  const query = "SELECT * FROM customer";
  return new Promise((resolve, reject) => {
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const fetchCustomerById = (cus_id) => {
  const query = "SELECT * FROM customer WHERE cus_id = ?";
  return new Promise((resolve, reject) => {
    db.query(query, [cus_id], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(JSON.stringify(results)));
      }
    });
  });
};

const updateCustomer = (
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
) => {
  const query = `
    UPDATE customer 
    SET 
    cus_name=?, 
    cus_mail=?, 
    entity=?, 
    phone=?, 
    attention=?, 
    address_line1=?, 
    address_line2=?, 
    city=?, 
    note=? 
    WHERE 
    cus_id=?
  `;

  return db.query(query, [
    cus_name,
    cus_mail,
    entity,
    phone,
    attention,
    address_line1,
    address_line2,
    city,
    note,
    cus_id,
  ]);
};

const deleteCustomer = (cus_id) => {
  const query = "DELETE FROM customer WHERE cus_id=?";
  return db.query(query, [cus_id]);
};

module.exports = {
  insertCustomer,
  fetchCustomer,
  fetchCustomerById,
  updateCustomer,
  deleteCustomer,
};
