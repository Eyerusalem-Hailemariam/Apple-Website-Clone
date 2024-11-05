const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");

// Middle ware to extract info from the html
app.use(
	express.urlencoded({
		extended: true,
	})
);

// Middle ware to have access to the frontend
app.use(cors());
app.use(express.json());

// User account info
const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "appril",
    password: "123456789",
    database: "appril",
 });
 

// Connect to MySQL
app.get("/install", (req, res) => {
	let message = "Tables Created";
	// products table
	let createProducts = `CREATE TABLE if not exists Products(
		  product_id int auto_increment,
		  product_url varchar(255) not null,
		  product_name varchar(255) not null,
		  
		  PRIMARY KEY (product_id)
	  )`;
  
	// product description table
	let createProductDescription = `CREATE TABLE if not exists ProductDescription(
		description_id int auto_increment,
		product_id int(11) not null,
		product_brief_description varchar(255) not null,
		product_description varchar(255) not null,
		product_img varchar(255) not null,
		product_link varchar(255) not null,
  
		PRIMARY KEY (description_id),
		FOREIGN KEY (product_id) REFERENCES Products(product_id)
	  )`;
	// product price table
	let createProductPrice = `CREATE TABLE if not exists ProductPrice(
		price_id int auto_increment,
		product_id int(11) not null,    
		starting_price varchar(255) not null,
		price_range varchar(255) not null,
  
		PRIMARY KEY (price_id),
		FOREIGN KEY (product_id) REFERENCES Products(product_id)
	  )`;
  
	mysqlConnection.query(createProducts, (err) => {
	  if (err) console.log(err);
	});
	mysqlConnection.query(createProductDescription, (err) => {
	  if (err) console.log(err);
	});
	mysqlConnection.query(createProductPrice, (err, results) => {
	  if (err) console.log(err);
	});
  
	res.end(message);
  });
  
  
  
  // Insert a new iPhone
  app.post("/add-product", (req, res) => {
	// products table
	let product_name = req.body.product_name;
	let product_url = req.body.product_url;
	// product_description table
	let product_brief_description = req.body.product_brief_description;
	let product_description = req.body.product_description;
	let product_img = req.body.product_img;
	let product_link = req.body.product_link;
	// ProductPrice table
	let starting_price = req.body.starting_price;
	let price_range = req.body.price_range;
  
	let insertProduct = `INSERT INTO products (product_url,product_name) VALUES ("${product_url}", "${product_name}") ;`;
  
	mysqlConnection.query(insertProduct, (err) => {
	  if (err) {
		console.log(err);
		res.end(err);
	  }
	});
	const selectPID = `SELECT product_id FROM products WHERE product_name = "${product_name}"`;
  
	mysqlConnection.query(selectPID, (err, result) => {
	  const PId = result[0].product_id;
	  if (err) {
		console.log(err);
		res.end(err);
	  } else {
  
		let insert_Product_des = `INSERT INTO ProductDescription(product_id,product_brief_description,product_description,product_img,product_link) VALUES (${PId},"${product_brief_description}","${product_description}","${product_img}","${product_link}")`;
  
		let insert_Product_price = `INSERT INTO ProductPrice(product_id,starting_price,price_range) VALUES ("${PId}","${starting_price}", "${price_range}") ;`;
  
  
		mysqlConnection.query(insert_Product_des, (err) => {
		  if (err) {
			console.log(err);
			res.end(err);
		  }
		});
  
		mysqlConnection.query(insert_Product_price, (err) => {
		  if (err) {
			console.log(err);
			res.end(err);
		  }
		});
  
	  }
	  res.send("data inserted");
	});
  
  });
  
  
  //Get all iphone's
  app.get("/iphones", (req, res) => {
	mysqlConnection.query(
	  "SELECT * FROM Products INNER JOIN ProductDescription INNER JOIN ProductPrice ON Products.product_id = ProductDescription.product_id AND Products.product_id = ProductPrice.product_id",
	  (err, rows) => {
		// let iphones = { : [] };
		// iphones.products = rows;
		// var stringIphones = JSON.stringify(iphones);
		if (!err) res.json({ products: rows });
		else console.log(err);
	  }
	);
  });
  

// // Tilahun's Question => how to have data from one table in an array form
// app.get("/customers-name", (req, res) => {
// 	connection.query("SELECT name FROM customers", (err, results, fields) => {
// 		if (err) console.log("Error During selection", err);
// 		let x = [];

// 		for (let i = 0; i < results.length; i++) {
// 			const data = results[i].name;
// 			x.push(data);
// 		}
// 		res.send(x);
// 	});
// });

// // Route: /customers => To retrieve customized data from the tables
// app.get("/customers", (req, res) => {
// 	connection.query(
// 		"SELECT customers.customer_id AS id, customers.name, address.address, company.company FROM customers JOIN address JOIN company ON customers.customer_id = address.customer_id AND customers.customer_id = company.customer_id",
// 		(err, results, fields) => {
// 			if (err) console.log("Error During selection", err);
// 			// console.log(results);
// 			res.send(results);
// 		}
// 	);
// });

// // Route: /customers/:id => To retrieve single data from the tables using id
// app.get("/customers/:id", (req, res) => {
// 	const customerId = req.params.id;

// 	const query = `SELECT customers.customer_id as id, customers.name, address.address, company.company FROM customers JOIN address ON customers.customer_id = address.customer_id JOIN company ON customers.customer_id = company.customer_id WHERE customers.customer_id = ?`;

// 	connection.query(query, [customerId], (err, results) => {
// 		// console.log(results);
// 		if (err) {
// 			console.error("Error fetching user data:", err);
// 			res.status(500).json({ error: "Failed to fetch user data" });
// 		} else {
// 			if (results.length === 0) {
// 				res.status(404).json({ error: "User not found" });
// 			} else {
// 				const user = results[0];
// 				res.json(user);
// 			}
// 		}
// 	});
// });

// // Route: /update => To adjust or update data from the tables
app.put("/update", (req, res) => {
	const { product_img, id } = req.body;
	let updateName = `UPDATE customers SET product_img = ? WHERE product_id = ?`;
	connection.query(updateName, [product_img, id], (err, results, fields) => {
		if (err) console.log("");
		console.log(results.affectedRows + " record(s) updated");
		res.send(results);
	});
});

// // Route: /remove-user => To delete all data from the tables
// app.delete("/remove-user", (req, res) => {
// 	const { id } = req.body;
// 	let removeName = `DELETE FROM customers WHERE customer_id = ?`;
// 	let removeAddress = `DELETE FROM address WHERE customer_id = ?`;
// 	let removeCompany = `DELETE FROM company WHERE customer_id = ?`;

// 	connection.query(removeAddress, [id], (err, results) => {
// 		if (err) console.log("");
// 		console.log(results.affectedRows + " record(s) Deleted");
// 	});

// 	connection.query(removeCompany, [id], (err, results) => {
// 		if (err) console.log("");
// 		console.log(results.affectedRows + " record(s) Deleted");
// 	});

// 	connection.query(removeName, [id], (err, results) => {
// 		if (err) console.log("");
// 		console.log(results.affectedRows + " record(s) Deleted");
// 	});
// });

const port = 1243;
app.listen(port, () =>
	console.log(`listening and running on http://localhost:${port}`)
);