// Seteo de variables
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
let currentCharacter;


// Listeners del DOM
playButton.addEventListener("click", () => { 
  playText(textInput.value);
});
pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);
speedInput.addEventListener("input", () => { // cambio de 'speed'
  stopText();
  playText(utterance.text.substring(currentCharacter)); // TODO // se ejecuta el texto se re-reproduce cuando cambia la 'speed'
});


// llamado a la api del browser y  listeners de la api cuando se cambia la 'speed'
const utterance = new SpeechSynthesisUtterance(); // TODO // llama a la api del browser
utterance.addEventListener("end", () => {   // detiene la reproducción cuando se cambia la 'speed'
  textInput.disabled = false;
});
utterance.addEventListener("boundary", (e) => { // para reiniciar cuando se cambia la 'speed'
  currentCharacter = e.charIndex;
});


// Funciones de reproducción, pausado y detención
function playText(text) {
  if (speechSynthesis.paused && speechSynthesis.speaking) {  // 
    return speechSynthesis.resume();
  }
  if (speechSynthesis.speaking) return; // para que no se reproduzca mas de una vez cuando si presiona play varias veces
  utterance.text = text;   // seteo texto de la 'utterance'
  utterance.rate = speedInput.value || 1; // seteo velocidad de 'utterance' por default  la 'speed' es  1
  textInput.disabled = true;   //  se desabilita campo texto cuando se reproduce
  speechSynthesis.speak(utterance); // TODO //  método para que se repoduzca la síntesis
} 

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause(); // método de pausa
}

function stopText() {
  speechSynthesis.resume(); // metodo que deshabilita el texto pausado
  speechSynthesis.cancel(); // metodo que permite que se salga del estado de pausa y se puede reproducir nuevo texto
}




