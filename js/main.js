/* -----------------------------
              DATA
----------------------------- */
const tasks = [
  {
    name: `Write the task application`,
    start: {
      year: 2019,
      month: 5,
      date: 28,
      time: 660,        // 11:00am
      duration: 1500,   // minutes = 25 hrs
    },
    complete: false,
  },
  {
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
    name: `Learn!`,
    start: {
      year: 2019,
      month: 5,
      date: 27,
      time: null,
      duration: null,   
    },
    complete: false,
  }
];


/* -----------------------------
        DOM REFERENCES
----------------------------- */
const $tasks = document.getElementById(`tasks`);


/* -----------------------------
      OTHER GLOBAL VARS
----------------------------- */
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();
const date = today.getDate();


/* -----------------------------
        HELPER FUNCTIONS
----------------------------- */
const getTimeFromMinutes = (mins, military=true) => {

  // 0   = 00:00
  // 1   = 00:01
  // 60  = 01:00
  // 660 = 11:00
  // 920 = 15:20

  let format = 24;
  let period = ``;

  if (!military) {
    format = 12;
    if (mins > 1440 / 2) {
      period = `pm`;
    }
    else {
      period = `am`;
    }
  }

  let d = Math.floor(mins / 1440);
  let h = Math.floor((mins % 1440) / 60) % format;
  let m = mins % 60; //const m = mins - (h * 60);

  if (d > 0) {
    d = ` (+${d})`;
  }
  else {
    d = ``;
  }

  if (h == 0 && !military) {
    h = `12`;
  }
  else if (h < 10) {
    h = `0${h}`;
  }

  if (m < 10) {
    m = `0${m}`;
  }

  // Convert from number to string
  return `${h}:${m}${period}${d}`;
} 

const formatOneTask = (task) => { 
  // return a String
  return `
  <li class="task${ (task.complete) ? ` done` : `` }">
    <h2>${task.name}</h2>
    <div>${ getTimeFromMinutes(task.start.time, false) } to ${ getTimeFromMinutes(task.start.time + task.start.duration, false) }</div>
  </li>`;
}

const showTaskByComplete = (task) => {
  // return Boolean (true/false)
  return !task.complete
}

const isTaskToday = (task) => {
  // Check if the year, month and date match this task's start properties
  // Return true if so, otherwise false
  return true;
}

const formatDateAsHeading = (date) => {

  return `<h2>Hello!</h2>`;
}


/* -----------------------------
       APPLICATION START
----------------------------- */
const printTodaysTasks = () => {

  $tasks.innerHTML = tasks.filter(isTaskToday).map(formatOneTask).join(``);
};

printTodaysTasks();

