

export class MyWorker {
  userId;
  username;
  name;
  tel;
  startTime;
  endTime;
  hours;

  constructor(userId,
    username?,
    name?,
    tel?,
    startTime?,
    endTime?,
    hours?) {
    this.userId = userId;
    this.username = username;
    this.name = name;
    this.tel = tel;
    this.startTime = startTime;
    this.endTime = endTime;
    this.hours = hours;
  }
}
