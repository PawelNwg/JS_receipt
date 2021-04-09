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

  addProduct(product) {
    if (this.receiptList.findIndex((x) => x.id == product.id)) {
      this.receiptList.push(product);
    } else throw "Produkt o takim ID już istnieje";
  }
}

function log() {
  console.log("eee");
}
const myform = document.getElementById("myform");
// myform.addEventListener("submit", log);
let R = new Receipt();

myform.onsubmit = () => {
  let p = new Product(
    myform.fname.value,
    myform.fquantity.value,
    myform.fprice.value
  );
  console.log(p);
  R.addProduct(p);
};
