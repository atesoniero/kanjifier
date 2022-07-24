// import { kanji_dict } from "./dictonaries.js";

function arabic2kanji(n) {
  if (n.length == 1) {
    return k_len_one(n);
  }
  if (n.length == 2) {
    return k_len_two(n);
  }
  if (n.length == 3) {
    return k_len_three(n);
  }
  if (n.length == 4) {
    return k_len_four(n);
  }
  if (n.length > 4) {
    return k_len_more(n);
  }
}

function k_len_one(n) {
  return kanji_dict[n];
}

function k_len_two(n) {
  if (n in kanji_dict) {
    return kanji_dict[n];
  }
  if (n[1] == "0") {
    return k_len_one(n[0]) + kanji_dict["10"];
  }
  if (n[0] == "1") {
    return kanji_dict["10"] + k_len_one(n[1]);
  }
  return k_len_one(n[0]) + kanji_dict["10"] + k_len_one(n[1]);
}

function k_len_three(n) {
  if (n in kanji_dict) {
    return kanji_dict[n];
  }
  let units = parseInt(n) % 100;
  if (units == 0) {
    return k_len_one(n[0]) + kanji_dict["100"];
  }
  let hundreds = n[0] + "00";
  if (hundreds in kanji_dict) {
    return kanji_dict[hundreds] + arabic2kanji(units.toString());
  }
  return k_len_one(n[0]) + kanji_dict["100"] + arabic2kanji(units.toString());
}

function k_len_four(n) {
  if (n in kanji_dict) {
    return kanji_dict[n];
  }
  let units = parseInt(n) % 1000;
  console.log(units.toString())
  if (units == 0) {
    return k_len_one(n[0]) + kanji_dict["1000"];
  }
  let thousands = n[0] + "000";
  console.log(thousands.toString())

  if (thousands in kanji_dict) {
    return kanji_dict[thousands] + arabic2kanji(units.toString());
  }
  return k_len_one(n[0]) + kanji_dict["1000"] + arabic2kanji(units.toString());
}

function k_len_more(n) {
  if (n.length <= 8) {
    let man = n.slice(0, -4);
    let units = n.slice(-4);
    if (parseInt(units) == 0) {
      return arabic2kanji(man) + kanji_dict["10000"];
    }
    return (
      arabic2kanji(man) + kanji_dict["10000"] + arabic2kanji(units.toString())
    );
  }
  let oku = n.slice(0, -8);
  let man = n.slice(-8, -4);
  let units = n.slice(-4);
  let res = "";
  res += arabic2kanji(oku) + kanji_dict["100000000"];
  if (parseInt(man) > 0) {
    res += arabic2kanji(man) + kanji_dict["10000"];
  }
  if (parseInt(units) > 0) {
    res += arabic2kanji(units);
  }
  return res;
}

// export { arabic2kanji };
