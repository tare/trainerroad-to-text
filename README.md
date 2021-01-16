# Convert TrainerRoad workout to text

Have you ever wanted to convert [TrainerRoad](https://www.trainerroad.com) workouts to text? 

This script converts TrainerRoad workouts to text based on a syntax similar to the one used on [What's on Zwift?](https://whatsonzwift.com).

### Usage

You can use the script in the following two ways.

#### JavaScript console

1. Copy the [JavaScript code](js/trainerroad-to-text.min.js) to the clipboard
2. Log into TrainerRoad
3. Navigate to a workout
4. Paste the copied JavaScript code from the clipboard into the JavaScript console and execute it
5. Copy the content of the alert box to the clipboard

#### Bookmarklet

Install the bookmarklet by dragging and dropping the following link <a href='javascript:(function(){function a(a){for(var b=[],c=1;c<a.length;c++)b.push(a[c]-a[c-1]);return b}function b(a){return`${a}s`}function c(a,b){for(var c=[],d=[],e=0;e<a.length;e++)a.indexOf(a[e])==e&&(c.push(a[e]),d.push(b[e]));return[c,d]}var[d,e,f]=function(){var a=Highcharts.charts[Highcharts.charts.length-1].series[0].data.map(a=>a.x),b=Highcharts.charts[Highcharts.charts.length-1].series[0].data.map(a=>a.y),d=window.trainerRoad.ftp;return[a,b]=c(a,b),[a,b,d]}(),g=function(b){for(var c=a(b),d=[-1],e=0;e<c.length-1;e++)Math.abs(c[e+1]-c[e])>.01&&d.push(e);return d.push(c.length-1),d}(e),h=function(a,c,d,e){for(var f="",g=0;g<e.length-1;g++)if(e[g]+1<e[g+1])if(c[e[g+1]+1]==c[e[g]+1]){var h=(a[e[g+1]+1]-a[e[g]+1])/1e3;h+=1,e[g+1]+1!=e[g+2]&&g+2<e.length&&(h-=1),f+=`${b(h)} @ ${Math.round(100*c[e[g+1]+1]/d).toString()}% FTP\n`}else{var h=(a[e[g+1]+1]-a[e[g]+1])/1e3;(g+2>e.length-1||e[g+1]+1==e[g+2])&&(h+=1),f+=`${b(h)} from ${Math.round(100*c[e[g]+1]/d).toString()} to ${Math.round(100*c[e[g+1]+1]/d).toString()}% FTP\n`}return f.slice(0,-1)}(d,e,f,g);console.log(h),window.alert(h)})();
'>TrainerRoad to Text</a> to the bookmarks toolbar.

1. Log into TrainerRoad
2. Navigate to a workout
3. Execute the bookmarklet
4. Copy the content of the alert box to the clipboard

### Known issues

* If you have any issues copying the content of the alert box, then please try to copy the content from the JavaScript console
