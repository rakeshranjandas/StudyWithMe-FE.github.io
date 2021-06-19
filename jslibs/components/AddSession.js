var AddSession = registerComponent({
	uid: 'addSession',
	html: `
	  <div class="row">
	    <form class="col s12">
	      <div class="row">
	        <div class="input-field col s6">
	          <input id="session_name" name="name" type="text" class="validate">
	          <label for="session_name">Name</label>
	        </div>
	        <div class="input-field col s6">
	          <input id="session_tag" name="tag" type="text" class="validate">
	          <label for="session_tag">Tag</label>
	        </div>
	      </div>
	      <div class="row">
	        <div class="input-field col s12">
	          <input id="disabled" type="text" class="validate">
	          <label for="disabled">Pomodoro</label>
	        </div>
	      </div>
	    </form>
	    <button id="submit_add_session">Submit</button>
	  </div>
	`,
	css: '',
	target: 'container_below',
	bindings: function() {
		$('#submit_add_session')
			.off('click')
			.on('click', function() {
				var testjson = {
				    "name": "AWS",
				    "tag": "work",
				    "pomList": [
				        {
				            "workMinutes": 25,
				            "breakMinutes": 5
				        },
				        {
				            "workMinutes": 45,
				            "breakMinutes": 15
				        }
				    ]
				};

				console.log(testjson);
				// AddSession.hide();
			})
	}
});