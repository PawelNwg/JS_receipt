class Product {
  id;
  sum;
  constructor(name, quantity, price) {
    (this.id = this.getId()),
      (this.name = name),
      (this.quantity = quantity),
      (this.price = price),
      (this.sum = this.getSum());
  }

  getSum() {
    // check q & p != 0
    return this.quantity * this.price;
  }

  getId() {
    return Math.floor(Math.random() * 100);
  }
}

class Receipt {
  constructor() {
    this.receiptList = [];
  }

  addProduct = (product) => {
    if (this.receiptList.findIndex((x) => x.id != product.id) < 0) {
      //this.receiptList.push(product); // add to List, to remove
      localStorage.setItem(product.name, JSON.stringify(product)); // Added to localStorage
    } else throw "Produkt o takim ID już istnieje";
  };
}

const myform = document.getElementById("myform");
// myform.addEventListener("submit", log);
let R = new Receipt();
R.addProduct(new Product("Kebabik", 1, 14));

myform.onsubmit = (event) => {
  let p = new Product(
    myform.fname.value,
    myform.fquantity.value,
    myform.fprice.value
  );
  console.log(p);
  R.addProduct(p);
  printTable(p);
  event.preventDefault();
};

printTable = () => {
  // PRZEROBIC NA OTRZYMYWANIE JSONA
  var tableHeaders = ["LP", "NAZWA", "ILOŚĆ", "CENA", "SUMA"];

  var oldTable = document.getElementById("table");
  oldTable.innerHTML = ""; // kasowanie poprzedniej tabeli

  var myTableDiv = document.getElementById("table");
  var table = document.createElement("TABLE");
  var tableBody = document.createElement("TBODY");
  table.appendChild(tableBody);

  for (var i = 0; i < localStorage.length + 1; i++) {
    var tr = document.createElement("TR");
    tableBody.appendChild(tr);

    for (var j = 0; j < 5; j++) {
      var td = document.createElement("TD");
      td.width = "120";

      if (i == 0) {
        td.appendChild(document.createTextNode(tableHeaders[j])); // dodanie naglowkow
      } else if (j == 0)
        td.appendChild(document.createTextNode(R.receiptList[i - 1].id));
      else if (j == 1)
        td.appendChild(document.createTextNode(R.receiptList[i - 1].name));
      else if (j == 2)
        td.appendChild(document.createTextNode(R.receiptList[i - 1].quantity));
      else if (j == 3)
        td.appendChild(document.createTextNode(R.receiptList[i - 1].price));
      else if (j == 4)
        td.appendChild(document.createTextNode(R.receiptList[i - 1].sum));

      tr.appendChild(td);
    }
  }
  myTableDiv.appendChild(table);
};

window.onload = (event) => {
  printTable();
};

function allStorage() {
  var values = [],
    keys = Object.keys(localStorage),
    i = keys.length;

  while (i--) {
    values.push(localStorage.getItem(keys[i]));
  }

  return values;
}
allStorage();
