let FETCH = async () => {
  let obj = {};
  document.querySelectorAll("input").forEach((element) => {
    console.log(element.value);
    obj[element.id] = element.value;
  });
  obj.Comment = document.querySelector("#Comment");
  console.log(JSON.parse(localStorage.getItem("isBasket")));
  obj.basket = JSON.parse(localStorage.getItem("isBasket"));
  let xml = await fetch("/orders", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(obj),
  });
  let json = await xml.json();
  if (json) alert("Заказ принят");
};

document.querySelector("#xml").addEventListener("click", FETCH);
