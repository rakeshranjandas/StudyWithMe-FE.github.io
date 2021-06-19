var TimerUI = registerComponent({
	uid: 'timer',
	html: `
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

	    var timer = setInterval(function() {
	    	var timer_time = Timer.getTime();
	    	$('#timer_minutes').text(timer_time.minutes);
	    	$('#timer_seconds').text(timer_time.seconds);

	    	var extras = TimerExtra.status(timer_time.total_seconds);
			$('#extra_status').text(extras.status);
	    	$('#extra_more').text(extras.more);	    	
	    }, 500);
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
	_settings: {},
	set: function(obj) {
		if (!obj)
			TimerExtra._settings = obj;
	},

	status: function(seconds_elapsed) {
		return {
			'status': 'Phase '+seconds_elapsed,
			'more': 'Some Random Stuff'
		}
	}
};

var TimerC = {
	start: function(obj) {
		TimerExtra.set(obj);
		TimerUI.show();
	}
};