const express = require('express');
const app = express();
var bodyParser = require("body-parser");
const api_processline = require('./api_processline.js');
const api_product = require('./api_product.js');
const api_order = require('./api_order');
const api_users = require('./api_users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api_signup', async (req, res) => {
  console.log(req.query);
  const result = await api_users.registerUser(req.query.username, req.query.role, req.query.mspID);
  return res.json({newUser: result});
})

app.get('/api_login', async (req, res) => {
  console.log(req.query);
  const result = await api_users.userExist(req.query.username);
  return res.json({userExist: result});
})

app.get('/api_init_processlineLedger', async (req, res) => {
  console.log(req.query);
  const result = await api_processline.init(req.query.username);
  return res.json({init: result});
})

app.get('/api_init_productLedger', async (req, res) => {
  console.log(req.query);
  const result = await api_product.init(req.query.username);
  return res.json({init: result});
})

app.get('/api_init_orderLedger', async (req, res) => {
  console.log(req.query);
  const result = await api_order.init(req.query.username);
  return res.json({init: result});
})

app.post('/api_new_processline', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;
  let component = req.body.component;
  let containerID = req.body.containerID;
  let manufacturer = req.body.manufacturer;
  let createdTime = req.body.createdTime;
  let weight = req.body.weight;
  let temperature = req.body.temperature;
  let expectedProduct = req.body.expectedProduct;

  const result = await api_processline.initProcessLine(username, lotNumber, component, containerID, manufacturer, createdTime, weight, temperature, expectedProduct);
  return res.status(201).json({ processline: result });
})

app.post('/api_new_product', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let productID = req.body.productID;
  let name = req.body.name;
  let type = req.body.type;
  let from = req.body.from;
  let processline = req.body.processline;
  let createdTime = req.body.createdTime;
  let weight = req.body.weight;
  let supplier = req.body.supplier;
  let owner = req.body.owner;

  const result = await api_product.initProduct(username, productID, name, type, from, processline, createdTime, weight, supplier, owner);
  return res.status(201).json({ product: result });
})

app.post('/api_new_order', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;
  let type = req.body.type;

  let productID = req.body.productID;
  let name = req.body.name;
  let weight = req.body.weight;
  let price = req.body.price;

  let specs = req.body.specs;
  let qualifiedOperator = req.body.qualifiedOperator;
  let methods = req.body.methods;
  let leadTime = req.body.leadTime;

  let address = req.body.address;
  let shipMethod = req.body.shipMethod;
  let tradeTerm = req.body.tradeTerm;
  let dispatchDate = req.body.dispatchDate;

  let totalAmount = req.body.totalAmount;
  let initPayment = req.body.initPayment;
  let payMethod = req.body.payMethod;

  let createdTime = req.body.createdTime;
  let orderer = req.body.orderer;
  let receiver = req.body.receiver;

  const result = await api_order.initOrder(username, orderID, type, 
    productID, name, weight, price, 
    specs, qualifiedOperator, methods, leadTime, 
    address, shipMethod, tradeTerm, dispatchDate, 
    totalAmount, initPayment, payMethod, 
    createdTime, orderer, receiver);
  return res.status(201).json({ order: result });
})

app.post('/api_update_processline', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;
  let component = req.body.component;
  let containerID = req.body.containerID;
  let newState = req.body.newState;
  let manufacturer = req.body.manufacturer;
  let updatedTime = req.body.updatedTime;
  let weight = req.body.weight;
  let temperature = req.body.temperature;
  let expectedProduct = req.body.expectedProduct;

  const result = await api_processline.updateProcessLine(username, lotNumber, component, containerID, newState, manufacturer, updatedTime, weight, temperature, expectedProduct);
  return res.status(201).json({ processline: result });
})

app.post('/api_update_product', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let productID = req.body.productID;
  let name = req.body.name;
  let newState = req.body.newState;
  let updatedTime = req.body.updatedTime;
  let owner = req.body.owner;
  let hasNewOwner = req.body.hasNewOwner;
  let newOwner = req.body.newOwner;

  const result = await api_product.updateProduct(username, productID, name, newState, updatedTime, owner, hasNewOwner, newOwner);
  return res.status(201).json({ product: result });
})

