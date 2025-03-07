type Observe = (data: any) => void;

class Observer {
  observers: Set<Observe>;

  constructor() {
    this.observers = new Set();
  }

  subscribe(observer: Observe) {
    this.observers.add(observer);
  }

  unsubscribe(observer: Observe) {
    this.observers.delete(observer);
  }

  notify(data: any) {
    this.observers.forEach((observer) => observer(data));
  }
}

class Counter {
  private count = 0;

  private observer = new Observer();

  subscribe(callback: Observe) {
    this.observer.subscribe(callback);
    return () => this.observer.unsubscribe(callback);
  }

  set(count: number) {
    this.count = count;
    this.observer.notify(this.count);
  }

  increment() {
    this.set(this.count + 1);
  }
}

const counter = new Counter();

const unsubscribe1 = counter.subscribe((data) => {
  console.log("Observer 1:", data);
});

const unsubscribe2 = counter.subscribe((data) => {
  console.log("Observer 2:", data);
});

const unsubscribe3 = counter.subscribe((data) => {
  console.log("Observer 3:", data);
});

console.log("Incrementing count...");
counter.increment();

console.log("Setting user...");
counter.set(3);

console.log("Unsubscribing observer 1...");
unsubscribe1();

console.log("Incrementing count again...");
counter.increment();
