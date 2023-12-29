"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self, start):
        """Create counter that starts at a certain value"""
        self.start = self.counter = start
    
    def __repr__(self):
        """Show representation."""

        return f"<SerialGenerator start={self.start} next={self.counter}>"

    def generate(self):
        """Adds functionality to iterate counter and return counter value"""
        self.counter += 1
        return self.counter - 1

    def reset(self):
        """Adds functionality to reset the counter to original starting point"""
        self.counter = self.start