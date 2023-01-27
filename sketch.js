var imgs = [];
var avgImg;
var numOfImages = 30;
let currentImg = 0;


//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    //* Step 1 *//
    // load the faces in memory
    for (let i = 0; i < numOfImages; i++) {
        // filename string made up from the path to the images
        filename = 'assets/' + i + '.jpg';
        imgs[i] = loadImage(filename);
        // console.log(imgs)
    }

}
//////////////////////////////////////////////////////////
function setup() {
    createCanvas(1024, 512);
    pixelDensity(1);

    //* Step 3 *//
    // empty buffer to save the results of our calculations
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    //* Step 2 *//
    // Face appears on the left, grey canvas on the right
    image(imgs[0], 0, 0);

    //* Step 4 *//
    // Access the pixel data of all the images in the imgs array and the variable avgImg
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].loadPixels();
    }
    avgImg.loadPixels();

    //* Step 5 *//
    // Face appears on the left, and the right side of the canvas is red
    //   for (let y = 0; y < imgs[0].height; y++) {
    //     for (let x = 0; x < imgs[0].width; x++) {
    //       let index = (x + y * imgs[0].width) * 4;
    //       avgImg.pixels[index] = 255;
    //       avgImg.pixels[index + 1] = 0;
    //       avgImg.pixels[index + 2] = 0;
    //       avgImg.pixels[index + 3] = 255;
    //     }
    //   }

    //* Step 6 *//
    // Average image appears on right side of the canvas
    for (let y = 0; y < imgs[0].height; y++) {
        for (let x = 0; x < imgs[0].width; x++) {
            let index = (x + y * imgs[0].width) * 4;
            // store the sum of each channel for that pixel.
            let sumR = 0, sumG = 0, sumB = 0;
            for (let i = 0; i < imgs.length; i++) {
                sumR += imgs[i].pixels[index];
                sumG += imgs[i].pixels[index + 1];
                sumB += imgs[i].pixels[index + 2];
            }
            avgImg.pixels[index] = sumR / imgs.length;
            avgImg.pixels[index + 1] = sumG / imgs.length;
            avgImg.pixels[index + 2] = sumB / imgs.length;
            avgImg.pixels[index + 3] = 255;
        }
    }
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);
    // We only need to do the calculations once 
    noLoop();
}

//* Step 7 *//
// implementation of the first idea : each time the right key arrow is pressed, a random face is drawn on the 
// left side of the canvas.
function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        // generate an index between 0 and length of imgs array, int()
        let randomIndex = int(random(imgs.length));
        console.log(randomIndex)
        // use of the random index generated to select an img from imgs array.
        image(imgs[randomIndex], 0, 0);
    }
}
// 
function mouseMoved() {
  let amount = map(mouseX, 0, width, 0, 1);
  let randomIndex = int(random(imgs.length));
  image(imgs[randomIndex], 0, 0);
  let img2 = createImage(imgs[randomIndex].width, imgs[randomIndex].height);
  img2.loadPixels();
  avgImg.loadPixels();
  for (let i = 0; i < img2.pixels.length; i++) {
    img2.pixels[i] = lerp(imgs[randomIndex].pixels[i], avgImg.pixels[i], amount);
  }
  img2.updatePixels();
  image(img2, img2.width, 0);
}