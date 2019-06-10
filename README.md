# WDDM Task Manager
A better way to manage our tasks, to be renamed.

## Planning
Let's start by planning our application

### Consider
  - *How do you track your: Daily tasks? Long-term tasks?*
  - *Can we improve the way we're storing information in our daily lives?*

### Applications
What we're currently using:
  - Evernote
  - MS "To Do"
  - Vantage
  - Calendar (Google, Apple, Outlook)
  - Apple Note
  - Apple Reminders

### Conclusion
Task management (for us) is a combination of:
  - "To Do" lists
  - Calendars
  - Notes

## Data
What points of information do we need to keep track of?

### Consider
  - *What information do we need to capture when defining a task?*
  - *What does a "task" mean to you?*

### Your Job
  1. Write a list of data points required make a task application useful
  2. Structure those data points into properties/values of a JS object called `task`
  3. Add sample data to the task, then add the task to an array called `tasks`

### Data Points
Some possible datapoints we came up with:
  - taskname
  - startdate & starttime
  - enddate & endtime
  - repeat
  - notes
  - category (seperate calendar?)
  - assignedto
  - members
  - priority
  - complete / status
  - reminders

### Use Cases
To help with date and time, determine a few cases:
  1. A start and end TIME that fall on the same day
  2. A start and end TIME that fall on different days
  3. A start date with no start time


## Misc "To Do"

- User settings: 
  - 24hr vs am/pm
- Type checking for new appointments
  - `throw`, possibly some `try`/`catch`?



# June 10th Tasks:
- Create more sample tasks
- Setup current date
- Load -1 - +3 days from now of data (filter)
- Order it by time/priority/etc? (or make it a user option) 
- Add new tasks
- Store this somewhere
- Modify tasks
    - Data, or move the task between dates
- Make tasks more robust
- Delete tasks
- Share tasks
- Turn it into more of a calendar-view
    - Figure out how to differentiate beteen current and active dates
