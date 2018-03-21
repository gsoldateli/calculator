var calc = {
	result: null,
	elements: {
		'display': document.getElementById('display')
	},

	_setDisplay: function(content) {
		display.value = content;
	},

	clear: function() {
		this._setDisplay('');
	},
	decimal: function() {
		this.result = eval(this.elements.display.value + '/10');
		this._setDisplay(this.result);
	},

	del: function() {
		var displayValue =  this.elements.display.value.slice(0,-1);

		if(displayValue[displayValue.length-1] === '.' 
		   || displayValue[displayValue.length-1] === ',' )	{
			displayValue = displayValue.slice(0,-1)//Remove , or .
		}
		this._setDisplay(displayValue);
	},
	equals: function() {
		//this.result = this.elements.display.value;
		//var evalCode = ''+ (this.result / 100) +';';
		this.result = this.elements.display.value;
		this._setDisplay(eval(this.result));
	}
};

var $numericPad = document.querySelector('.buttons-container');
var $display = document.getElementById('display');

$numericPad.addEventListener('click', function(event){
	var $target = event.target;
	if($target.dataset.value) {
		$display.value +=  $target.dataset.value;
	}
});