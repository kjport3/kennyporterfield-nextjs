---
title: 'Analyzing the Performance of Builtin JavaScript Data Structures'
date: '2021-05-04'
image: '/images/data-structures.jpg'
---

# Objects
_What is a JS Object?_
- Unordered key-value pairs
- Work well when you don't need order
- Work well you when you need fast access/insertion and removal

_Big O of Object Operations_
- Insert - O(1)
- Delete - O(1)
- Search - O(N)
- Read - O(1)

_Big O of Object Methods_
- Object.keys - O(N)
- Object.values - O(N)
- Object.entries - O(N)
- hasOwnProperty - O(1)
  
  
# Arrays
_What is an array?_
- Ordered list of index-value pairs
- Good for when you need order

_Big O of Array Operations_
- Insert - depends...
	- Inserting at the end of an array is simply 1 step
	- Inserting at the beginning of an array of N length takes N steps because you have to shift/re-index each value that comes after the insertion
- Delete - depends...
	- Deleting at the end of an array is simply 1 step
	- Deleting at the beginning of an array of N length takes N steps because you have to shift/re-index each value that comes after the deletion
- Search - O(N)
- Read - O(1)
 
_Big O of Array Methods_
- push - O(1)
- pop - O(1)
- shift - O(N)
- unshift - O(N)
- concat - O(N)
- slice - O(N)
- splice - O(N)
- sort - O(N * <sub>log</sub>N)
- forEach/map/filter/reduce/etc. - O(N)