document.addEventListener('DOMContentLoaded', () => {
  //HTML has loaded
  console.log('Main.js and the DOM are loaded');

  const bb = document.querySelector('big-bang');
  bb.addEventListener('click', changeCharacter);
});

function changeCharacter(ev) {
  //user clicked on the <big-bang> element
  const bb = ev.target;
  bb.character = bb.character === 'Leonard' ? 'Sheldon' : 'Leonard';
  //bb.getAttribute()  bb.setAttribute()
  bb.color = bb.color === 'cornflowerblue' ? 'lightcoral' : 'cornflowerblue';
}
