// import { romaji_dict } from "./dictonaries.js";

function arabic2romaji(n) {
  if (n.length == 1) {
    return r_len_one(n);
  }
  if (n.length == 2) {
    return r_len_two(n);
  }
  if (n.length == 3) {
    return r_len_three(n);
  }
  if (n.length == 4) {
    return r_len_four(n);
  }
  if (n.length > 4) {
    return r_len_more(n);
  }
}

function r_len_one(n) {
  return romaji_dict[n];
}

function r_len_two(n) {
  if (n in romaji_dict) {
    return romaji_dict[n];
  }
  if (n[1] == "0") {
    return r_len_one(n[0]) + " juu";
  }
  if (n[0] == "1") {
    return "juu " + r_len_one(n[1]);
  }
  return r_len_one(n[0]) + " juu " + r_len_one(n[1]);
}

function r_len_three(n) {
  if (n in romaji_dict) {
    return romaji_dict[n];
  }
  let units = parseInt(n) % 100;
  if (units == 0) {
    return r_len_one(n[0]) + " hyaku";
  }
  let hundreds = n[0] + "00";
  if (hundreds in romaji_dict) {
    return romaji_dict[hundreds] + " " + arabic2romaji(units.toString());
  }
  return r_len_one(n[0]) + " hyaku " + arabic2romaji(units.toString());
}

function r_len_four(n) {
  if (n in romaji_dict) {
    return romaji_dict[n];
  }
  let units = parseInt(n) % 1000;
  if (units == 0) {
    return r_len_one(n[0]) + " sen";
  }
  let thousands = n[0] + "000";
  if (thousands in romaji_dict) {
    return romaji_dict[thousands] + " " + arabic2romaji(units.toString());
  }
  return r_len_one(n[0]) + " sen " + arabic2romaji(units.toString());
}

function r_len_more(n) {
  if (n.length <= 8) {
    let man = n.slice(0, -4);
    let units = n.slice(-4);
    if (parseInt(units) == 0) {
      return arabic2romaji(man) + " man";
    }
    return arabic2romaji(man) + " man " + arabic2romaji(units.toString());
  }
  let oku = n.slice(0, -8);
  let man = n.slice(-8, -4);
  let units = n.slice(-4);
  let res = "";
  res += arabic2romaji(oku) + " oku ";
  if (parseInt(man) > 0) {
    res += arabic2romaji(man) + " man ";
  }
  if (parseInt(units) > 0) {
    res += arabic2romaji(units.toString());
  }
  return res;
}

// export { arabic2romaji };
