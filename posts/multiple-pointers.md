---
title: 'Multiple Pointers Algorithm Strategy'
date: '2021-05-07'
image: '/images/pointer.png'
---

### Multiple Pointers
Creating pointers or values that correspond to an index or position and move towards the beginning, end or middle based on a certain condition. 
Very efficient for solving problems with minimal space complexity as well.

When we have some sort of structure like an array or string, and we're searching for a pair of values that meets a condition. We make multiple pointers that at a certain position in the array and work through it. 

An example:
Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist.

```js
sumZero([03,-2,-1,0,1,2,3]) // [-3,3]
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined
```

"Naive" Solution: 
The nested loop solution checks each index of the array against every other index of the array to see if the condition in the problem is met. If the condition isn't met, this means the algorithm with take N<sup>2</sup> steps. An O(N<sup>2</sup>) algorithm is not very efficient.
```js 
function sumZero(arr) {
	for(let i = 0; i < arr.length; i++) {
		for(let j = i+1; j < arr.length; j++) {
			if(arr[i] + arr[j] === 0) {
				return [arr[i], arr[j]];
			}
		}
	}
}
```

Refactored with multiple pointers:
```js
function sumZero(arr) {
	// Create a variable to reference the index 
	// at the left and right of our array
	let left = 0;
	let right = arr.length - 1;
	// Create a while loop condition that keeps 
	// going until we reach the middle
	while(left < right) {
		// Check the sum of the numers at the left 
		// and right index to see if it equals 0
		let sum = arr[left] + arr[right];
		// If they do, we return the array with those two values
		if(sum === 0) {
			return [arr[left], arr[right]];
		// If the sum is greater than 0, then our 
		// number at the right index is too high so 
		// we will decrement our right pointer and 
		// check the index to its left on the next loop
		} else if(sum > 0) {
			right--;
		// If the sum is less than 0, then our number 
		// at the left index is too low so we will we 
		// increment our left pointer and check the next 
		// index on the next loop
		} else {
			left++;
		}
	}
}
```
Time Complexity: O(N)
<br>
_Count Unique Values Coding Challenge_
Write a function which accepts a sorted array, and returns the a count of the # of unique values in the array. There can be negative numbers in the array, but it will always be sorted.
```js
countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4
```

My initial solution:
```js
function countUniqueValues(arr) {
	// Set multiple pointers, this time they'll both be at the beginning
	let left = 0;
	let right = 1;
	// Add a counter variable to count the unique values
	let count = 0;
		// Until our right pointer goes all the way through the array
		while(right <= arr.length) {
			// We loop through the array, if the value is not equal, we increment
			// count by 1, set left pointer equal to the right pointer, then
			// increment the right pointer
			if(arr[left] !== arr[right]) {
				count++;
				left = right;
				right++;
			// If the values are equal, we just move the right index over
			// until we reach a set of values that are not equal
			} else {
				right++;
		}
	}
	// By only making left increment when the values are different, left skips
	// the duplicates
	return count;
}
```

A refactoring:
```js
function countUniqueValuesRefactor(arr) {
	// Add an initial check to see if the length of the array is 0 to shortcircuit
	// the function and return 0
	if(arr.length === 0) {
		return 0;
	}
	let left = 0;
	// We use a for loop and increment our right pointer in it
	for(let right = 1; right < arr.length; right++) {
		// We start looping through the array at the left side
		// If the values aren't equal, we move both pointers to the right
		// And we set the value at the left index equal to the value
		// at the right index, collecting all of our unique values
		// at the beginning of the array
		if(arr[left] !== arr[right]) {
			left++;
			arr[left] = arr[right];
		}
		// If the values are equal, then our loop will continue and only
		// increment the right pointer
	}
	// Once we loop through the entire array, the right index will be at the end
	// and the left index will be at the end of the list of unique values
	// that we have collected at the beginning of the array, so we can return
	// left + 1 to get the number of unique numbers
	return left + 1;
}
```