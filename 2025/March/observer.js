var Observer = /** @class */ (function () {
    function Observer() {
        this.observers = new Set();
    }
    Observer.prototype.subscribe = function (observer) {
        this.observers.add(observer);
    };
    Observer.prototype.unsubscribe = function (observer) {
        this.observers.delete(observer);
    };
    Observer.prototype.notify = function (data) {
        this.observers.forEach(function (observer) { return observer(data); });
    };
    return Observer;
}());
var Counter = /** @class */ (function () {
    function Counter() {
        this.count = 0;
        this.observer = new Observer();
    }
    Counter.prototype.subscribe = function (callback) {
        var _this = this;
        this.observer.subscribe(callback);
        return function () { return _this.observer.unsubscribe(callback); };
    };
    Counter.prototype.set = function (count) {
        this.count = count;
        this.observer.notify(this.count);
    };
    Counter.prototype.increment = function () {
        this.set(this.count + 1);
    };
    return Counter;
}());
var counter = new Counter();
var unsubscribe1 = counter.subscribe(function (data) {
    console.log("Observer 1:", data);
});
var unsubscribe2 = counter.subscribe(function (data) {
    console.log("Observer 2:", data);
});
var unsubscribe3 = counter.subscribe(function (data) {
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
