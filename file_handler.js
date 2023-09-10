const fs = require('fs');
const path = require('path');

const image_proccessor = require('./image_proccessor');

const dir = 'images';




async function get_local_images( width, height) {
  const imagePixelArrays = []
  const files = fs.readdirSync(dir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.png' || ext === '.jpg' || ext === '.jpeg';
  });

  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    imagePixelArrays.push(await image_proccessor.processImage(filePath , width, height))
  }
  return imagePixelArrays
}

async function get_local_images_named_loop( width, height) {
  const imagePixelArrays = []
  const files = fs.readdirSync(dir);
  const imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return (ext === '.png' || ext === '.jpg' || ext === '.jpeg')  && file.toLowerCase().includes("loop");
  });

  for (const file of imageFiles) {
    const filePath = path.join(dir, file);
    imagePixelArrays.push(await image_proccessor.processImage(filePath , width, height))
  }
  return imagePixelArrays
}





async function get_images_and_convert_to_text(width, height) {
  const imagePixelArrays = await get_local_images(width, height);
  const collected_chars = await image_proccessor.convert_to_text(imagePixelArrays);
  
  collected_chars.forEach((image, imageIndex) => {
    image.forEach((row, rowIndex) => {
      var row_text = ""
      row.forEach((pixel_char, pixel_charIndex) => {
        row_text += pixel_char
      });
      console.log(row_text)
    });
  });
  return collected_chars  
}

async function get_images_named_loop_and_play_in_a_loop(width, height, frame_delay_in_ms) {
  const imagePixelArrays = await get_local_images_named_loop(width, height);
  const collected_chars = await image_proccessor.convert_to_text(imagePixelArrays);

  for (let index = 0; index < 99; index++) {
    for (const image of collected_chars) {
      for (const row of image) {
        let row_text = "";
        for (const pixel_char of row) {
          row_text += pixel_char;
        }
        console.log(row_text);
      }
      
      // Introduce a 500ms delay before processing the next image
      await new Promise((resolve) => setTimeout(resolve, frame_delay_in_ms));
    }
  }
}

module.exports.get_images_and_convert_to_text = get_images_and_convert_to_text;
module.exports.get_images_named_loop_and_play_in_a_loop = get_images_named_loop_and_play_in_a_loop;