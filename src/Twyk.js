var twyk = (function(){
	var vars = {};
	var domElement = document.createElement('div');
	domElement.style.float = 'left';
	domElement.style.background = 'rgba(255,255,255, 0.5)';
	domElement.innerHTML = '<h4>' + name + '</h4>';

	function addSlider(x, min, max){
		min = min || 0;
		max = max || 50;
		var div = document.createElement('div');
		div.innerHTML = x;
		var number = document.createElement('span');
		var slider = document.createElement('input');
		slider.type = 'range';
		slider.min = min;
		slider.max = max;
		number.innerHTML = vars[x] = slider.value;
		slider.addEventListener('change', function(){
			number.innerHTML = vars[x] = this.value;
		});
		div.appendChild(slider);
		div.appendChild(number);
		domElement.appendChild(div);
		document.body.appendChild(domElement);
	}

	return function(x, min, max){
		if(x in vars){
			return vars[x];
		}else{
			vars[x] = 0;
			addSlider(x, min, max);
		}
	};
})();