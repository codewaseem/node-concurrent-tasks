export default class TaskManager {
  #taskList; // Given task list
  #concurrencyMax; // Max concurrent tasks to run

  #currentConcurrency = 0; // current no of concurrent tasks that are running
  #tasksRunningCounter = 0; // counter of the tasks that started
  #totalCompleted = 0; // counter of tasks that are successfully completed

  constructor(taskList = [], concurrencyMax = 4) {
    this.#taskList = taskList;
    this.#concurrencyMax = concurrencyMax;
  }

  updateConcurrencyMax(newConcurrencyMax) {
    this.#concurrencyMax = newConcurrencyMax;
  }

  async start() {
    console.log("[init] Concurrency Algo Testing...");
    console.log("[init] Tasks to process: ", this.#taskList.length);
    console.log("[init] Task list: " + this.#taskList);
    console.log("[init] Maximum Concurrency: ", this.#concurrencyMax, "\n");

    await this.#processTasks();
  }

  async #processTasks() {
    // Kick off the initial tasks limitting to current concurrency maximum.
    await Promise.all(
      this.#taskList
        .slice(this.#tasksRunningCounter, this.#concurrencyMax)
        .map((task) => {
          return this.#processTask(task);
        })
    );
  }

  async #processTask(taskName) {
    // track progress
    this.#currentConcurrency++;
    this.#tasksRunningCounter++;

    console.log(
      `Concurrency ${this.#currentConcurrency} of ${this.#concurrencyMax}`
    );
    console.log(
      `Task count ${this.#tasksRunningCounter} of ${this.#taskList.length}`
    );

    // do the task work
    await this.#doTask(taskName);

    // a task was complted
    this.#totalCompleted++;

    // decrease counter to allow for next concurrent task
    this.#currentConcurrency--;

    // if this was the last task completed, show success message and return
    if (this.#allTaskCompleted()) {
      console.log("All tasks are successfully completed.");
      return;
    }
    // else process next tasks
    else {
      this.#processNextTasks();
    }
  }

  #allTaskCompleted() {
    return this.#totalCompleted == this.#taskList.length;
  }

  async #processNextTasks() {
    // fill the concurrency with the remaining tasks
    while (this.#concurrencyNotFull() && this.tasksAreRemaining()) {
      this.#processTask(this.#taskList[this.#tasksRunningCounter]);
    }
  }

  #concurrencyNotFull() {
    return this.#currentConcurrency < this.#concurrencyMax;
  }

  tasksAreRemaining() {
    return this.#tasksRunningCounter < this.#taskList.length;
  }

  #doTask(taskName) {
    console.log("\x1b[36m", "[TASK] STARTED: " + taskName, "\x1b[0m");
    const begin = Date.now();
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        const end = Date.now();
        const timeSpent = end - begin + "ms";
        console.log(
          "\x1b[36m",
          "[TASK] FINISHED: " + taskName + " in " + timeSpent,
          "\x1b[0m"
        );
        resolve(true);
      }, Math.random() * 200);
    });
  }
}
