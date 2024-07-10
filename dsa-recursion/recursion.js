/** product: calculate the product of an array of numbers. */

function product(nums) {
  // Base Case
  if (nums.length === 0) {
    return 1;
  }

  return nums[0] * product(nums.slice(1))
}

/** longest: return the length of the longest word in an array of words. */

function longest(words) {
  // Base Case
  if (words.length === 0) {
    return 0;
  }

  return Math.max(words[0].length, longest(words.slice(1)));
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  // Base Case
  if (str.length === 0) {
    return '';
  }

  return str[0] + everyOther(str.slice(2));
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  // Cleaning up string
  let str = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Base Case
  if (str.length <= 1) {
    return true;
  }

  if (str[0] === str[str.length - 1]) {
    return isPalindrome(str.slice(1, -1));
  }
  return false;
}

let count = 0;
function findIndex(arr, val) {
  // Base case: if array is empty, value not found
  if (arr.length === 0) {
    let result = -1;
    count = 0;
    return result;
  }

  if (arr[0] === val) {
    let result = count;
    count = 0;
    return result;
  }

  count++;
  return findIndex(arr.slice(1), val);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  // Base Case
  if (str.length === 0) {
    return ''
  }


}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let result = [];

  // Base case: Not an object at all
  if (typeof obj !== 'object' || obj === null) {
    return [];
  }

  // Base case #1: Empty Obj
  if (Object.keys(obj).length === 0) {
    return [];
  }

  for (let key in obj) {
    if (typeof obj[key] === 'string') {
      result.push(obj[key]);
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      result = result.concat(gatherStrings(obj[key]));
    }
  }

  return result;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */


function binarySearch(arr, val) {
  // Base Case
  if (arr.length === 0) {
    return -1;
  }

  let mid = Math.floor(arr.length / 2);

  if (arr[mid] === val) {
    return mid;
  }

  if (val < arr[mid]) {
    return binarySearch(arr.slice(0, mid), val);
  }

  let result = binarySearch(arr.slice(mid + 1), val);
  return result === -1 ? -1 : result + mid + 1;
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
