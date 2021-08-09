function timer() {
  // Timer

  const deadline = '2021-12-31';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date ()),
      days = Math.floor( (t/(1000*60*60*24)) ),
      hours = Math.floor( (t/(1000*60*60) % 24) ),
      minutes = Math.floor( (t/1000/60) % 60),
      seconds = Math.floor( (t/1000) % 60);
    
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };      
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);
    
    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      function zeroing(timeValue, timeSelector) {
        if (timeValue <= 0) {
          timeSelector.innerHTML = '00';  
        } else {
          timeSelector.innerHTML = getZero(timeValue);
        }
      }

      zeroing(t.days, days);
      zeroing(t.hours, hours);
      zeroing(t.minutes, minutes);
      zeroing(t.seconds, seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }    
  }

  setClock('.timer', deadline);
}

module.exports = timer;