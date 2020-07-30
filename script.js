const enable_interaction = true;
var scroll_pos = 0;
var scrolling = false;

var A = 50;
var r = 50;
var s = 25;
var h = 2*r;
var N;
var M; 
var t = 0;
var rate = .02;

var W;
var H;

const fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var body = document.getElementById('body');
var body_height = 20*window.innerHeight;

body.style = `height: ${body_height}px`;
window.scrollTo(0,0);

startAnimating(fps);


function draw() {
    
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);

    N = s*(W/(2*A) + 2);
    M = W/h + 4;

    for (let j = -1; j < M; j++) {
        for(let i = 0; i < N; i++){
            c =  Math.abs(50 + 150*(i%2));
            u = ((i+((-1)**j)*t)/s)%1;
            k = Math.floor((i+((-1)**j)*t)/s);
            a = (-1)**k*u*Math.PI;
            x_pos = (2*k-1 - Math.cos(a))*A;
            y_pos = h*j + Math.sin(a)*A;
            ctx.fillStyle = `rgba(${c},${c},${c},1)`;
            ctx.beginPath();
            ctx.arc(x_pos,
                    y_pos,
                    r,
                    0, 2*Math.PI);
            ctx.fill();
        }
    }
    
    t += rate;
    t %= 2 ;
    
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;

    window.onresize = function(e) {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        body_height = 2*H;
        body.style = `height: ${body_height}px`;
      }
    
    animate();
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();     
        
     }
     

     if(enable_interaction) {
        window.addEventListener('scroll', function(e) {
            scroll_pos = window.scrollY;
          
            if (!scrolling) {
              window.requestAnimationFrame(function() {
                scroll_action(scroll_pos);
                scrolling = false;
              });
          
              scrolling = true;
            }
          });
     }
   
 }


function scroll_action(scroll_pos) {

  y_scroll = scroll_pos/(body_height - H);

  A = 50 + 50*y_scroll;
  rate = .02 + .8*y_scroll;
  
}