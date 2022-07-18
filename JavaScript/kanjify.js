// import { arabic2kanji } from "./arabic2kanji.js";
// import { arabic2hiragana } from "./arabic2hiragana.js";
// import { arabic2romaji } from "./arabic2romaji.js";

let message = "";
let kanji = "";
let hiragana = "";
let romaji = "";

function kanjify() {
  let num = document.querySelector(".number").value;
  const render = document.querySelector(".render_text");
  // console.log(isNaN(parseInt(num)));

  if (isNaN(parseInt(num)) || parseInt(num) < 0 || parseInt(num) >= 1e12) {
    message = `へ&nbsp&nbsp&nbsp&nbsp&nbspへ<br>
               の&nbsp&nbsp&nbsp&nbsp&nbspの<br>
               &nbsp&nbsp&nbsp&nbspも<br>
               &nbsp&nbsp&nbsp&nbspへ`;
    // console.log(message);
    document.getElementsByClassName("kanji")[0].innerHTML = message;
    document.getElementsByClassName("hiragana")[0].textContent = "";
    document.getElementsByClassName("romaji")[0].textContent = "";
    return;
  }
  kanji = arabic2kanji(num);
  hiragana = arabic2hiragana(num);
  romaji = arabic2romaji(num);

  document.getElementsByClassName("kanji")[0].textContent = "Kanji: " + kanji;
  document.getElementsByClassName("hiragana")[0].textContent =
    "Hiragana: " + hiragana;
  document.getElementsByClassName("romaji")[0].textContent =
    "Rōmaji: " + romaji;

  // Switch result to visible
  render.className = "render_text_visible";
  // render.classList.toggle("render_text_visible"); // Toggle on/off. Nt what I need
}
