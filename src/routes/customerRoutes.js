const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

// Get all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one customer
router.get('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a customer (check-in)
router.post('/', async (req, res) => {
  const customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    roomNumber: req.body.roomNumber,
    checkInDate: req.body.checkInDate || new Date(),
    checkOutDate: req.body.checkOutDate,
    idType: req.body.idType,
    idNumber: req.body.idNumber
  });

  try {
    const newCustomer = await customer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a customer
router.patch('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    
    if (req.body.firstName) customer.firstName = req.body.firstName;
    if (req.body.lastName) customer.lastName = req.body.lastName;
    if (req.body.email) customer.email = req.body.email;
    if (req.body.phone) customer.phone = req.body.phone;
    if (req.body.roomNumber) customer.roomNumber = req.body.roomNumber;
    if (req.body.checkOutDate) customer.checkOutDate = req.body.checkOutDate;
    if (req.body.idType) customer.idType = req.body.idType;
    if (req.body.idNumber) customer.idNumber = req.body.idNumber;
    
    const updatedCustomer = await customer.save();
    res.json(updatedCustomer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a customer (check-out)
router.delete('/:id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    
    await Customer.deleteOne({ _id: req.params.id });
    res.json({ message: 'Customer checked out' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;