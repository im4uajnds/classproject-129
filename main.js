scoreleftwrist=0;
song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function setup(){
    
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist>0.2){
    circle(leftWristX, leftWristY, 20);
    InNumberleftWristY= Number(leftWristY);
    removedecimal=floor(InNumberleftWristY);
    volume=removedecimal/500;
    document.getElementById("volume").innerHTML="volume="+ volume;
    song.setVolume(volume);

    }


}
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("model is loaded");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreleftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreleftWrist="+ scoreleftwrist);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX + " leftWristY=" + leftWristY);

        rightWristX=results[0].pose.rightWristX;
        rightWristY=results[0].pose.rightWristY;
        console.log("rightWristX=" + rightWristX + " rightWristY=" + rightWristY);
    }
}