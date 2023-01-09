import TaskManager from "./TaskManager.mjs";

const numberOfTasks = 500;
const concurrencyMax = 4;

const taskList = [...Array(numberOfTasks)].map(() =>
  [...Array(~~(Math.random() * 10 + 3))]
    .map(() => String.fromCharCode(Math.random() * (123 - 97) + 97))
    .join("")
);

// init task manager with taskList and initial concurrency max
const taskManager = new TaskManager(taskList, concurrencyMax);

// start processing tasks
taskManager.start();

// to update concurrency max, call updateConcurrencyMax method
setTimeout(() => {
  console.log("set max concurrency to 8");
  taskManager.updateConcurrencyMax(8);
}, 3000);

setTimeout(() => {
  console.log("set max concurrency to 1");
  taskManager.updateConcurrencyMax(1);
}, 5000);

setTimeout(() => {
  console.log("set max concurrency to 50 ");
  taskManager.updateConcurrencyMax(50);
}, 10000);
