// All tasks, raw, unsorted, unstructured
// In the future: We will create an API to return only the data we want, and have it organized

const allTasks = [
  {
    id: 123,
    name: `Write the task application`,
    start: {
      year: 2019,
      month: 5,
      date: 27,
      time: 660,        // 11:00am
      duration: 1500,   // minutes = 25 hrs
    },
    complete: false,
  },
  {
    id: 456,
    name: `Take lunch`,
    start: {
      year: 2019,
      month: 5,
      date: 27,
      time: 744,
      duration: 55,   
    },
    complete: true,
  },
  {
    id: 789,
    name: `Learn!`,
    start: {
      year: 2019,
      month: 5,
      date: 27,
      time: null,
      duration: null,   
    },
    complete: false,
  },
  {
    id: 568,
    name: `Filter by date`,
    start: {
      year: 2019,
      month: 6,
      date: 10,
      time: 690,
      duration: 15,   
    },
    complete: false,
  }
];