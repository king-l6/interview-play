// src/test.js - 测试代码（ES6语法）
const user = {
  name: '字节前端',
  age: 3,
  sayName: () => console.log(`Name: ${user.name}`)
};

// 箭头函数+解构赋值
const { name, age } = user;
const arr = [1, 2, 3].map(item => item * 2);

console.log(name, age, arr);