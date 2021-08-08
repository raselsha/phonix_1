
var sound=['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10'];
var audio=['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10'];

var player = document.getElementById('player');
var i=0; //increment

reset(); // reset page for all 
start(); // start the program

// this method will reset elements
function reset(){
	for (var i = 0; i < 10; i++) {
	  	inactive(mic[i]); // inactive microphone icons
	  	inactive(sound[i]); // inactive user sounds icon
	  	hide(audio[i]); // hide original sounds icon
	}
}

function start() {
	if(i==0){
	  wordActive(words[i]); // make first word green as active
	  addRecordingBtn(mic[i]); // add attribute onmousedown for recording
	  active(mic[i]); // active for recording buton
	}
}


function recordStart(id) {
	var element = document.getElementById(id);
	var screen = window.matchMedia("(max-width:991px)");
	if (screen.matches) { // If media query matches
	    element.style.backgroundPosition='-30px';
	  } else {
	   element.style.backgroundPosition='-40px';
	  }
	//+++++++++ recording funciton +++++++++
  // recording(); // manual function for record audio stream
  recording(id); // adapter recording;
  addRecordingStopBtn(id);
  inactive(sound[i]);
}

//adapter reacorder
function recording(){
	const audioStream = async function(stream){
		config = {type:'audio',mimeType:'audio/webm'}
		recorder = RecordRTC(stream,config);
		recorder.startRecording();

	};

	navigator.mediaDevices.getUserMedia({video: true,audio: true}).then(audioStream);
}


function recordStop(id) {
	var element = document.getElementById(id);
	element.style.backgroundPosition='0px';
	
	recorder.stopRecording(function() {
		recorded_data[i] = recorder.toURL();
	    console.log("audio["+i+"]"+recorded_data[i]);
	});

	addPlaySoundBtn(sound[i]);
	active(sound[i]);

	removeRecordingBtn(mic[i]);
	wordInactive(words[i]);
	inactive(mic[i]);

	setTimeout(function(){
		nextWord();	
	},100);
	
}

function addPlaySoundBtn(id){
	var sound = document.getElementById(id);
	var att = document.createAttribute("onclick");
	att.value = "playUserSound('"+id+"')";
	sound.setAttributeNode(att);
}

function playUserSound(id){
	player.src = recorded_data[sound.indexOf(id)];
	player.play();	
}

function addRecordingBtn(id){
	var element = document.getElementById(id);
	var onclick = document.createAttribute("onclick");
	onclick.value = "recordStart('"+id+"')";
	element.setAttributeNode(onclick);
}

function addRecordingStopBtn(id){
	var element = document.getElementById(id);
	var onclick = document.createAttribute("onclick");
	onclick.value = "recordStop('"+id+"')";
	element.setAttributeNode(onclick);
}

function removeRecordingBtn(id){
	var element = document.getElementById(id);
	element.removeAttribute('onclick');
}

function nextWord(){
	i++;
	if (i<10) {
		wordActive(words[i]);
		addRecordingBtn(mic[i]);
		active(mic[i]);
	}
	else{
		 setTimeout(function(){
			activeOriginalAudio();
		},1500);
	}
	
}

function playOriginalAudio(id) {	
	player.src = 'assets/audio/'+id+'.mp3';
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
	item.classList.add('invisible');
}
function active(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(0%)';
	item.classList.add('pointer');
}
function inactive(id){
	var item = document.getElementById(id);
	item.style.filter= 'grayscale(100%)';
	item.classList.remove('pointer');
}

function endLesson() {
	var help = document.getElementById('help');
	var subtitle = document.getElementById('subtitle');
	help.classList.add('d-none');
	subtitle.classList.remove('d-none');
}




