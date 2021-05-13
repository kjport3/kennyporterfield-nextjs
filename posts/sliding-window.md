---
title: 'Sliding Windows Algorithm Strategy'
date: '2021-05-08'
image: '/images/window.jpg'
---

### Sliding Window
This pattern involves creating a window which can either be an array or number from one position to another. Depending on a certain condition, the window either increases or closes (and a new window is created). This is very useful for keeping track of a subset of data in an array or string.

Let's take a look at a problem where this pattern can be useful. 

*Max Subarray Sum*
Write a function called maxSubarraySum which accepts an array of integers and a number called **n**. The function should calculate the maximum sum of **n** consecutive elements in the array.
```js
maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null
```
*"Naive" O(N<sup>2</sup>) Solution:*
```js
function maxSubarraySum(arr, num) {
	if (num > arr.length) return null;
	var max = -Infinity;
	for (let i = 0; i < arr.length - num + 1; i++) {
		let temp = 0;
		for (let j = 0; j < num; j++) {
			temp += arr[i + j];
		}
		if (temp > max) {
			max = temp;
		}
	}
	return max;
}
```
Let's walk through what we have here. We start off by catching the edge case of the number being longer than the length of the array and return `null` if that is the case. We start `max = -Infinity` to account for an array of all negative numbers, because then the sum would still be negative, so starting it at 0 wouldn't really work. 

The condition in our first loop determines at what index to stop the addition. We then have a loop nested in that that adds the values in the array from `i`, the index we're starting at, up to `j` which is `num`, and we save the result in a variable called `temp`. If the sum of values is greater than our current `max`, then we replace `max` with `temp`.

This solution will get us the answer we want, but it uses nested loops, resulting in O(N<sup>2</sup>), and is not an efficient algorithm. 

Now is when we cue the Bob the Builder theme song and ask "Can we fix it?" Well, really improve rather than fix because this solution does work but it's not the best. Anyways, "YES WE CAN!"
<br>
### Sliding Windows Refactor
*O(N) Solution:*
```js
function maxSubarraySum(arr, num) {
	let maxSum = 0;
	let tempSum = 0;
	if (arr.length < num) return null;
	for (let i = 0; i < num; i++) {
		maxSum += arr[i];
	}
	tempSum = maxSum;
	for (let i = num; i < arr.length; i++) {
		tempSum = tempSum - arr[i - num] + arr[i];
		maxSum = Math.max(maxSum, tempSum);
	}
	return maxSum;
}
```
Let's examine what we're doing here. In the first solution we had a nested loop that added all of the numbers together each time to get the sum of that range of numbers. Instead of doing that, what we do with a sliding windows approach is we have an initial for loop that adds up the numbers in our "window", starting from the beginning of the array up through `num` indexes. Then we set that to our `tempSum` variable. 

In order to find out what the sum of numbers is in the next window, we don't need to add each value together like we did in the previous solution. We just need move the window over one index, and subtract the value we just moved out of the window on the left side, while adding the value we just moved into the window on the right side. This is what we're doing in our second loop. 

We store the result of that operation into our `tempSum` variable, then replace `maxSum` with `tempSum` if `tempSum` is greater than `maxSum`, and once we're done looping through the array, we `return maxSum`.