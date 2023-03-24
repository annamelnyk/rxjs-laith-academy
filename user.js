const { Observable } = require("rxjs");
const { map, pluck } = require("rxjs/operators");

const users = {
  data: [
    {
      status: "inactive",
      age: 11,
    },
    {
      status: "active",
      age: 19,
    },
    {
      status: "inactive",
      age: 17,
    },
    {
      status: "active",
      age: 13,
    },
    {
      status: "active",
      age: 12,
    },
    {
      status: "inactive",
      age: 53,
    },
    {
      status: "active",
      age: 23,
    },
  ],
};

const users2 = {
  data: [
    ...users.data,
    {
      status: "active",
      age: 46,
    },
  ],
};

const observable = new Observable((subscriber) => {
  subscriber.next(users2);
  subscriber.next(users);
}).pipe(
  pluck('data'),
  // map((value) => {
  //   console.log("1. Got data from observable ", value);
  //   return value.data;
  // }),
  map((value) => {
    console.log("2. Got data from first operator ", value);
    console.log(value);

    return value.filter((user) => user.status === "active");
  }),
  map((value) => {
    console.log("3. Got list of active users from second operator ", value);

    return Math.round(
      value.reduce((age, user) => age + user.age, 0) / value.length
    );
  }),
  map((value) => {
    console.log("4. Got data(average age) from third operator ", value);

    if (value < 18) {
      throw new Error("Oops... Average age must be more than 18");
    }

    return value;
  })
);

const observer = {
  next: (value) => {
    console.log("Observer got a value of ", value);
  },

  error: (err) => {
    console.log("Observer got an error ", err);
  },

  complete: () => {
    console.log("Observer has completed notification");
  },
};

console.log("Before subscribe... ");

observable.subscribe(observer);

console.log("After subscribe... ");
