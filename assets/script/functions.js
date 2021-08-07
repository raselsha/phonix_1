
// custom javascript program for english phonics

var playID;      // variable for play button selection id 
var nextPlayID;  // variable for next play button selection id 
var letterID;    // variable for selection id of play button letter
var charID;      // right side letter selectin id    
var charList = ['B','G','L','C','V','CH','K','H','M','R','W','TH','D','J','N','S','X','SH','F','Q','P','T','TH1','Z']; // character list array
var i = 0;       // increament and letter selection in array

// Function for character play sound
function playButton(char) {
  if (charList[i]==char) {
    audio.src = 'assets/audio/'+char+'.mp3';
    audio.play();
  }
}

// Function for correct letter sound 
function playChar(char) {
  var subtitle = document.getElementById("subtitle");
  var letterID = document.getElementById("letter"+char); // Play sound letters element id
  var playID = document.getElementById("play"+char); // Play buttons element id
  var charID = document.getElementById(char); // Characters element id

  if(charList[i] == char){
    i++;
    nextPlayID = document.getElementById("play"+charList[i]); //next Play button element id
    if (i==charList.length) {
      i=0;
      setTimeout(function(){
        subtitle.classList.remove('invisible');
        subtitle.classList.add('visible');
       },1200);
      
    }
    audio.src = 'assets/audio/'+char+'.mp3';
    audio.play();

    moveTo(charID,letterID); // move letter to play sound position
    
    setTimeout(function(){
      nextPlayButton(playID,nextPlayID); // next play button activate
    },1200);
  }
  else{
    // on click wrong character play beep sound
    audio.src = 'assets/audio/NO.mp3';
    audio.play();
  }
}

function moveTo(charID,letterID){
    var src = charID.getBoundingClientRect();
    var dest = letterID.getBoundingClientRect();
    var left = src.x;
    var top = src.y;
    charID.style.transition = 'all 1s ease-in-out';
    charID.style.transform = 'translate('+(dest.x-src.x)+'px,'+(dest.y-src.y)+'px)';
    charID.style.padding = 0;
    charID.style.margin = 0;
    charID.style.marginBottom = '5px';
    setTimeout(function(){
        resetTo(charID,letterID); // move letter to original position
        
      }, 1000);
}


function resetTo(charID,letterID) {
      letterID.classList.remove('invisible');
      letterID.classList.add('visible');
      charID.classList.remove('visible');
      charID.classList.add('invisible'); 
      charID.removeAttribute('style');
      charID.classList.remove('pointer');
      charID.removeAttribute("onclick"); 
}

function nextPlayButton(playID,nextPlayID) {
  playID.querySelector('img').src='assets/images/play.svg';
  nextPlayID.querySelector('img').src='assets/images/play_active.svg'; 
}