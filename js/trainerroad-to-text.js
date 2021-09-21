javascript:(function(){
  const SENSITIVITY = 1e-2;
  const SIMPLIFY = false;

  function diff(array) {
    var diff_array = [];
    for (var i=1;i<array.length;i++) {
      diff_array.push(array[i]-array[i-1]);
    }
    return diff_array;
  }
  
  function extract_data() {
    var time = Highcharts.charts[Highcharts.charts.length-1].series[0].data.map(element => {return element.x;});
    var power = Highcharts.charts[Highcharts.charts.length-1].series[0].data.map(element => {return element.y;});
    var ftp = window.trainerRoad.ftp;
    [time,power] = filter_nonunique(time,power);
    return [time,power,ftp]
  }

  function simplify_duration(duration) {
    if (SIMPLIFY) {
      if (duration%3600 == 0) {
        return `${duration/3600}h`;
      } else if (duration%60 == 0) {
        return `${duration/60}m`;
      } else {
        return `${duration}s`;
      }
    } else {
      return `${duration}s`;
    }
  }
  
  function changepoints(array) {
    var diff_array = diff(array);
    var indices = [-1];
    for (var i=0;i< diff_array.length-1;i++) {
      if (Math.abs(diff_array[i+1]-diff_array[i]) > SENSITIVITY) {
        indices.push(i);
      }
    }
    indices.push(diff_array.length-1);
    return indices; 
  }
  
  function filter_nonunique(array,array2) {
    var time = [];
    var power = [];
    for (var i=0;i<array.length;i++) {
      if (array.indexOf(array[i]) == i) {
        time.push(array[i]);
        power.push(array2[i]);
      }
    }
    return [time,power];
  }
  function get_textual_presentation(time,power,ftp,indices) {
    var workout = '';
    for (var i=0;i<indices.length-1;i++) {
      if (indices[i]+1 < indices[i+1]) {
        if (power[indices[i+1]+1] == power[indices[i]+1]) {
          var duration = (time[indices[i+1]+1]-time[indices[i]+1])/1000
          duration += 1;
          // we have a continuous transition into a ramp after the current block
          if ((indices[i+1]+1 != indices[i+2])) {
              duration -= 1;
          }
          workout += `${simplify_duration(duration)} @ ${Math.round(100*power[indices[i+1]+1]/ftp).toString()}% FTP\n`
        } else {
          var duration = (time[indices[i+1]+1]-time[indices[i]+1])/1000
          workout += `${simplify_duration(duration)} from ${Math.round(100*power[indices[i]+1]/ftp).toString()} to ${Math.round(100*power[indices[i+1]+1]/ftp).toString()}% FTP\n`
        }
      } 
    }
    return workout.slice(0,-1);
  }
  
  // extract data
  var [time,power,ftp] = extract_data() 
  
  // find the moments of time where the second-order finite difference of power is nonzero
  var indices = changepoints(power);
  
  // get a textual representation of the workout
  var workout = get_textual_presentation(time,power,ftp,indices);

  console.log(workout);
  window.alert(workout);
})();
