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

let p = new Product("bulka", 2, 10);
let r = new Receipt();
r.addProduct(p);
console.log(p);
console.log(r);
