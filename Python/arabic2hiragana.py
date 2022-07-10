from dictionaries import hiragana_dict


def arabic2hiragana(n):
    if len(n) == 1:
        return len_one(n)
    if len(n) == 2:
        return len_two(n)
    if len(n) == 3:
        return len_three(n)
    if len(n) == 4:
        return len_four(n)
    if len(n) > 4:
        return len_more(n)


def len_one(n):
    return hiragana_dict[n]


def len_two(n):
    if n in hiragana_dict:
        return hiragana_dict[n]
    if n[1] == "0":
        return len_one(n[0]) + hiragana_dict["10"]
    if n[0] == "1":
        return hiragana_dict["10"] + len_one(n[1])
    return len_one(n[0]) + hiragana_dict["10"] + len_one(n[1])


def len_three(n):
    if n in hiragana_dict:
        return hiragana_dict[n]
    units = int(n) % 100
    if units == 0:
        return len_one(n[0]) + hiragana_dict["100"]
    hundreds = n[0] + "00"
    if hundreds in hiragana_dict:
        return hiragana_dict[hundreds] + arabic2hiragana(str(units))
    return len_one(n[0]) + hiragana_dict["100"] + arabic2hiragana(str(units))


def len_four(n):
    if n in hiragana_dict:
        return hiragana_dict[n]
    units = int(n) % 1000
    if units == 0:
        return len_one(n[0]) + hiragana_dict["1000"]
    thousands = n[0] + "000"
    if thousands in hiragana_dict:
        return hiragana_dict[thousands] + arabic2hiragana(str(units))
    return len_one(n[0]) + hiragana_dict["1000"] + arabic2hiragana(str(units))


def len_more(n):
    if len(n) <= 8:
        man = n[0:-4]
        units = n[-4:]
        if int(units) == 0:
            return arabic2hiragana(man) + hiragana_dict["10000"]
        return arabic2hiragana(man) + hiragana_dict["10000"] + arabic2hiragana(str(units))
    oku = n[0:-8]
    man = n[-8:-4]
    units = n[-4:]
    res = ""
    res += arabic2hiragana(oku) + hiragana_dict["100000000"]
    if int(man) > 0:
        res += arabic2hiragana(man) + hiragana_dict["10000"]
    if int(units) > 0:
        res += arabic2hiragana(str(units))
    return res
