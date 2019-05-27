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
    complete: false,
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

const getTimeFromMinutes = (mins) => {

  // Convert from number to string
  return mins;
} 


const $tasks = document.getElementById(`tasks`);

$tasks.innerHTML = 
  tasks.map(task => `
    <li>
      <h2>${task.name}</h2>
      <div>${ getTimeFromMinutes(task.start.time) } to ${ getTimeFromMinutes(task.start.time + task.start.duration) } (+1)</div>
    </li>`)
    .join(``);

// tasks.forEach(task => {
//   $tasks.innerHTML += 
//     `<li>
//       <h2>${task.name}</h2>
//       <div>${ getTimeFromMinutes(task.start.time) } to ${ getTimeFromMinutes(task.start.time + task.start.duration) } (+1)</div>
//     </li>`
// });
