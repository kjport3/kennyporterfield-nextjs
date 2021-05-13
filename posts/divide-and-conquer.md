---
title: 'Divide and Conquer Algorithm Strategy'
date: '2021-05-09'
image: '/images/divide-conquer.png'
---

### Divide and Conquer
This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data. *This pattern can tremendously decrease time complexity.*

This pattern will grow in complexity, but we're going to start with a simpler example and later build upon it. 

*An Example*
Given a sorted array of integers, write a function called search, that accepts a value and returns the index where the value passed to the function is located. If the value is not found, return -1.
```js
search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1
```
*"Naive approach: Linear Search - O(N)*
```js
function linearSearch(arr, val) {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] === val) {
			return i;
		}
	}
	return -1;
}
```
This is a pretty simple algorithm. We are searching for a value in an array, so we just loop through the array and see if we find the value. This approach would take N steps for an array of N length. This isn't the worst algorithm out there, but it can be improved upon greatly by using the Divide & Conquer approach. We'll look at one called *binary search*.

*Divide and Conquer Algorithm: Binary Search - O(<sub>log</sub>N)*
```js
function search(array, val) {
	let min = 0;
	let max = array.length - 1;
	while (min <= max) {
		let middle = Math.floor((min + max) / 2);
		let currentElement = array[middle];
		
		if (array[middle] < val) {
			min = middle + 1;
		} else if (array[middle] > val) {
			max = middle - 1;
		} else {
			return middle;
		}
	}
}
```
Binary search uses the divide and conquer strategy to drastically improve our search operation. In this instance it works just like this number guessing game: If I asked you to guess a number between 1 and 100, and I would tell you whether the number is higher or lower until you guessed the right number, think about what would\ the best strategy would be to find out the number in the least amount of guesses? First, you'd guess 50, because by guessing halfway, regardless of what the number is, it will eliminate half of the possible options when I tell you "higher" or "lower". If I said "lower" then the next best thing you could guess would be 25, to eliminate half of the remaining numbers again.

Using this method, the maximum amount of guesses you'd have to make before finding the number would be 7. If you were to just start at 1 and keep guessing the next number, akin to linear search, this could take you up to 100 guesses. Furthermore, each time we double the amount of values we have to check, the maximum number of steps for binary search only increases by 1, which makes sense when you think about it. Because our first guess eliminates half of the possiblities, we need to double the amount of possibilities to add a single step. Binary search on 200 values would take 8 steps, while linear search would take 200, and that pattern continues on and on. Searching an array of 400 values would take binary search a maximum of 9 steps, while it would take 400 for linear search, etc. 

The pattern that emerges here is that for an array of N length, the # of steps it takes is roughly <sub>log</sub>N (the inverse of exponentiation, or O(N<sup>2</sup>).