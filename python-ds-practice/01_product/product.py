def product(a, b):
    """Return product of a and b.

        >>> product(2, 2)
        4

        >>> product(2, -2)
        -4
    """
    if a.isnumeric() and b.isnumeric:
        return a * b
    return "Make sure that those are both numbers"