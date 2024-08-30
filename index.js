
const intro = `Hi, I am Victor and this is my app development journal!`;
document.querySelector('.introduction').textContent = intro;


// function drawVectorLineAcrossScreen(){
//     const canvas = document.querySelector('canvas');
//     const ctx = canvas.getContext('2d');
    
//     //get screen width
//     const screenWidth = window.innerWidth;
//     console.log(screenWidth);
    
//     ctx.beginPath();
//     ctx.moveTo(0, 0);
//     ctx.lineTo(screenWidth, 0);
//     //make line thicker
//     ctx.lineWidth = 15;
    
//     //
//     const lineColorStart = 'rgba(0, 0, 0, 1)';
//     const lineColorEnd = 'rgba(0, 0, 0, 0)';
//     //make line fade out from black to transparent left to right
//     const gradient = ctx.createLinearGradient(0, 0, screenWidth, 0);
//     gradient.addColorStop(0, lineColorStart);
//     gradient.addColorStop(1, lineColorEnd);
//     ctx.strokeStyle = gradient;
//     ctx.stroke();
// }

// function createTiles(){
//     // create a new div element with class tile
//     const tile = document.createElement('tile');
//     tile.classList.add('tile');
//     document.querySelector('.tile-container').appendChild(tile);
// }

// function randomizeTileDimensions(){
//     const tiles = document.querySelectorAll('.tile');
//     tiles.forEach(tile => {
//         const width = Math.floor(100+ Math.random() * 100);
//         const height = Math.floor(100 + Math.random() * 200);
//         tile.style.width = `${width}px`;
//         tile.style.height = `${height}px`;
//     });
// }

// for (let i = 0; i < 25; i++){
//     createTiles();
// }

//randomizeTileDimensions();
//drawVectorLineAcrossScreen();

