const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

var A = 50;
var r = 50;
var s = 25;
var h = 2*r;
var N;
var M; 
var t = 0;
var rate = .02;

const fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


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
        canvas.addEventListener('mousedown', e => {
            get_mouse_pos = true;
            getMousePosition(canvas, e)
        });
          
        canvas.addEventListener('mouseup', e => {
            get_mouse_pos = false;
        });
      
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
          }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
          
        canvas.addEventListener('touchend', function(e) {
     
        }, false);
          
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            event.preventDefault();
        }, false);
    }
   
 }

function getMousePosition(canvas, event) {
    interaction(canvas,event)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event)
}

function interaction(canvas, event) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    A = 50 + 50*mouse_y;
    rate = .02 + .8*mouse_y;

}
