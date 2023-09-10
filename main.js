
const file_handler = require("./file_handler")
const image_width = 50; // number of charchters accross
const image_height = 20; // number of charachters high
const frame_delay_in_ms = 100;// for animations


file_handler.get_images_and_convert_to_text(image_width , image_height) // just display all images once

file_handler.get_images_named_loop_and_play_in_a_loop(image_width , image_height , frame_delay_in_ms)  // play a loop of all images with loop in the name