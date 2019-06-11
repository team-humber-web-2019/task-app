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

/*
// This is a PURE FUNCTION
const getSomeTasksAsHtmlString = (someTasks) => {
  // For each "tasks" object, take the proprties it holds, map it to a new Array of Strings using our formatting function
  
  // Create a new array HTML Strings
  const allTasksAsHTML = someTasks.map(getOneTaskAsHtmlString);

  // Takes the Array and joins it as a string
  return allTasksAsHTML.join(``);
}*/

const showLoading = (show = true) => {
  const $modal = document.getElementById(`modal`);

  if (show == true) {
    $modal.classList.add(`show`)
  } else {
    $modal.classList.remove(`show`)
  }
}


const getOneDayAsHtmlString = (day) => {

  const year = day.date.y;
  const month = day.date.m;
  const date = day.date.d;

  // Combine all the tasks into a string
  const todaysTasks = day.tasks.map(getOneTaskAsHtmlString).join(``);

  return `
    <li class="day ${ day.classes }" data-y="${ year }" data-m="${ month }" data-d="${ date }">
      <h1 class="date">${ day.str }</h1>
      <ul class="tasks">${ todaysTasks }</ul>
      <button class="addnew">Add New Task</button>
      <input type="text" placeholder="What task?">
    </li>`;
}

const getDayObjectFromDate = (dateToLoad, daysFromNow) => {

  // Date numbered values
  const year = dateToLoad.getFullYear();
  const month = dateToLoad.getMonth() + 1;
  const date = dateToLoad.getDate();

  // Build a human-readable date string
  const datestr = dateToLoad.toDateString(`default`, {weekday:`short`, month:`short`, day:`numeric`});
  
  // Get the tasks for this date
  const datetasks = allTasks.filter(aTask => aTask.start.year == year && aTask.start.month == month && aTask.start.date == date);

  // Add classes for current and past dates
  let classstr = ``
  if (daysFromNow == 0) {
    classstr = `today`;
  } else if (daysFromNow < 0) {
    classstr = `past`;
  }

  return {str: datestr, date: { y:year, m:month, d:date }, classes: classstr, tasks: datetasks};
}



// INITIALIZATION OF THE DOCUMENT
window.addEventListener('load', event => {

  const $cal = document.getElementById(`cal`);

  let curr = new Date();
  let loadDays = 5;
  let startDay = -1; // Start loading from yesterday (relative days + or -)

  // Load up all the days in this empty array
  const daysToDisplay = [];

  // Load up X (loadDay) number of days
  for (let i = 0; i < loadDays; i++) {

    const daysFromNow = i + startDay;

    // Take the current date, load relative dates by multiplying 86400000 (milliseconds in a day)
    const dateToLoad = new Date(curr.valueOf() + (daysFromNow * 86400000));
    
    // Load up our Array with an Object built from a date object
    daysToDisplay.push( getDayObjectFromDate(dateToLoad, daysFromNow) );
  }

  // Get all the days and join them together
  $cal.innerHTML = daysToDisplay.map(getOneDayAsHtmlString).join(``);




  //const $tasks = document.getElementById(`tasks`);

  // // Add the loading screen when you make a request
  // showLoading();

  $cal.addEventListener(`click`, (event) => {
    
  //   // Find the "closest" element that matches .task (css selector)
    let $task = event.target.closest(`.task`);

    // If none were found, then get the heck outta here!
    if (!$task) return;

    // If we got this far, we must have found a `.task`, now let's dive into it...
    const taskid = $task.dataset.taskid;

    // Search for the first element whose id matches the one we're looking for
    let taskObj = allTasks.find( t => t.id == taskid );

    // If no matching task was found
    if (!taskObj) return;

    // Set "compelete" to its inverse
    taskObj.complete = !taskObj.complete;

    // Reprint the list of tasks
    $cal.innerHTML = daysToDisplay.map(getOneDayAsHtmlString).join(``);

    // NOTE: We only really need to reprint that one element, make some adjustments in the future

  });

  // // Simulate data loading, delay 3 seconds
  // setTimeout(() => {
  //   $tasks.innerHTML = getSomeTasksAsHtmlString(tasks);
  //   showLoading(false);
  // }, 3000);
  
});
