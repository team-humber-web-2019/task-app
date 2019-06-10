// tasks.js loads up here.



// Receives a Number of minutes, optionally takes a Boolean to set military time vs am/pm
// Returns a formatted String in either military or AM/PM

// PURE FUNCTION: Is immutable, it always returns the same value for the same input
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

// This is a PURE FUNCTION
const getOneTaskAsHtmlString = (task) => {
  // Returns a string that will be used to create some new HTML
  return `<li class="task${ (task.complete) ? ` done` : `` }" data-taskid="${task.id}">
    <h2>${task.name}</h2>
    <div>${ getTimeFromMinutes(task.start.time, false) } to ${ getTimeFromMinutes(task.start.time + task.start.duration, false) }</div>
  </li>`;
}

// This is a PURE FUNCTION
const getSomeTasksAsHtmlString = (someTasks) => {
  // For each "tasks" object, take the proprties it holds, map it to a new Array of Strings using our formatting function
  
  // Create a new array HTML Strings
  const allTasksAsHTML = someTasks.map(getOneTaskAsHtmlString);

  // Takes the Array and joins it as a string
  return allTasksAsHTML.join(``);
}

const showLoading = (show = true) => {
  const $modal = document.getElementById(`modal`);

  if (show == true) {
    $modal.classList.add(`show`)
  } else {
    $modal.classList.remove(`show`)
  }
}


const getOneDayAsHtmlString = (oneDay) => {
  return `
  <li class="day ${oneDay.classes}">
    <h1 class="date">${oneDay.str}</h1>
    <ul class="tasks">${ getSomeTasksAsHtmlString(oneDay.tasks) }</ul>
  </li>`;
}

const filterTasksByDate = (aTask, i, fullTaskList) => {
  const date = fullTaskList[i].date;
  // return true if it matches 
  if (
    (aTask.start.year == date.y) && 
    (aTask.start.month == date.m) && 
    (aTask.start.date == date.d)
  ) {
    return true;
  }
  // return false otherwise
  return false;
}



// INITIALIZATION OF THE DOCUMENT
window.addEventListener('load', event => {

  const daysToDisplay = 5;
  const $cal = document.getElementById(`cal`);

  const days = [
    {str: `Sun, June 09, 2019`, date:{y:2019,m:6,d:9 }, classes: `past`,  tasks: []},
    {str: `Mon, June 10, 2019`, date:{y:2019,m:6,d:10}, classes: `today`, tasks: []},
    {str: `Tue, June 11, 2019`, date:{y:2019,m:6,d:11}, classes: ``,      tasks: []},
    {str: `Wed, June 12, 2019`, date:{y:2019,m:6,d:12}, classes: ``,      tasks: []},
    {str: `Thu, June 13, 2019`, date:{y:2019,m:6,d:13}, classes: ``,      tasks: []},
  ];

  days.forEach(d => {
    allTasks.filter( filterTasksByDate )
  })
  
  $cal.innerHTML = days.map(getOneDayAsHtmlString).join(``);



  // for(let i = 0; i < daysToDisplay; i++) {
  //   let typeOfDay = ``;
  //   if (i == 0) {
  //     typeOfDay = `past`
  //   } else if (i == 1) {
  //     typeOfDay = `today`
  //   }
  //   $cal.innerHTML += `<li class="day ${typeOfDay}">
  //     <h1 class="date">Monday, May 27, 2019</h1>
  //     <ul class="tasks" id="tasks"></ul>
  //   </li>`;
  // }

  /*
  <li class="day past"></li>
  <li class="day today">
    <h1 class="date">Monday, May 27, 2019</h1>
    <ul class="tasks" id="tasks"></ul>
  </li>
  <li class="day"></li>
  <li class="day"></li>
  <li class="day"></li>
  */







  // const $tasks = document.getElementById(`tasks`);

  // // Add the loading screen when you make a request
  // showLoading();

  // $tasks.addEventListener(`click`, (event) => {

  //   //console.log(event.target);
    
  //   // Find the "closest" element that matches .task (css selector)
  //   let $task = event.target.closest(`.task`);

  //   // If none were found, then get the heck outta here!
  //   if (!$task) return;

  //   // If we got this far, we must have found a `.task`, now let's dive into it...
  //   const taskid = $task.dataset.taskid;

  //   // Change status to "done" or not "done"
  //   // FIND THE ELEMENT IN THE "tasks" ARRAY THAT MATCHES THIS ID
  //   // CHANGE ITS "complete" PROPERTY TO THE OPPOSITE OF WHAT ITS CURRENTLY SET TO
  //   // THEN REPLACE THE CURRENT HTML WITH UPDATED HTML

  //   // Search for the first element whose id matches the one we're looking for
  //   let taskObj = tasks.find( t => t.id == taskid );

  //   // If no matching task was found
  //   if (!taskObj) return;

  //   // Set "compelete" to its inverse
  //   taskObj.complete = !taskObj.complete;

  //   // Reprint the list of tasks
  //   $tasks.innerHTML = getAllTasksAsHtmlString();

  // });

  // // Simulate data loading, delay 3 seconds
  // setTimeout(() => {
  //   $tasks.innerHTML = getSomeTasksAsHtmlString(tasks);
  //   showLoading(false);
  // }, 3000);
  
});




