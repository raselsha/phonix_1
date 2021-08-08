// play button id list
var btn=['btn1','btn2','btn3','btn4','btn5','btn6','btn7','btn8','btn9','btn10','btn11','btn12','btn13','btn14','btn15','btn16','btn17','btn18','btn19','btn20'];
// sound list in assets/audio/*.mp3
var sound=['sound1','sound2','sound3','sound4','sound5','sound6','sound7','sound8','sound9','sound10','sound11','sound12','sound13','sound14','sound15','sound16','sound17','sound18','sound19','sound20'];
// left table letter ID list
var charA=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19','a20'];
// right table letter ID list
var charB=['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18','b19','b20'];


var player = document.getElementById('player');
var i=0; //increment

// reset table letters 
reset(); 

// start the program
start(); 

// this method will reset elements
function reset(){
	for (var i = 0; i < 20; i++) {
	  	hide(charA[i]); // hide left table letters
	  	show(charB[i]); // show right table letters
	  	removePlaySoundBtn(btn[i]); //remove paly sound from left table
	  	inactiveBtn(btn[i]);  // play button deactive

	  	addNoSoundBtn(charB[i]); // add no sound btn to left table
	  	activeChar(charB[i]);  // active left table letters
	}
}

function start() {
	if(i==0){
	   activeBtn(btn[i]); // make first button green and active 
	   addPlayNowBtn(btn[i]);
	}
}

function playNow(){
	playSound(sound[i]);
	var charElemA  = document.getElementById(charA[i]);
	for (var j = 0; j < 20; j++) {
		var charElemB  = document.getElementById(charB[j]);
		if(charElemA.innerHTML==charElemB.innerHTML){
			removeNoSoundBtn(charElemB.id);
			var element = document.getElementById(charElemB.id);
			var att = document.createAttribute("onclick");
			att.value = "moveNow("+charB[j]+","+charA[i]+")";
			element.setAttributeNode(att);
		}
	}
}

function moveNow(source,desti){
	playSound(sound[i]);
    var src = source.getBoundingClientRect();
    var dest = desti.getBoundingClientRect();
    var left = src.x;
    var top = src.y;
    source.style.transition = 'all 1s ease-in-out';
    source.style.transform = 'translate('+(dest.x-src.x)+'px,'+(dest.y-src.y)+'px)';
    setTimeout(function(){
         resetTo(source,desti); // move letter to original position
      }, 1000);
}

function resetTo(source,desti) {
      show(desti.id);
      hide(source.id);
      source.removeAttribute('style');
      source.classList.remove('pointer');
      source.removeAttribute("onclick");
      makeNormalBtn(btn[i]);
      next(); 
}

function next(){
	i++;
	if(i==20){
		i=0;
		endLesson();
	}
	else{
		activeBtn(btn[i]); // make first button green and active 
		addPlayNowBtn(btn[i]);
	}
}

function addPlayNowBtn(id){
	var element = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playNow()";
	element.setAttributeNode(att);
}

function removePlayNowBtn(id){
	var element = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playSound('"+sound[btn.indexOf(id)]+"')";
	element.setAttributeNode(att);
}

function addNoSoundBtn(id){
	var element = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playNoSound()";
	element.setAttributeNode(att);
}

function removeNoSoundBtn(id){
	var element = document.getElementById(id);
	element.removeAttribute('onclick');
}

function addPlaySoundBtn(id){
	var element = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playSound('"+sound[btn.indexOf(id)]+"')";
	element.setAttributeNode(att);
}

function removePlaySoundBtn(id){
	var element = document.getElementById(id);
	element.removeAttribute('onclick');
}

function playSound(id){
	player.src = 'assets/audio/'+id+'.mp3';
	player.play();	
}

function playNoSound(){
	var number = Math.floor(Math.random()*3)+1;
	console.log(number);
	player.src = 'assets/audio/no'+number+'.mp3';
	player.play();	
}


function wordActive(id){
	var h1 = document.getElementById(id);
	h1.classList.add('text-green');
}

function wordInactive(id){
	var h1 = document.getElementById(id);
	h1.classList.remove('text-green');
	h1.classList.add('text-white');
}

function show(id){
	var item = document.getElementById(id);
	item.classList.remove('invisible');
	item.classList.add('visible');
}
function hide(id){
	var item = document.getElementById(id);
	item.classList.remove('visible');
	item.classList.add('invisible');
}

function activeChar(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(0%)';
	item.style.opacity= '1';
	item.classList.add('pointer');
}
function inactiveChar(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(100%)';
	item.style.opacity= '0.5';
	item.classList.remove('pointer');
}

function activeBtn(id){
	var item = document.getElementById(id);
	item.src = 'assets/images/play-green.svg';
	item.style.filter= 'grayscale(0%)';
	item.style.opacity= '1';
	item.classList.add('pointer');
}
function inactiveBtn(id){
	var item = document.getElementById(id);
	item.src = 'assets/images/play-white.svg';
	item.style.filter= 'grayscale(100%)';
	item.style.opacity= '0.5';
	item.classList.remove('pointer');
}
function makeNormalBtn(id){
	var item = document.getElementById(id);
	item.src = 'assets/images/play-white.svg';
	item.style.filter= 'grayscale(0%)';
	item.style.opacity= '1';
	addPlaySoundBtn(id);
}

function endLesson() {
	var help = document.getElementById('help');
	var subtitle = document.getElementById('subtitle');
	help.classList.add('d-none');
	subtitle.classList.remove('d-none');
}




