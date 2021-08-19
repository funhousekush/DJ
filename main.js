song = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scoreleftwrist = 00;
scorerightwrist = 00;

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("Posenet is online");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("score left wrist = " + scoreleftwrist + "score right wrist = " + scorerightwrist);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftwristX + "leftWristY = " + leftwristY);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightwristX + "rightWristY = " + rightwristY);
    }
}

function draw()
{
    image(video, 0, 0, 600, 500);

    
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreleftwrist > 0.2)
    {    
        circle(leftwristX, leftwristY, 20);
        var number_format = Number(leftwristY);
        number_it = floor(number_format);
        volume =  number_it/500;
        document.getElementById("Volume").innerHTML = "=" + volume;
        song.setVolume(volume);
    }
    if(scorerightwrist > 0.2)
    {
        circle(rightwristX, rightwristY, 20);

        if(rightwristY > 0 && rightwristY <= 100)
        {
            document.getElementById("Speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        if(rightwristY > 100 && rightwristY <= 200)
        {
            document.getElementById("Speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        if(rightwristY > 200 && rightwristY <= 300)
        {
            document.getElementById("Speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        if(rightwristY > 300 && rightwristY <= 400)
        {
            document.getElementById("Speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        if(rightwristY > 400 && rightwristY <= 500)
        {
            document.getElementById("Speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function Stop()
{
    song.stop();
}