var song= "";
function preload(){
    song= loadSound("music.mp3");
}

srw=0;
slw=0;
rwx=0;
rwy=0;
lwx=0;
lwy=0;

function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("posenet is blah blah");
}

function gotPoses(results){
    if(results.length>0){
        console.log("results");
        srw=results[0].pose.keypoints[10].score;
        slw=results[0].pose.keypoints[9].score;
        console.log("right wrist "+srw+" left wrist "+slw);

        rwx=results[0].pose.rightWrist.x;
        rwy=results[0].pose.rightWrist.y;
        console.log("right wrist x= "+rwx+" right wrist y= "+rwy);

        lwx=results[0].pose.leftWrist.x;
        lwy=results[0].pose.leftWrist.y;
        console.log("left wrist x= "+lwx+" left wrist y= "+lwy);
    }
}

function draw(){
    image(video,0,0,600,500);
    fill("#FFA69E");
    stroke("#FFA69E");
    if(srw>0.2){
        circle(rwx,rwy,20);
        if(rwy>0 && rwy<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x"; song.rate(0.5);
        }
        else if(rwy >100 && rwy <= 200) { 
            document.getElementById("speed").innerHTML = "Speed = 1x"; song.rate(1); 
        }
        else if(rwy >200 && rwy <= 300) { 
            document.getElementById("speed").innerHTML = "Speed = 1.5x"; song.rate(1.5); 
        }
        else if(rwy >300 && rwy <= 400) { 
            document.getElementById("speed").innerHTML = "Speed = 2x"; song.rate(2); 
        }
        else if(rwy >400) { document.getElementById("speed").innerHTML = "Speed = 2.5x"; song.rate(2.5); 
    }
    }
    if(scoreLeftWrist > 0.2) { 
        circle(lwx,lwy,20); 
        InNumberlwy = Number(lwy); remove_decimals = floor(InNumberlwy); volume = remove_decimals/500; 
        document.getElementById("volume").innerHTML = "Volume = " + volume; song.setVolume(volume); 
    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}