def print_all_words(words):
    """Print every word inside the 'words' list"""
    
    for word in words:
        print(word.upper())


def print_all_words_that_start_with(words, must_start_with):
    """Print every word in 'words' list that starts with the designated 'starting_letter'"""
    for word in words:
        for letter in must_start_with:
            if word.startswith(letter):
                print (word)

