class Basket {
  constructor() {}
  async findId(id) {
    let xml = await fetch("/api/" + id, { method: "get" });
    return await xml.json();
  }
  async add(id) {
    let obj = await this.findId(id);
    let basket = JSON.parse(localStorage.getItem("isBasket")) || [];
    if (basket.find((item) => item.id == obj._id)) basket.find((item) => item.id == obj._id).que += 1;
    else {
      basket.push({
        name: obj.name,
        img: obj.img,
        prise: obj.prise,
        id: obj._id,
        que: 1,
      });
    }
    localStorage.setItem("isBasket", JSON.stringify(basket));
    this.upload();
  }
  upload() {
    let basket = JSON.parse(localStorage.getItem("isBasket")) || [];
    let isHtml = basket.map((item) => {
      return `
        <div class="row">
        <div class="col-4">
            <img src="${item.img}" class="w-100" />
        </div>
        <div class="col-4 align-self-center text-center">
            <p class="m-0">${item.name}</p>
            <div class="btn-group m-auto" data-id=${item.id}>
            <button class="btn-dark addQue"><i class="fas fa-plus"></i></button>
            <button class="btn-light">${item.que}</button>
            <button class="btn-dark removeQue"><i class="fas fa-minus"></i></button>
            </div>
        </div>
        <div class="col-2 align-self-center">
            <p class="m-0 text-white">1</p>
            <button class="btn btn-danger delete" data-id=${item.id}><i class="fas fa-trash-alt"></i></button>
        </div>
        </div>
          `;
    });
    let order = document.querySelector("#basketEki");
    let isItog = document.querySelector("#isItog");
    let code = document.querySelector("#Code");
    if (order) order.innerHTML = isHtml.join("");
    if (isItog) {
      let arr = JSON.parse(localStorage.getItem("isBasket"));
      console.log(arr);
      arr = arr.map((item) => item.que * item.prise);
      arr = eval(arr.join("+"));
      isItog.innerHTML = arr + "тг";
    }
    if (code) {
      code.addEventListener("input", () => {
        let arr = JSON.parse(localStorage.getItem("isBasket"));
        arr = arr.map((item) => item.que * item.prise);
        arr = eval(arr.join("+"));

        if (code.value === "a") {
          console.log(arr);
          arr = percent(arr);
          console.log(arr);
          arr = Math.round(arr);
          document.querySelector("#isItog").innerText = arr + "тг";
        } else document.querySelector("#isItog").innerText = arr + "тг";
        //arr = (code * 100) / arr;
      });
    }
    function percent(number) {
      let percent = 50;
      let number_percent = (number / 100) * percent;
      return number_percent;
    }

    document.querySelector("#mySidenav  .container-fluid").innerHTML = isHtml.join("");
    document.querySelectorAll(".addQue").forEach((item) => {
      item.addEventListener("click", () => fixed(item.parentNode.dataset.id, "add"));
    });
    document.querySelectorAll(".RemoveQue").forEach((item) => {
      item.addEventListener("click", () => fixed(item.parentNode.dataset.id, "remove"));
    });
    document.querySelectorAll(".delete").forEach((item) => {
      item.addEventListener("click", () => {
        console.log("delete");
        fixed(item.dataset.id, "delete");
      });
    });
  }
}

let basket = new Basket([]);
let fixed = (id, method) => {
  console.log(id);
  let basketArr = JSON.parse(localStorage.getItem("isBasket"));
  if (method == "add") basketArr.find((item) => item.id == id).que += 1;
  else if (method == "remove") {
    let que = basketArr.find((item) => item.id == id).que;
    if (que >= 2) basketArr.find((item) => item.id == id).que -= 1;
  } else if (method == "delete") {
    let index = basketArr.findIndex((item) => item.id == id);

    basketArr.splice(index, 1);
  }
  localStorage.setItem("isBasket", JSON.stringify(basketArr));
  basket.upload();
};
if (localStorage.getItem("isBasket")) basket.upload();
document.querySelectorAll(".buy").forEach((item) => {
  item.addEventListener("click", () => basket.add(item.dataset.id));
});
document.querySelector("#basket").addEventListener("click", basket.upload);