app.post('/api_modified_order', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;

  let productID = req.body.productID;
  let newProductID = req.body.newProductID;
  let newName = req.body.name;
  let newWeight = req.body.weight;
  let newPrice = req.body.price;

  let newSpecs = req.body.specs;
  let newQualifiedOperator = req.body.qualifiedOperator;
  let newMethods = req.body.methods;
  let newLeadTime = req.body.leadTime;

  let newAddress = req.body.address;
  let newShipMethod = req.body.shipMethod;
  let newTradeTerm = req.body.tradeTerm;
  let newDispatchDate = req.body.dispatchDate;

  let newTotalAmount = req.body.totalAmount;
  let newInitPayment = req.body.initPayment;
  let newPayMethod = req.body.payMethod;

  let updatedTime = req.body.updatedTime;
  let orderer = req.body.orderer;
  let modifier = req.body.modifier;
  let newState = req.body.newState;

  const result = await api_order.modifyOrder(username, orderID,
    productID, newProductID, newName, newWeight, newPrice, 
    newSpecs, newQualifiedOperator, newMethods, newLeadTime, 
    newAddress, newShipMethod, newTradeTerm, newDispatchDate, 
    newTotalAmount, newInitPayment, newPayMethod, 
    updatedTime, orderer, modifier, newState);
  return res.status(201).json({ order: result });
})

app.post('/api_updated_order_status', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;

  let productID = req.body.productID;

  let updatedTime = req.body.updatedTime;
  let orderer = req.body.orderer;
  let modifier = req.body.modifier;
  let newState = req.body.newState;

  const result = await api_order.updateOrder(username, orderID, productID, updatedTime, orderer, modifier, newState);
  return res.status(201).json({ order: result });
})

app.post('/api_end_processline', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;
  let component = req.body.component;
  let containerID = req.body.containerID;
  let manufacturer = req.body.manufacturer;
  let updatedTime = req.body.updatedTime;
  let weight = req.body.weight;
  let temperature = req.body.temperature;
  let expectedProduct = req.body.expectedProduct;

  const result = await api_processline.endProcessLine(username, lotNumber, component, containerID, manufacturer, updatedTime, weight, temperature, expectedProduct);
  return res.status(201).json({ processline: result });
})

app.post('/api_query_all_processes', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;

  const result = await api_processline.queryAllProcesses(username, lotNumber);
  return res.status(201).json({ processline: result });
})

app.post('/api_query_all_products', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let productID = req.body.productID;

  const result = await api_product.queryAllProducts(username, productID);
  return res.status(201).json({ products: result });
})

app.post('/api_query_all_orders', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;

  const result = await api_order.queryAllOrders(username, orderID);
  return res.status(201).json({ orders: result });
})

app.post('/api_query_process', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;

  const result = await api_processline.queryProcess(username, lotNumber);
  return res.status(201).json({ processline: result });
})

app.post('/api_query_product', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let productID = req.body.productID;

  const result = await api_product.queryProduct(username, productID);
  return res.status(201).json({ product: result });
})

app.post('/api_query_order', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;

  const result = await api_order.queryOrder(username, orderID);
  return res.status(201).json({ orders: result });
})

app.post('/api_query_processline_history', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let lotNumber = req.body.lotNumber;

  const result = await api_processline.getHistoryByKey(username, lotNumber);
  return res.status(201).json({ processline: result });
})

app.post('/api_query_product_history', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let productID = req.body.productID;

  const result = await api_product.getHistoryByKey(username, productID);
  return res.status(201).json({ products: result });
})

app.post('/api_query_order_history', async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let orderID = req.body.orderID;

  const result = await api_order.getHistoryByKey(username, orderID);
  return res.status(201).json({ orders: result });
})

app.listen(3000);