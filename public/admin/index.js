function showFile(input) {
  let file = input.files[0];
  let reader = new FileReader();
  reader.onload = (arguments) => {
    console.log(arguments.target.result);
    document.querySelector("#cardimg").src = arguments.target.result;
  };
  reader.readAsDataURL(file);
}
const fixed = (str) => {
  let { id, value } = str;
  document.querySelector("#card" + id).innerText = value;
};
document.querySelectorAll(".creates").forEach((item) => {
  item.oninput = function () {
    fixed(this);
    this.value = this.value.toLowerCase();
  };
});