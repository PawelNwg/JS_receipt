class Product {
   sum;
   constructor(name, quantity, price) {
      (this.name = name),
         (this.quantity = roundNumber(quantity)),
         (this.price = roundNumber(price)),
         (this.sum = roundNumber(this.getSum()));
   }

   getSum = () => {
      return this.quantity * this.price;
   };
}

class Receipt {
   constructor() {
      this.receiptList = [];
   }

   getReceiptValue = () => {
      let value = 0;
      this.receiptList.forEach((element) => {
         value += element.sum;
      });
      return roundNumber(value);
   };

   addProduct = (product) => {
      if (this.receiptList.findIndex((x) => x.name == product.name) < 0) {
         this.receiptList.push(product); // add to List, to remove
         localStorage.setItem("list", JSON.stringify(this.receiptList)); // Added to localStorage
      } else alert(`Produkt o nazwie ${product.name} już istnieje`);
   };

   deleteProduct = (product) => {
      const index = this.receiptList.indexOf(product);
      if (index > -1) {
         this.receiptList.splice(index, 1);
         localStorage.setItem("list", JSON.stringify(this.receiptList));
         printTable();
      }
   };

   containsProduct = (name) => {
      if (this.receiptList.findIndex((x) => x.name == name) < 0) return false;
      else return true;
   };

   swap = (index_1, index_2) => {
      const elementTemp = this.receiptList[index_1];
      this.receiptList[index_1] = this.receiptList[index_2];
      this.receiptList[index_2] = elementTemp;
      localStorage.setItem("list", JSON.stringify(this.receiptList));
      printTable();
   };
}

let R = new Receipt();
let editedProduct = null;

const myform = document.getElementById("myform");
myform.onsubmit = (event) => {
   event.preventDefault();
   if (isNaN(myform.fquantity.value) || isNaN(myform.fprice.value)) {
      alert("Podano złe wartości. Jako separatora użyj '.'");
      return;
   }

   let p = new Product(
      myform.fname.value,
      myform.fquantity.value,
      myform.fprice.value
   );

   R.addProduct(p);
   printTable(p);
};

printTable = () => {
   //PRZEROBIC NA OTRZYMYWANIE JSONA
   const tableHeaders = ["LP", "NAZWA", "ILOŚĆ", "CENA", "SUMA", "AKCJE"];

   const oldTable = document.getElementById("table");
   oldTable.innerHTML = ""; // kasowanie poprzedniej tabeli

   const myTableDiv = document.getElementById("table");
   const table = document.createElement("TABLE");
   const tableBody = document.createElement("TBODY");
   table.appendChild(tableBody);
   const tr = document.createElement("TR");
   tableBody.appendChild(tr);
   tableHeaders.forEach((element) => {
      const header = document.createElement("TH");
      header.width = "150";
      header.innerHTML = element;
      tr.appendChild(header);
   });

   if (R.receiptList !== null) {
      R.receiptList.forEach((element, index, array) => {
         const row = document.createElement("TR");
         tableBody.appendChild(row);

         const lp = document.createElement("TD");
         lp.innerHTML = index + 1;
         row.appendChild(lp);

         const name = document.createElement("TD");
         name.innerHTML = element.name;
         row.appendChild(name);

         const quantity = document.createElement("TD");
         quantity.innerHTML = element.quantity;
         row.appendChild(quantity);

         const price = document.createElement("TD");
         price.innerHTML = element.price;
         row.appendChild(price);

         const sum = document.createElement("TD");
         sum.innerHTML = element.sum;
         row.appendChild(sum);

         const buttons = document.createElement("TD");
         const editButton = document.createElement("button");

         editButton.innerText = "edytuj";
         editButton.style.width = "50px";
         editButton.style.height = "20px";
         editButton.style.borderColor = "green";

         const deleteButton = document.createElement("button");
         deleteButton.innerText = "usuń";
         deleteButton.style.width = "50px";
         deleteButton.style.height = "20px";
         deleteButton.style.borderColor = "red";

         if (index > 0) {
            const upButton = document.createElement("button");
            upButton.innerText = "↑";
            upButton.style.width = "20px";
            upButton.style.height = "20px";
            upButton.onclick = () => HandelUpProductClick(index);
            buttons.appendChild(upButton);
         }

         if (index != array.length - 1) {
            const downButton = document.createElement("button");
            downButton.innerText = "↓";
            downButton.style.width = "20px";
            downButton.style.height = "20px";
            downButton.onclick = () => HandelDownProductClick(index);
            buttons.appendChild(downButton);
         }

         editButton.onclick = () => HandelEditProductClick(element);
         deleteButton.onclick = () => HandelDeleteProductClick(element);

         buttons.appendChild(editButton);
         buttons.appendChild(deleteButton);
         row.appendChild(buttons);
      });
   }

   const row = document.createElement("TR");
   tableBody.appendChild(row);

   row.appendChild(document.createElement("TD"));
   row.appendChild(document.createElement("TD"));
   row.appendChild(document.createElement("TD"));
   row.appendChild(document.createElement("TD"));

   const sumCell = document.createElement("TH");
   sumCell.innerHTML = "SUMA";
   row.appendChild(sumCell);

   const sumValueCell = document.createElement("TD");
   sumValueCell.innerHTML = `${R.getReceiptValue()} zł`;
   row.appendChild(sumValueCell);

   myTableDiv.appendChild(table);
};

window.onload = (event) => {
   R.receiptList = loadLocalStorage();

   printTable();
};

editform.onsubmit = (event) => {
   event.preventDefault();
   const editform = document.getElementById("editform");
   const name = editform.ename.value;
   const quantity = editform.equantity.value;
   const price = editform.eprice.value;
   if (isNaN(quantity) || isNaN(price)) {
      alert("Podano złe wartości. Jako separatora użyj '.'");
      return;
   }
   if (!R.containsProduct(name) || editedProduct.name == name) {
      editedProduct.name = name;
      editedProduct.quantity = roundNumber(quantity);
      editedProduct.price = roundNumber(price);
      editedProduct.sum = roundNumber(
         editedProduct.price * editedProduct.quantity
      );
      editform.style.visibility = "hidden";
      localStorage.setItem("list", JSON.stringify(this.receiptList));
      printTable();
   } else alert(`Produkt o nazwie ${editedProduct.name} już istnieje`);
};

const roundNumber = (number) => {
   return Math.round(number * 100) / 100;
};

loadLocalStorage = () => {
   const data = localStorage.getItem("list");
   if (data == null) return [];
   else return JSON.parse(data);
};

const HandelEditProductClick = (product) => {
   const editform = document.getElementById("editform");
   editform.style.visibility = "visible";
   (editform.ename.value = product.name),
      (editform.equantity.value = product.quantity),
      (editform.eprice.value = product.price);
   editedProduct = product;
};

const HandelDeleteProductClick = (product) => {
   R.deleteProduct(product);
};

const HandelUpProductClick = (index) => {
   R.swap(index, index - 1);
};

const HandelDownProductClick = (index) => {
   R.swap(index, index + 1);
};
