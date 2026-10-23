// keytype content. To contribute: add a snippet below, run it in a real compiler/interpreter first.
// Comments inside the code are part of what the learner types, so keep them short and explanatory.
window.KEYTYPE = {
langs: [
  {k:'javascript',n:'JavaScript',x:'js'},{k:'python',n:'Python',x:'py'},{k:'c',n:'C',x:'c'},
  {k:'cpp',n:'C++',x:'cpp'},{k:'csharp',n:'C#',x:'cs'},{k:'java',n:'Java',x:'java'},{k:'go',n:'Go',x:'go'}
],
// Levels 1-9 are shared across languages; level 10 is each language's signature feature (see sig).
levels: [
  {t:'Hello World & variables',d:'easy',e:'Print output, then store a value in a named variable. Some languages need a declared type, others infer it.'},
  {t:'Data types & arithmetic',d:'easy',e:'Numbers, text and true/false are the basic building blocks; arithmetic operators combine numeric values.'},
  {t:'Conditionals',d:'easy',e:'if/else runs exactly one branch depending on whether a condition is true.'},
  {t:'Loops',d:'medium',e:'A loop repeats a block of code. A for loop has a start, a stopping condition and a step.'},
  {t:'Functions',d:'medium',e:'A function packages reusable logic; return sends a result back to the caller.'},
  {t:'Arrays & lists',d:'medium',e:'Ordered collections you can index, grow and measure. Indexing starts at 0.'},
  {t:'Strings',d:'medium',e:'Text values can be joined, formatted and transformed with built-in operations.'},
  {t:'Classes & structs',d:'hard',e:'Group related data (and behavior) into one custom type, then create objects from it.'},
  {t:'Error handling',d:'hard',e:'Programs fail. Handle it on purpose: catch exceptions, or check returned error codes/values.'}
],
sig: {
  javascript:['Closures','A closure is a function that remembers variables from where it was created, even after the outer function returns.'],
  python:['Decorators','A decorator wraps a function to add behavior (logging, timing) without editing its source.'],
  c:['Pointers','& gets a variable\'s memory address; * reads or writes the value at an address. This is how C passes data by reference.'],
  cpp:['Templates','A template lets one function work with any type; the compiler generates a version per type used.'],
  csharp:['LINQ','LINQ queries collections declaratively: say what you want (evens) instead of writing the loop.'],
  java:['Interfaces','An interface is a contract of method signatures; any class that implements it must provide the bodies.'],
  go:['Goroutines & channels','go runs a function concurrently; a channel passes values between goroutines, and receiving blocks until one arrives.']
},
course: {
javascript: [
String.raw`// print text to the console
console.log("Hello, World!");
// let makes a changeable variable
let age = 21;`,
String.raw`// number, string, boolean
const price = 19.5;
const name = "Sam";
const ok = true;
// arithmetic
const total = price * 3;`,
String.raw`if (age >= 18) {
  // runs when the condition is true
  console.log("adult");
} else {
  console.log("minor");
}`,
String.raw`// repeat 5 times
for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
String.raw`// a reusable block of code
function square(x) {
  // return sends a value back
  return x * x;
}`,
String.raw`// ordered list of values
const nums = [4, 8, 15];
nums.push(42); // add to the end
console.log(nums.length); // size`,
String.raw`const first = "Ada";
// + joins strings together
const full = first + " Lovelace";
console.log(full.toUpperCase());`,
String.raw`// blueprint for objects
class Animal {
  constructor(name) {
    this.name = name; // this = the new object
  }
  speak() {
    return this.name + " makes a sound";
  }
}`,
String.raw`try {
  // JSON.parse throws on bad input
  JSON.parse("{bad");
} catch (err) {
  // runs only if an error was thrown
  console.log(err.message);
}`,
String.raw`// the inner function remembers count
function makeCounter() {
  let count = 0;
  return () => ++count;
}
const next = makeCounter();`
],
python: [
String.raw`# print text
print("Hello, World!")
# no type needed for variables
age = 21`,
String.raw`price = 19.5  # float
name = "Sam"  # string
ok = True  # boolean
# arithmetic
total = price * 3`,
String.raw`if age >= 18:
    # indentation marks the block
    print("adult")
else:
    print("minor")`,
String.raw`# range(5) gives 0..4
for i in range(5):
    print(i)`,
String.raw`# def defines a function
def square(x):
    # return sends a value back
    return x * x`,
String.raw`# ordered, changeable list
nums = [4, 8, 15]
nums.append(42)  # add to the end
print(len(nums))  # size`,
String.raw`first = "Ada"
# f-string embeds variables
full = f"{first} Lovelace"
print(full.upper())`,
String.raw`# blueprint for objects
class Animal:
    def __init__(self, name):
        self.name = name  # self = this object
    def speak(self):
        return self.name + " makes a sound"`,
String.raw`try:
    # int() fails on bad input
    int("abc")
except ValueError as err:
    # runs only on that error
    print(err)`,
String.raw`# wraps a function to add behavior
def logged(func):
    def wrapper(*args):
        print("calling", func.__name__)
        return func(*args)
    return wrapper`
],
c: [
String.raw`#include <stdio.h>

int main() {
    // printf prints text
    printf("Hello, World!\n");
    int age = 21; // C needs a type
    return 0;
}`,
String.raw`int count = 3;       // whole number
float price = 19.5f; // decimal
char grade = 'A';    // one character
// arithmetic
float total = price * count;`,
String.raw`if (age >= 18) {
    // runs when the condition is true
    printf("adult\n");
} else {
    printf("minor\n");
}`,
String.raw`// init; condition; step
for (int i = 0; i < 5; i++) {
    printf("%d\n", i);
}`,
String.raw`// the return type comes first
int square(int x) {
    return x * x;
}`,
String.raw`// fixed-size array
int nums[3] = {4, 8, 15};
// the sizeof trick gives the length
int n = sizeof(nums) / sizeof(nums[0]);`,
String.raw`// a string is a char array ending in \0
char name[] = "Ada";
int len = strlen(name); // needs string.h`,
String.raw`// struct groups related fields
struct Point {
    int x;
    int y;
};
struct Point p = {3, 4};`,
String.raw`// C has no exceptions: return a code
int divide(int a, int b, int *out) {
    if (b == 0) return -1; // failure
    *out = a / b;
    return 0; // success
}`,
String.raw`int value = 42;
// & takes the address
int *p = &value;
// * reads or writes through it
*p = 100;`
],
cpp: [
String.raw`#include <iostream>
using namespace std;

int main() {
    // cout prints text
    cout << "Hello, World!" << endl;
    int age = 21;
    return 0;
}`,
String.raw`int count = 3;
double price = 19.5;
string name = "Sam"; // a real string type
bool ok = true;      // a real bool type
double total = price * count;`,
String.raw`if (age >= 18) {
    // runs when the condition is true
    cout << "adult" << endl;
} else {
    cout << "minor" << endl;
}`,
String.raw`// init; condition; step
for (int i = 0; i < 5; i++) {
    cout << i << endl;
}`,
String.raw`// the return type comes first
int square(int x) {
    return x * x;
}`,
String.raw`#include <vector>
// vector is a resizable array
vector<int> nums = {4, 8, 15};
nums.push_back(42); // add to the end
int n = nums.size();`,
String.raw`string first = "Ada";
// + joins std::string values
string full = first + " Lovelace";
cout << full.size() << endl;`,
String.raw`// class bundles data and behavior
class Animal {
public:
    string name;
    Animal(string n) : name(n) {} // constructor
    string speak() { return name + " makes a sound"; }
};`,
String.raw`#include <stdexcept>
int divide(int a, int b) {
    // throw raises an exception
    if (b == 0) throw invalid_argument("div by 0");
    return a / b;
}`,
String.raw`// one function for any type
template <typename T>
T maxOf(T a, T b) {
    return (a > b) ? a : b;
}`
],
csharp: [
String.raw`// prints a line of text
Console.WriteLine("Hello, World!");
// var infers the type
var age = 21;`,
String.raw`int count = 3;
double price = 19.5;
string name = "Sam";
bool ok = true;
// arithmetic
double total = price * count;`,
String.raw`if (age >= 18) {
    // runs when the condition is true
    Console.WriteLine("adult");
} else {
    Console.WriteLine("minor");
}`,
String.raw`// init; condition; step
for (int i = 0; i < 5; i++) {
    Console.WriteLine(i);
}`,
String.raw`// the return type comes first
int Square(int x) {
    return x * x;
}`,
String.raw`// List<T> is a resizable typed list
var nums = new List<int> { 4, 8, 15 };
nums.Add(42); // add to the end
int n = nums.Count;`,
String.raw`string first = "Ada";
// $"" embeds variables
string full = $"{first} Lovelace";
Console.WriteLine(full.ToUpper());`,
String.raw`// class with an auto property
class Animal {
    public string Name { get; set; }
    public Animal(string name) { Name = name; }
    public string Speak() => Name + " makes a sound";
}`,
String.raw`try {
    // Parse throws on bad input
    int.Parse("abc");
} catch (FormatException err) {
    // runs only on that error
    Console.WriteLine(err.Message);
}`,
String.raw`var nums = new List<int> { 1, 2, 3, 4 };
// query a list declaratively
var evens = nums.Where(n => n % 2 == 0).ToList();`
],
java: [
String.raw`public class Main {
    public static void main(String[] args) {
        // prints a line of text
        System.out.println("Hello, World!");
        int age = 21; // Java needs a type
    }
}`,
String.raw`int count = 3;
double price = 19.5;
String name = "Sam";
boolean ok = true;
// arithmetic
double total = price * count;`,
String.raw`if (age >= 18) {
    // runs when the condition is true
    System.out.println("adult");
} else {
    System.out.println("minor");
}`,
String.raw`// init; condition; step
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}`,
String.raw`// static: belongs to the class
static int square(int x) {
    return x * x;
}`,
String.raw`// ArrayList is a resizable list
ArrayList<Integer> nums = new ArrayList<>();
nums.add(4); // add to the end
int n = nums.size();`,
String.raw`String first = "Ada";
// format fills %s placeholders
String full = String.format("%s Lovelace", first);
System.out.println(full.toUpperCase());`,
String.raw`// class holds fields and methods
class Animal {
    String name;
    Animal(String name) { this.name = name; }
    String speak() { return name + " makes a sound"; }
}`,
String.raw`try {
    // parseInt throws on bad input
    Integer.parseInt("abc");
} catch (NumberFormatException err) {
    // runs only on that error
    System.out.println(err.getMessage());
}`,
String.raw`// a contract without bodies
interface Shape {
    double area();
}
class Square implements Shape {
    double s = 2;
    public double area() { return s * s; }
}`
],
go: [
String.raw`package main

import "fmt"

func main() {
    // Println prints a line
    fmt.Println("Hello, World!")
    age := 21 // := declares and infers
    fmt.Println(age)
}`,
String.raw`count := 3
price := 19.5
name := "Sam"
ok := true
// arithmetic
total := price * float64(count)`,
String.raw`if age >= 18 {
    // no parentheses needed
    fmt.Println("adult")
} else {
    fmt.Println("minor")
}`,
String.raw`// for is Go's only loop
for i := 0; i < 5; i++ {
    fmt.Println(i)
}`,
String.raw`// the return type comes after params
func square(x int) int {
    return x * x
}`,
String.raw`// a slice is a resizable array view
nums := []int{4, 8, 15}
nums = append(nums, 42) // add to the end
n := len(nums)`,
String.raw`first := "Ada"
// Sprintf builds a string
full := fmt.Sprintf("%s Lovelace", first)
fmt.Println(full)`,
String.raw`// struct groups fields
type Animal struct {
    Name string
}
// a receiver attaches a method
func (a Animal) Speak() string {
    return a.Name + " makes a sound"
}`,
String.raw`// Go returns errors as values
func divide(a, b int) (int, error) {
    if b == 0 {
        return 0, fmt.Errorf("div by 0")
    }
    return a / b, nil
}`,
String.raw`// go runs it concurrently
ch := make(chan int)
go func() { ch <- 42 }()
// receiving blocks until a value arrives
result := <-ch`
]
},
dsa: [
{l:'javascript',d:'easy',t:'FizzBuzz',e:'Print 1..N, replacing multiples of 3 with Fizz, of 5 with Buzz, of both with FizzBuzz. Check the combined case first.',m:'O(n)',c:String.raw`for (let i = 1; i <= 15; i++) {
  // % gives the remainder
  if (i % 15 === 0) console.log("FizzBuzz");
  else if (i % 3 === 0) console.log("Fizz");
  else if (i % 5 === 0) console.log("Buzz");
  else console.log(i);
}`},
{l:'python',d:'easy',t:'Find the maximum',e:'Keep the largest value seen so far while scanning once; no sorting needed.',m:'O(n) time, O(1) space',c:String.raw`def find_max(nums):
    best = nums[0]  # assume the first is largest
    for n in nums:
        if n > best:
            best = n
    return best`},
{l:'c',d:'easy',t:'Reverse a string',e:'Swap characters from both ends moving inward, reversing in place with no extra buffer.',m:'O(n) time, O(1) space',c:String.raw`void reverse(char *s, int n) {
    // swap from both ends inward
    for (int i = 0, j = n - 1; i < j; i++, j--) {
        char t = s[i]; s[i] = s[j]; s[j] = t;
    }
}`},
{l:'python',d:'medium',t:'Binary search',e:'On a sorted array, compare the middle element and discard the half that cannot contain the target.',m:'O(log n), needs sorted input',c:String.raw`def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        # drop the half without the target
        if arr[mid] == target: return mid
        if arr[mid] < target: lo = mid + 1
        else: hi = mid - 1
    return -1`},
{l:'java',d:'medium',t:'Two Sum',e:'A hash map answers "have I seen the number I need?" in O(1), so one pass is enough.',m:'O(n) time, O(n) space',c:String.raw`int[] twoSum(int[] a, int t) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int i = 0; i < a.length; i++) {
        // map lookup is O(1)
        if (seen.containsKey(t - a[i])) return new int[]{seen.get(t - a[i]), i};
        seen.put(a[i], i);
    }
    return new int[]{};
}`},
{l:'cpp',d:'medium',t:'Bubble sort',e:'Repeatedly swap adjacent out-of-order pairs so the largest value bubbles to the end each pass.',m:'O(n²) time',c:String.raw`void bubbleSort(vector<int>& a) {
    for (int i = 0; i < a.size(); i++)
        for (int j = 0; j + 1 < a.size() - i; j++)
            // swap neighbours that are out of order
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
}`},
{l:'c',d:'medium',t:'Reverse a linked list',e:'Walk the list once, flipping each next pointer backward while remembering the previous node.',m:'O(n) time, O(1) space',c:String.raw`struct Node { int v; struct Node *next; };

struct Node *reverse(struct Node *head) {
    struct Node *prev = NULL;
    while (head) {
        struct Node *next = head->next;
        head->next = prev; // flip the pointer
        prev = head;
        head = next;
    }
    return prev;
}`},
{l:'python',d:'hard',t:'Breadth-first search',e:'Explore a graph level by level with a queue; finds shortest paths in unweighted graphs.',m:'O(V+E)',c:String.raw`from collections import deque

def bfs(graph, start):
    seen = {start}
    queue = deque([start])
    while queue:
        node = queue.popleft()  # FIFO = level by level
        for nxt in graph[node]:
            if nxt not in seen:
                seen.add(nxt)
                queue.append(nxt)
    return seen`},
{l:'javascript',d:'hard',t:"Kadane's max subarray",e:'At each index, either extend the running sum or start fresh; track the best seen.',m:'O(n) time, O(1) space',c:String.raw`function maxSubArray(nums) {
  let best = nums[0], cur = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // extend the run or start fresh here
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`},
{l:'csharp',d:'hard',t:'Fibonacci with memoization',e:'Cache each result so every Fibonacci value is computed once instead of exponentially often.',m:'O(2^n) to O(n)',c:String.raw`Dictionary<int, long> memo = new();

long Fib(int n) {
    if (n <= 1) return n;
    // reuse cached results
    if (memo.ContainsKey(n)) return memo[n];
    return memo[n] = Fib(n - 1) + Fib(n - 2);
}`}
]
};
