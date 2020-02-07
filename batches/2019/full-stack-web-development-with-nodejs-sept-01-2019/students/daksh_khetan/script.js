
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');

var scrollInterval;

for(var i = 0; i < navMenuAnchorTags.length; i++){
	navMenuAnchorTags[i].onclick = function(event){
		event.preventDefault();
		//'textContent' returns the text contained in that element,
		//'trim()' removes spaces,
		//'toLowerCase()' converts text to lower case.
		var targetSectionID = this.textContent.trim().toLowerCase();
		var targetSection = document.getElementById(targetSectionID);
		// console.log(targetSectionID);
		
		// Option 1:
		// scrollInterval = setInterval(scrollVertically, 20, targetSection);

		//Option 2:
		scrollInterval = setInterval(function(){
			scrollVertically(targetSection);
		}, 20);
	};

}

function scrollVertically(targetSection){
	// if(targetSectionID == 'home'){
	// 	return;
	// }

	// getBoundingClientRect() returns height, width and 
	// left, top, right, bottom, x, y - coordinates.
	var targetSectionCoordinates = targetSection.getBoundingClientRect();
	if(targetSectionCoordinates.top <= 0){
		clearInterval(scrollInterval);
		return;
	}
	window.scrollBy(0, 40);
}


var progressBars = document.querySelectorAll('.skill-progress > div');
// console.log(progressBars);
var skillsContainer = document.getElementById('skills-container');
var animationDone = false;

window.addEventListener('scroll', checkScroll);

function initialiseBarsTo0(){
	for(let bar of progressBars){
		bar.style.width = 0 + '%';
	}
}

initialiseBarsTo0();

function fillBars(){
	for(let bar of progressBars){
		let targetWidth = bar.getAttribute('data-bar-width');
		let currentWidth = 0;
		let interval = setInterval(function(){
			if(currentWidth > targetWidth){
				clearInterval(interval);
				return;
			}
			currentWidth++;
			bar.style.width = currentWidth + '%';
		},7);
	}	
}

function checkScroll(){
	var coordinates = skillsContainer.getBoundingClientRect();
	if(!animationDone && (coordinates.top <= window.innerHeight)){
		console.log('Skills section visible!');
		animationDone = true;
		fillBars();
	}
	else if(coordinates.top > window.innerHeight){
		animationDone = false;
		initialiseBarsTo0();
	}
}







