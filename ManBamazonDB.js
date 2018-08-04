var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Carrots072087",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runManagerGuide()
});

function runManagerGuide() {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View Product List",
      "View Low Inventory",
      "Add to Inventory",
      "Add New Product"
    ]
  })
  .then(function(answer) {
    switch(answer.action) {
      case "View Product List":
      productSearch();
      break;

      case "View Low Inventory":
      lowInventory();
      break;

      case "Add to Inventory":
      addInventory();
      break;

      case "Add New Product":
      addProduct();
      break;
    }
  });
}

function productSearch () {
    var query = "SELECT * FROM products";
    connection.query(query, {
    }, function(err, res) {
      for (var i=0; i<res.length; i++) {
      console.log("Item ID: " + res[i].item_id +
                  " == Product Name: " + res[i].product_name + 
                  " == Product Price: " + res[i].price +
                  " == Quantities Left: " + res[i].stock_quantity);
      }
      runManagerGuide();
    })
}

function lowInventory() {
  var query = "SELECT * FROM products";
  connection.query(query, {
  }, function(err, res) {
    //console.log(res)
    var product = [];
    for (var i=0; i<res.length; i++) {
      if (res[i].stock_quantity < 10 ) {
        product.push(res[i]);
        console.log(product)
      }
    }
  });
}

// function buyUnits() {
//   connection.query("SELECT * FROM products", function(err, results){
//     if (err) throw err;
//       var choiceArray = [];
//       for (var i=0; i<results.length; i++) {
//         choiceArray.push(results[i].item_id);
//       }
//     inquirer
//     .prompt([
//       {
//         name: "choice",
//         type: "input",
//         message: "Which item would you like to purchase?"
//       },
//       {
//         name: "units",
//         type: "input",
//         message: "How many units would you like to purchase?"
//       }
//     ])
//     .then(function(answer) {
//       var chosenItem;
//       for (var j = 0; j < results.length; j++) {
//         if (parseInt(results[j].item_id) === parseInt(answer.choice)){
//         chosenItem = results[j];
//         var remainder = parseInt(chosenItem.stock_quantity) - parseInt(answer.units);
//       }
//     }
      
//       //determine if there are any quantities left:
//       if (parseInt(remainder) > 0) {
//         connection.query(
//           "UPDATE products SET ? WHERE ?",
//           [
//             {
//               stock_quantity: remainder
//             },
//             {
//               item_id: chosenItem.item_id
//             }
//           ],
//           function(error) {
//             if (error) throw err;
//             console.log("We have " + remainder + " left. ENJOY YOUR PURCHASE!");
//             console.log("Price of Purchase: " + parseInt(answer.units) * parseInt(chosenItem.price))
//             runProductGuide();
//           }
//         );
//       }
//       else {
//           console.log("Not enough units! Revise purchase!");
//           runProductGuide();
//       }
//       //this closes the else.
//     });
//       });
//     };