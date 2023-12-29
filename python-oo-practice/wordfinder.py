"""Word Finder: finds random words from a dictionary."""

import random


class WordFinder:
    """Machine to take words from a list and return one at random"""

    def __init__(self, file_path_of_list):
        self.listOfWords = self.getWords(file_path_of_list)

        print(f"{len(self.listOfWords)} words read")
    
    def getWords(self, file):
        fileWithWords = open(file, "r")
        listOfWords = []

        for line in fileWithWords:
            line = line.strip().replace("\n", "")
            listOfWords.append(line)
        
        return listOfWords
    
    def randomWords(self):
        return random.choice(self.listOfWords)
    

class SpecialWordFinder(WordFinder):
    def getWords(self, file):
        fileWithWords = open(file, "r")
        listOfWords = []

        for line in fileWithWords:
            if len(line) > 0 and line[0] != "#":
                line = line.strip().replace("\n", "")
                listOfWords.append(line)

        return listOfWords
