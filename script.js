const enable_interaction = true;
let scrollX = 0;
let scroll_width;
let scroll_height;
let scrollY = 0;
let scrolling = false;

let A = 50;
let r = 50;
let s = 25;
let h = 2*r;
let N;

let W;
let H;
let M; 

let t = 0;
let rate = .02;

const fps = 60;
let dt, startTime, now, then, delta;

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let scroll_div = document.getElementById('scroll_div');
let outer_wrapper = document.getElementById('outer_wrapper');

function draw() {
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillRect(0, 0, W, H);
    N = s*(W/(2*A) + 2);
    M = H/h + 4;
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
            ctx.arc(x_pos, y_pos, r, 0, 2*Math.PI);
            ctx.fill();
        }
    }
    t += rate;
    t %= 2 ;
}

function animate(fps) {
    dt = 1000/fps;
    then = window.performance.now();
    startTime = then;
    throttle();
 }
 
 function throttle(newtime) {
     requestAnimationFrame(throttle);
     now = newtime;
     delta = now - then;
     if (delta > dt) {
        then = now - (delta % dt);
        draw();     
     }
 }

if(enable_interaction) {
    scroll_div.addEventListener('scroll', function(e) {
        scrollX = scroll_div.scrollLeft;
        scrollY = scroll_div.scrollTop;
        if (!scrolling) {
            window.requestAnimationFrame(function() {
            scroll_action(scrollX, scrollY);
            scrolling = false;
        });
        scrolling = true;
        }
    });
}

function scroll_action(scrollX, scrollY) {
  x_scroll = scrollX/(scroll_width - W);
  y_scroll = scrollY/(scroll_height - H);
  A = 50 + 20*x_scroll;
  rate = .02 + 0.2*y_scroll;  
}

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    scroll_width = 2*W;
    scroll_height = 4*H;
    outer_wrapper.style.width = `${2*W}px`;
    outer_wrapper.style.height = `${4*H}px`;
}

window.onresize = function(e) {
    resize();
}

resize();

animate(fps);
