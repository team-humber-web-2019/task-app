const tasks = [
  {
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
//// Time 
const getTimeFromMinutes = (mins, military = true) => {
  // 0 = 0:00
  // 1 = 0:01
  // 60 = 1:00
  // 660 =11:00
  let format = 24;
  let period = ``;

  if (!military) {
    format = 12;

  if (mins > 1440 / 2) {
    period = `pm`
  }
  else {
    period = `am`
  }

}
  let d = Math.floor(mins/ 1440);
  let h = Math.floor((mins % 1440) / 60) % format;
  let m = mins % 60;

  if (d > 0) {
    d = `(+${d})`
  }
  else {
    d = ``;
  }
  if (h == 0 && !military) {
    h = '12';
  }
  else if (h < 10) {
    h = `0${h}`
  }

  if (m < 10) {
    m = `0${m}`
  }
  // Convert from number to string
  return `${h}:${m}${period}${d}`;
} 
////////

const $tasks = document.getElementById(`tasks`);

$tasks.innerHTML = 
  tasks.map(task => `
    <li class="tasks ${ (task.complete) ? `done`:``}">
      <h2>${task.name}</h2>
      <div>${ getTimeFromMinutes(task.start.time, false) } to ${ getTimeFromMinutes(task.start.time + task.start.duration, false)}</div>
    </li>`)
    .join(``);

// tasks.forEach(task => {
//   $tasks.innerHTML += 
//     `<li>
//       <h2>${task.name}</h2>
//       <div>${ getTimeFromMinutes(task.start.time) } to ${ getTimeFromMinutes(task.start.time + task.start.duration) } (+1)</div>
//     </li>`
// });
