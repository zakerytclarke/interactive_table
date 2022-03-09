var Balls=[];
var NUM_BALLS=100;
var BALL_SPEED=2;
var PATH_LEN=50;
var BALL_SIZE=3;

setup();
function setup(){
    for(var i=0;i<NUM_BALLS;i++){
        Balls.push({
            x:Math.random()*SETTINGS.width,
            y:Math.random()*SETTINGS.height,
            vx:Math.random()*BALL_SPEED-(BALL_SPEED/2),
            vy:Math.random()*BALL_SPEED-(BALL_SPEED/2),
            ax:Math.random()-0.5,
            ay:Math.random()-0.5,
 
            color:{
                r:Math.floor(Math.random()*255),
                g:Math.floor(Math.random()*255),
                b:Math.floor(Math.random()*255),
            },
            px:[],
            py:[]
        })
    }
}

function render_graphics(detections){
    var objects=JSON.parse(JSON.stringify(detections));
  for(var i=0;i<Balls.length;i++){
    //Draw
    noStroke()
    fill(color(Balls[i].color.r,Balls[i].color.g,Balls[i].color.b));
    //Draw Path
    for(var p=Balls[i].px.length-1;p>0;p--){
        circle(Balls[i].px[p], Balls[i].py[p],BALL_SIZE*(p/Balls[i].px.length));
    }
    //Draw Ball
    //fill(color(255,255,255));
    circle(Balls[i].x, Balls[i].y,BALL_SIZE);




    //Save Trace
    Balls[i].px.push(Balls[i].x);
    Balls[i].py.push(Balls[i].y);
    if(Balls[i].px.length>PATH_LEN){
        Balls[i].px.shift()
        Balls[i].py.shift()
    }
    Balls[i].x+=Balls[i].vx; 
    Balls[i].y+=Balls[i].vy;
    // Balls[i].vx+=Balls[i].vx; 
    // Balls[i].vy+=Balls[i].vy;
    if(Balls[i].x<0||Balls[i].x>SETTINGS.width){
        Balls[i].vx*=-1;
    }
    if(Balls[i].y<0||Balls[i].y>SETTINGS.height){
        Balls[i].vy*=-1;
    }

    //Check if balls are under an object, if so accelerate out
    for(var j=0;j<objects.length;j++){
        var sx = objects[j].normalized.x*SETTINGS.width;
        var sy = objects[j].normalized.y*SETTINGS.height;
        var w = objects[j].normalized.width*SETTINGS.width;
        var h = objects[j].normalized.height*SETTINGS.height;
        var cx = sx+(w/2);
        var cy = sy+(h/2);

        if( Balls[i].x>sx&& Balls[i].x<sx+w&&
            Balls[i].y>sy&& Balls[i].y<sy+h
          ){//Inside bounding rectangle, set velocity away from center
            Balls[i].vx=(Balls[i].x-cx)/w*BALL_SPEED*10;
            Balls[i].vy=(Balls[i].y-cy)/h*BALL_SPEED*10;
        }
        //Accel
        console.log(Balls[0])
        

    }
    //Slow Down
    if(Math.abs(Balls[i].vx)>BALL_SPEED){
        Balls[i].vx-=Balls[i].vx/10;
    }
    if(Math.abs(Balls[i].vy)>BALL_SPEED){
        Balls[i].vy-=Balls[i].vy/10;
    }

    Balls[i].vx+=Balls[i].ax;
    Balls[i].vy+=Balls[i].ay;

    if(Balls[i].ax>0.5){
        Balls[i].ax-=Balls[i].ax/100;
    }
    if(Balls[i].ay>0.5){
        Balls[i].ay-=Balls[i].ay/100;
    }
    Balls[i].ax=(Math.random()-0.5)*0.1;
    Balls[i].ay=(Math.random()-0.5)*0.1;

  }
}