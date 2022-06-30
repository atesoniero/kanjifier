from dictionaries import kanji_dict


def arabic2kanji(n):
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
    return kanji_dict[n]


def len_two(n):
    if n in kanji_dict:
        return kanji_dict[n]
    if n[1] == "0":
        return len_one(n[0]) + kanji_dict["10"]
    if n[0] == "1":
        return kanji_dict["10"] + len_one(n[1])
    return len_one(n[0]) + kanji_dict["10"] + len_one(n[1])


def len_three(n):
    if n in kanji_dict:
        return kanji_dict[n]
    units = int(n) % 100
    if units == 0:
        return len_one(n[0]) + kanji_dict["100"]
    hundreds = n[0] + "00"
    if hundreds in kanji_dict:
        return kanji_dict[hundreds] + arabic2kanji(str(int(n[1:])))
    return len_one(n[0]) + kanji_dict["100"] + arabic2kanji(str(int(n[1:])))


def len_four(n):
    if n in kanji_dict:
        return kanji_dict[n]
    units = int(n) % 1000
    if units == 0:
        return len_one(n[0]) + kanji_dict["1000"]
    thousands = n[0] + "000"
    if thousands in kanji_dict:
        return kanji_dict[thousands] + arabic2kanji(n[1:])
    return len_one(n[0]) + kanji_dict["1000"] + arabic2kanji(n[1:])


def len_more(n):
    if len(n) <= 8:
        man = n[0:-4]
        units = n[-4:]
        if int(units) == 0:
            return arabic2kanji(man) + kanji_dict["10000"]
        return arabic2kanji(man) + kanji_dict["10000"] + arabic2kanji(units)
    oku = n[0:-8]
    man = n[-8:-4]
    units = n[-4:]
    res = ""
    res += arabic2kanji(oku) + kanji_dict["100000000"]
    if int(man) > 0:
        res += arabic2kanji(man) + kanji_dict["10000"]
    if int(units) > 0:
        res += arabic2kanji(units)
    return res
