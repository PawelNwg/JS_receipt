let pList = document.getElementsByTagName("p");
let paragrafNumber = 1;
let hList = document.getElementsByTagName("h2");

function colorParagraf() {
  const colors = ["red", "orange", "green", "blue", "black", "cyan"];

  for (var i = 0; i < pList.length; i++) {
    let choosenColor = Math.floor(Math.random() * colors.length);
    pList[i].style.color = `${colors[choosenColor]}`;
  }
}

function setTitle() {
  for (var i = 0; i < pList.length; i++) {
    let len = pList[i].innerText.length;
    pList[i].title = `${len}`;
  }
}

function setParagraf() {
  for (let i = 0; i < pList.length; i++) {
    let h2 = document.createElement("h2");
    h2.innerText = `paragraf ${paragrafNumber}`;
    pList[i].before(h2);
    paragrafNumber++;
  }
}

function colorBorder() {
  for (let i = 0; i < pList.length; i++) {
    pList[i].onclick = () => {
      cleanBorder();

      pList[i].style.border = "3px solid green";

      if (i != pList.length - 1) {
        pList[i + 1].style.border = "3px solid blue";
      }

      if (i != 0) {
        pList[i - 1].style.border = "3px solid orange";
      }

      if ((i + 1) % 2 == 0) pList[i].style.background = "lightgrey";
      else pList[i].style.background = "darkgrey";
      // parzysty jasny, np ciemny
    };
  }
}
function cleanBorder() {
  for (var j = 0; j < pList.length; j++) {
    pList[j].style.border = "none";
    pList[j].style.background = "none";
  }
}

function hideParagraf() {
  for (let i = 0; i < hList.length; i++) {
    hList[i].onclick = () => {
      if (hList[i].nextSibling.hidden == false)
        hList[i].nextSibling.hidden = true;
      else hList[i].nextSibling.hidden = false;
    };
  }
}

colorParagraf();
setTitle();
setParagraf();
colorBorder();
hideParagraf();

const myform = document.getElementById("myform");
myform.onsubmit = (e) => {
  let paragraf = document.getElementById("paragrafs");
  let h2 = document.createElement("h2");
  h2.innerText = `paragraf ${paragrafNumber}`;
  paragraf.appendChild(h2);

  let p = document.createElement("p");
  p.innerText = myform.text.value;
  paragraf.append(p);
  colorParagraf();
  setTitle();
  colorBorder();
  hideParagraf();
  paragrafNumber++;
};
