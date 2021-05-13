---
title: 'Algorithm Problem Solving Strategies'
date: '2021-05-05'
image: '/images/algorithms.png'
---

# Intro
_What is an algorithm?_
- A set of steps to accomplish a task

_Why is this important?_
- Almost everything you do in programming involves some kind of algorithm, it's the foundation for being a successful problem solver and developer, common in interviews.


_How do you improve?_
1. Have a plan for solving problems
	- Understand the problem
	- Explore concrete examples
	- Break it down
	- Solve/simplify
	- Look back and refactor

1. Master common problem solving patterns
	- Frequency Counter
	- Multiple Pointers
	- Sliding Window
	- Divide and Conquer
	- Dynamic Programming
	- Greedy Algorithms
	- Backtracking
	- __Many more!__


<br>

# The Plan

Let's say we have an algorithm problem where we are being asked to write a function that returns the character count for each alphanumeric character in a string

##### Understand the problem
- Can I restate the problem in my own words?
	- Write a function that returns the # of each character in a string
- What are the inputs that go into the problem?
	- We are inputting a string
- What are the outputs that should come from the solution to the problem?
	- Should the output include characters that aren't in the string? What type is the output going to be, an object maybe?
- Can the outputs be determined from the inputs? 
- Do I have enough information to solve the problem? (You may not be able to answer this question until you start trying to solve the problem. That's okay, it's still worth considering the question at this early stage.)
- How should I label the important pieces of data that are a part of the problem?
	- It's good to start thinking about this early

##### Explore concrete examples
- Come up with some real example inputs, determine what the real output would be

##### Break it down
- Before you write any code, come up with the actual steps of the problem and write them down as comments in order, it helps to clarify your thought process, and in an interview if you don't wind up finishing the problem you at least have your thought process laid out.
  
##### Solve/Simplify
- If it's a hard problem, ignore the hard part of the problem if you need to and solve a simpler problem. It's common that if you do this you might have some insight or figure something out along the way that will help you solve the more difficult problem.
	- Find the core difficulty
	- Temporarily ignore that difficulty
	- Write a simplified solution
	- Incorporate the difficulty back in

##### Refactor
- Ask the following questions:
	- Can you check the result?
	- Can you get to the result differently?
	- Can you understand it a glance (how readable/intuitive is it)?
	- Can you use the result or method for some other problem?
	- Can you improve upon the performance of your solution?
	- Can you think of other ways to refactor (is your code neat)?
	- How have other people solved this problem?
<br>

##### Character counting problem worked through in `js-algorithms`: 
- strings.js
	- characterCount()
	- characterCountRefactor()
	- isAlphaNumeric()


<br><br>
# Common Problem Solving Patterns
_Common Approaches/Patterns To Solving Problems With Code_
- Frequency Counter
- Multiple Pointers
- Sliding Window
- Divide and Conquer
- Dynamic Programming
- Greedy Algorithms
- Backtracking
- __Many more!__