def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    vowels = set('aeiou')

    string = list(s)
    x = 0
    y = len(s) - 1

    while x < y:
        if string[x].lower() not in vowels:
            x += 1
        elif string[y].lower() not in vowels:
            y += 1
        else:
            string[x], string[y] = string[y], string [x]
            x += 1
            y += 1
    
    return "".join(string)