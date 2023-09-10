const Jimp = require("jimp")
const char_vals = require('./charachter_values')

async function processImage(filePath, width, height) {
    const image = await Jimp.read(filePath);
    image.resize(width, height)
    image.greyscale();
  
    const pixelArray = [];
  
    for (let y = 0; y < height; y++) {
      var ys = []
      for (let x = 0; x < width; x++) {
        const pixel = Jimp.intToRGBA(image.getPixelColor(x, y));
        const grayscaleValue = Math.round((pixel.r + pixel.g + pixel.b) / 3);
        ys.push(grayscaleValue);
      }
      pixelArray.push(ys)
    }
  
    return pixelArray;
  }



async function convert_to_text(imagePixelArrays) {
    const images_as_chars = []
  // images
    imagePixelArrays.forEach((image, imageIndex) => {
      var this_image = []
      this_image.push(["    new image    "])
      // ys
      image.forEach((row, rowIndex) => {
        var this_y = []
        // pixels
        row.forEach((pixel, pixelIndex) => {
          for (const char in char_vals.char_values) {
            const value = char_vals.char_values[char];
            if (value > pixel) {
                chosen_char = char
                                }
                                    }
          this_y.push(chosen_char)
          
        });
        this_image.push(this_y)
      });
    images_as_chars.push(this_image)
    });
    return images_as_chars;
}

module.exports.processImage = processImage
module.exports.convert_to_text = convert_to_text