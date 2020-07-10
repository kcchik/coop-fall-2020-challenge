class EventSourcer {
  constructor() {
    this.value = 0;
    this.index = 0;
    this.history = [];
  }

  add(num) {
    this.value += num;
    this.index++;
    this.history.splice(this.index, 0, num);
  }

  subtract(num) {
    this.value -= num;
    this.index++;
    this.history.splice(this.index, 0, -num);
  }

  undo() {
    this.bulk_undo(1);
  }

  redo() {
    this.bulk_redo(1);
  }

  bulk_undo(num) {
    if (this.index >= num) {
      this.index -= num;
      const actions = this.history.slice(this.index, this.index + num);
      for (const action of actions) {
        this.value -= action;
      }
    }
  }

  bulk_redo(num) {
    if (this.index > this.history.length - num) {
      num = this.history.length - this.index;
    }
    const actions = this.history.slice(this.index - 1, this.index - 1 + num);
    this.index += num;
    for (const action of actions) {
      this.value += action;
    }
  }
}

// ----- Do not modify anything below this line (needed for test suite) ------
module.exports = EventSourcer;
