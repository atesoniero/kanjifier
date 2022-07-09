#!/usr/bin/env python3
import arabic2hiragana
import arabic2kanji
import arabic2romaji


def kanjify(num):

    print("kanji: " + arabic2kanji.arabic2kanji(str(num)))
    print("Hiragana: " + arabic2hiragana.arabic2hiragana(str(num)))
    print("Romaji: " + arabic2romaji.arabic2romaji(str(num)))


while True:
    while True:
        try:
            num = int(
                input("Please enter a number. Press Cmd/Ctrl + C to quit\n"))
            kanjify(num)
            print("")
            break
        except ValueError:
            print("Not a valid number.  Try again...")
