// import { hiragana_dict } from "./dictonaries.js";

function arabic2hiragana(n) {
  if (n.length == 1) {
    return h_len_one(n);
  }
  if (n.length == 2) {
    return h_len_two(n);
  }
  if (n.length == 3) {
    return h_len_three(n);
  }
  if (n.length == 4) {
    return h_len_four(n);
  }
  if (n.length > 4) {
    return h_len_more(n);
  }
}

function h_len_one(n) {
  return hiragana_dict[n];
}

function h_len_two(n) {
  if (n in hiragana_dict) {
    return hiragana_dict[n];
  }
  if (n[1] == "0") {
    return h_len_one(n[0]) + hiragana_dict["10"];
  }
  if (n[0] == "1") {
    return hiragana_dict["10"] + h_len_one(n[1]);
  }
  return h_len_one(n[0]) + hiragana_dict["10"] + h_len_one(n[1]);
}

function h_len_three(n) {
  if (n in hiragana_dict) {
    return hiragana_dict[n];
  }
  let units = parseInt(n) % 100;
  if (units == 0) {
    return h_len_one(n[0]) + hiragana_dict["100"];
  }
  let hundreds = n[0] + "00";
  if (hundreds in hiragana_dict) {
    return hiragana_dict[hundreds] + arabic2hiragana(units.toString());
  }
  return h_len_one(n[0]) + hiragana_dict["100"] + arabic2hiragana(units.toString());
}

function h_len_four(n) {
  if (n in hiragana_dict) {
    return hiragana_dict[n];
  }
  let units = parseInt(n) % 1000;
  if (units == 0) {
    return h_len_one(n[0]) + hiragana_dict["1000"];
  }
  let thousands = n[0] + "000";
  if (thousands in hiragana_dict) {
    return hiragana_dict[thousands] + arabic2hiragana(units.toString());
  }
  return h_len_one(n[0]) + hiragana_dict["1000"] + arabic2hiragana(units.toString());
}

function h_len_more(n) {
  if (n.length <= 8) {
    let man = n.slice(0, -4);
    let units = n.slice(-4);
    if (parseInt(units) == 0) {
      return arabic2hiragana(man) + hiragana_dict["10000"];
    }
    return (
      arabic2hiragana(man) + hiragana_dict["10000"] + arabic2hiragana(units.toString())
    );
  }
  let oku = n.slice(0, -8);
  let man = n.slice(-8, -4);
  let units = n.slice(-4);
  let res = "";
  res += arabic2hiragana(oku) + hiragana_dict["100000000"];
  if (parseInt(man) > 0) {
    res += arabic2hiragana(man) + hiragana_dict["10000"];
  }
  if (parseInt(units) > 0) {
    res += arabic2hiragana(units.toString());
  }
  return res;
}

// export { arabic2hiragana };
