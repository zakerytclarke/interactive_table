var Balls=[];
var NUM_BALLS=1000;
var BALL_SPEED=1;

setup();
function setup(){
    for(var i=0;i<NUM_BALLS;i++){
        Balls.push({
            x:Math.random()*SETTINGS.width,
            y:Math.random()*SETTINGS.height,
            vx:Math.random()*BALL_SPEED-(BALL_SPEED/2),
            vy:Math.random()*BALL_SPEED-(BALL_SPEED/2),
            ax:Math.random(),
            ay:Math.random()
        })
    }
}

function render_graphics(detections){
    var objects=JSON.parse(JSON.stringify(detections));
  for(var i=0;i<Balls.length;i++){
    circle(Balls[i].x, Balls[i].y,3);
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
        console.log(objects[j]);
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

    }

  }
}