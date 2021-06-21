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
		          <label>Number of Pomodoro Sessions:</label> <span id="num_pom_sess">1</span>
		          <button type="button" id="inc_pom_sess">+</button>
		          <button type="button" id="dec_pom_sess">-</button>
		          <button type="button" id="create_pom_sess">Create</button>
		        </div>
		      </div>
		      <div class="row">
		      	<div id="div_pom_sess">

		      	</div>
		      </div>
		    </form>
		</div>
	`,
	css: '',
	target: 'container_below',
	bindings: function() {
		$('#inc_pom_sess')
			.off('click')
			.on('click', function() {
				var num_sess = parseInt($('#num_pom_sess').text());
				num_sess++;
				$('#num_pom_sess').text(num_sess);
			});

		$('#dec_pom_sess')
			.off('click')
			.on('click', function() {
				var num_sess = parseInt($('#num_pom_sess').text());
				num_sess--;
				$('#num_pom_sess').text(Math.max(1, num_sess));
			});

		$('#create_pom_sess')
			.off('click')
			.on('click', function() {
				var num_sess = parseInt($('#num_pom_sess').text());
				var div_sess_container = $('#div_pom_sess');
				div_sess_container.html('');

				for (var i = 0; i < num_sess; i++) {
					var sess_container = `
						<hr>
						<div class="sessContainer">
					        <div>
					        	<label>
					          		<input class="workMinutes" type="text" value="25">
					          		Work minutes
					          	</label>
					        </div>
					        <div>
					        	<label>
					          		<input class="breakMinutes" type="text" value="5">
					          		Break minutes
					          	</label>
					        </div>
						</div>
					`;

					div_sess_container.append(sess_container);
				}

				var btn_start = `<button type="button" id="start_sess">Start</button>`;
				div_sess_container.append('<hr>' + btn_start);

				$('#start_sess')
					.off('click')
					.on('click', function() {
						console.log('Start Session');
						TimerC.start(genSettings())
					});
			});

		function genSettings() {
			var pom_list = [];

			$('.sessContainer').each(function() {
				var tis = $(this);
				var workMin = parseInt(tis.find('.workMinutes').val());
				var brkMin = parseInt(tis.find('.breakMinutes').val());
				pom_list.push({
					workMinutes: workMin,
					breakMinutes: brkMin
				});
			});

			return {
				name: $('#session_name').val(),
				tag: $('#session_tag').val(),
				pomList: pom_list
			};
		}
	}
});