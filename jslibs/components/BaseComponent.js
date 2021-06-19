class BaseComponent {
	constructor(obj) {
		this._definitions = {};
		$.extend(true, this._definitions, obj);
	}

	_render() {
		console.log('render');
		$('#'+this._definitions.target)
			.html(this._definitions.html)
			.attr('current', this._definitions.uid);
		this._definitions.bindings();
	}

	show() {
		console.log('show');
		var current = $('#'+this._definitions.target).attr('current');

		console.log('current ', current);

		if (current != this._definitions.uid)
			this._render();

		$('#'+this._definitions.target).show();
	}

	hide() {
		console.log('hide');
		$('#'+this._definitions.target).hide();
	}
};


function registerComponent(obj) {
	return new BaseComponent(obj);
}



/*

{
	_definitions: {
		uid:
		html:
		css:
		target: -> which container should it get populated inside
		bindings:
	}
	show: if not present -> hide prev, render, else -> show()
	hide: hide()
	_render: put element in DOM, call bindings

}

$.extend(true, target, src)  -> Deep copy

*/