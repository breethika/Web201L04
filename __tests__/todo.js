/* eslint-disable no-undef */
const todoList = require("../todo.js");

const { all, markAsComplete, overdue, dueToday, dueLater, add } = todoList();

describe("Todo Test Suite", () => {
  beforeAll(() => {
    let yesterday = new Date(
      new Date().setDate(new Date().getDate() - 1)
    ).toLocaleDateString("en-CA");
    let today = new Date().toLocaleDateString("en-CA");
    add({ title: "s-a", dueDate: yesterday, completed: false });
    add({ title: "p-a", dueDate: yesterday, completed: false });
    add({ title: "s-v", dueDate: yesterday, completed: false });
    add({ title: "f-t", dueDate: today, completed: false });
  });

  test("Testing Add todo Function", () => {
    const todoItemsCount = all.length;
    let tomorrow = new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString("en-CA");
    add({ title: "p-e bill", dueDate: tomorrow, completed: false });
    expect(all.length).toBe(todoItemsCount + 1);
  });

  test("Testing Marking a todo completed", () => {
    markAsComplete(0);
    markAsComplete(1);
    expect(all[0].completed).toBe(true);
    expect(all[1].completed).toBe(true);
  });

  test("Testing retrieval of overdue items", () => {
    expect(overdue().length).toBe(3);
    expect(overdue()[0].title).toBe("s-a");
    expect(overdue()[1].title).toBe("p-r");
    expect(overdue()[2].title).toBe("s-v");
  });

  test("Testing retrieval of due today Items", () => {
    expect(dueToday().length).toBe(1);
    expect(dueToday()[0].title).toBe("File taxes");
  });

  test("Testing retrieval of due later Items", () => {
    expect(dueLater().length).toBe(1);
    expect(dueLater()[0].title).toBe("p-e bill");
  });
});
