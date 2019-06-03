const tasks = [
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
  }
];

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


const $tasks = document.getElementById(`tasks`);


// WRAP THIS IN A FUNCTION: getTasksAsHtml, return a String of HTML for all tasks
$tasks.innerHTML = 
  tasks.map(task => `
    <li class="task${ (task.complete) ? ` done` : `` }" data-taskid="${task.id}">
      <h2>${task.name}</h2>
      <div>${ getTimeFromMinutes(task.start.time, false) } to ${ getTimeFromMinutes(task.start.time + task.start.duration, false) }</div>
    </li>`)
    .join(``);



$tasks.addEventListener(`click`, (event) => {

  //console.log(event.target);
  
  // Find the "closest" element that matches .task (css selector)
  let task = event.target.closest(`.task`);

  // If none were found, then get the heck outta here!
  if (!task) return;

  // If we got this far, we must have found a `.task`, now let's dive into it...
  console.log(task.dataset.taskid);

  // Change status to "done" or not "done"
  // FIND THE ELEMENT IN THE "tasks" ARRAY THAT MATCHES THIS ID
  // CHANGE ITS "complete" PROPERTY TO THE OPPOSITE OF WHAT ITS CURRENTLY SET TO
  // THEN REPLACE THE CURRENT HTML WITH UPDATED HTML


});




