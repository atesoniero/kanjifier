from dictionaries import romaji_dict


def arabic2romaji(n):
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
    return romaji_dict[n]


def len_two(n):
    if n in romaji_dict:
        return romaji_dict[n]
    if n[1] == "0":
        return len_one(n[0]) + " juu"
    if n[0] == "1":
        return "juu " + len_one(n[1])
    return len_one(n[0]) + " juu " + len_one(n[1])


def len_three(n):
    if n in romaji_dict:
        return romaji_dict[n]
    units = int(n) % 100
    if units == 0:
        return len_one(n[0]) + " hyaku"
    hundreds = n[0] + "00"
    if hundreds in romaji_dict:
        return romaji_dict[hundreds] + " " + arabic2romaji(str(int(n[1:])))
    return len_one(n[0]) + " hyaku " + arabic2romaji(str(int(n[1:])))


def len_four(n):
    if n in romaji_dict:
        return romaji_dict[n]
    units = int(n) % 1000
    if units == 0:
        return len_one(n[0]) + " sen"
    thousands = n[0] + "000"
    if thousands in romaji_dict:
        return romaji_dict[thousands] + " " + arabic2romaji(n[1:])
    return len_one(n[0]) + " sen " + arabic2romaji(n[1:])


def len_more(n):
    if len(n) <= 8:
        man = n[0:-4]
        units = n[-4:]
        if int(units) == 0:
            return arabic2romaji(man) + " man"
        return arabic2romaji(man) + " man " + arabic2romaji(units)
    oku = n[0:-8]
    man = n[-8:-4]
    units = n[-4:]
    res = ""
    res += arabic2romaji(oku) + " oku "
    if int(man) > 0:
        res += arabic2romaji(man) + " man "
    if int(units) > 0:
        res += arabic2romaji(units)
    return res
