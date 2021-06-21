var TimerUI = registerComponent({
	uid: 'timer',
	html: `
		<p>
			<span id="timer_session_name"></span>
		</p>
		<p>
			<span id="timer_minutes">00</span>:<span id="timer_seconds">00</span>
		</p>
		<p><span id="extra_status"></span></p>
		<p><span id="extra_more"></span></p>
		<p>
			<button onclick="Timer.stop()">Stop</button>
			<button onclick="Timer.start()">Start</button>
			<button onclick="Timer.reset()">Reset</button>
		</p>
	`,
	css: '',
	target: 'container_below',
	bindings: function() {
		Timer.init();

	    function showTimerSettings() {
	    	var timer_time = Timer.getTime();

	    	$('#timer_minutes').text(timer_time.minutes);
	    	$('#timer_seconds').text(timer_time.seconds);

	    	var extras = TimerExtra.status({
		    	total: timer_time.total_seconds,
		    	minutes: timer_time.minutes
	    	});

			$('#timer_session_name').text(extras.name + ' (' + extras.tag + ')');

			var status_text = '', more_text = '';

			if (timer_time.total_seconds > 0) {
				status_text = 'Now: ' + extras.status;
				more_text = extras.more;

		    }

		    $('#extra_status').text(status_text);
    		$('#extra_more').text(more_text); 
	    }

		showTimerSettings();
	    var timer = setInterval(showTimerSettings, 500);
	}
});

var Timer = {
	cur_time: 0,
	is_paused: true,
	timer: undefined,

	init: function() {
		clearInterval(Timer.timer);
		Timer.reset();
		Timer.timer = setInterval(Timer.intervalAction, 1000);
	},

	start: function() {
		Timer.is_paused = false;
	},

	stop: function() {
		Timer.is_paused = true;
	},

	reset: function() {
		Timer.is_paused = true;
		Timer.cur_time = 0;
	},

	intervalAction: function() {
		if (Timer.is_paused)
			return;

		++Timer.cur_time;
	},

	getTime() {
        var minutes = parseInt(Timer.cur_time / 60, 10);
        var seconds = parseInt(Timer.cur_time % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return {
        	minutes: minutes,
        	seconds: seconds,
        	total_seconds: Timer.cur_time
        };
	}
};

var TimerExtra = {
	_settings: undefined,
	_timeline: [],

	set: function(obj) {
		if (obj)
			TimerExtra._settings = obj;
		TimerExtra._createTimeline();
		console.log('timeline', TimerExtra._timeline);
	},

	_createTimeline: function() {
		if (!TimerExtra._settings)
			return;

		if (!TimerExtra._settings.pomList)
			return;

		var tm = 0;
		for (var i = 0; i < TimerExtra._settings.pomList.length; i++) {
			var wk = {
				'time': tm,
				'type': 'Work',
				'pic' : 'Next break in ' + TimerExtra._settings.pomList[i].workMinutes + ' minutes'
			};

			TimerExtra._timeline.push(wk);

			tm += TimerExtra._settings.pomList[i].workMinutes;

			var brk = {
				'time': tm,
				'type': 'Break',
				'pic' : 'Next work session in ' + TimerExtra._settings.pomList[i].breakMinutes + ' minutes'
			};

			tm += TimerExtra._settings.pomList[i].breakMinutes;

			TimerExtra._timeline.push(brk);
		}

		var endk = {
			'time': tm,
			'type': 'end',
			'pic' : 'Pic: End'
		};

		TimerExtra._timeline.push(endk);
	},

	_findTimelineInd: function(minutes) {
		var ind = 0;
		for (var i = 0; i < TimerExtra._timeline.length; i++) {
			if (minutes >= TimerExtra._timeline[i].time)
				ind = i;
			else
				break;
		}

		return ind;
	},

	status: function(cur_time) {
		var ret_obj = {
			name: 'Default name',
			tag: 'Default tag',
			status: 'Default Status',
			more: 'Default More'
		};

		if (!TimerExtra._settings)
			return ret_obj;

		ret_obj.name = TimerExtra._settings.name;
		ret_obj.tag = TimerExtra._settings.tag;
		
		var ind = TimerExtra._findTimelineInd(cur_time.minutes);
		ret_obj.status = TimerExtra._timeline[ind].type;
		ret_obj.more = TimerExtra._timeline[ind].pic;

		return ret_obj;
	}
};

var TimerC = {
	start: function(obj) {
		TimerExtra.set(obj);
		TimerUI.show();
	}
};