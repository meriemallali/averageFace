var imgs = [];
var avgImg;
var numOfImages = 30;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    for(let i=0; i< numOfImages; i++ ){
        filename = 'assets/'+i+'.jpg';
        imgs[i] = loadImage(filename);
        // console.log(imgs)
    }

}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(100, 100);
    pixelDensity(1);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);

}
