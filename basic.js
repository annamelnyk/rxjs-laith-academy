const { Observable } = require("rxjs");

const observable = new Observable((subscriber) => {
  subscriber.next(10);
  subscriber.next(11);
  subscriber.next(12);
  setTimeout(() => {
    subscriber.next(13);
    subscriber.complete();
  }, 1000)

});

const observer = {
  next: (value) => {
    console.log("Observer got a value of " + value);
  },

  error: (err) => {
    console.log("Observer got an error " + err);
  },

  complete: () => {
    console.log("Observer has completed notification");
  },
};

console.log('Before subscribe... ');

observable.subscribe(observer);

console.log('After subscribe... ');
