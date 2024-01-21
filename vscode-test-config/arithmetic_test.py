"""Example of Unit tests."""

from arithmetic import adder
from unittest import TestCase

class AdderTestCase(TestCase):
    """Examples of unit tests"""

    def test_adder(self):
        self.assertEqual(adder(2,2), 4)
        self.assertEqual(adder(4,4), 3)