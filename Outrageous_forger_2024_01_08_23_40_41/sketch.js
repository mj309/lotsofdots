let canvasSize = 500;
let ellipses = [];
let maxDistance = 750;
let maxAllowedMovement = 25;
let easingFactor = -0.0000001; // Extremely slow movement
let ellipseSpeed = 0.01; // Default speed
let maxSpeed = 5; // Maximum speed for color change
let maxHue = 60; // Maximum hue value for color change
let minSaturation = 30; // Minimum saturation value

function setup() {
  createCanvas(canvasSize, canvasSize);
  colorMode(HSB, 100); // Set color mode to HSB
  background(0);

  redrawGrid();
}

function redrawGrid() {
  const ellipseSize = 3; // Default size set to 3px
  const gridSize = 50; // Default grid size set to 50
  ellipses = [];

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      let x = j * (canvasSize / gridSize) + (canvasSize / gridSize) / 2;
      let y = i * (canvasSize / gridSize) + (canvasSize / gridSize) / 2;
      ellipses.push({ x, y, originalX: x, originalY: y });
    }
  }

  for (let i = 0; i < ellipses.length; i++) {
    let { x, y } = ellipses[i];
    noStroke();
    fill(0, 0, 100); // White color
    ellipse(x, y, ellipseSize, ellipseSize);
  }
}

function draw() {
  background(0);

  for (let i = 0; i < ellipses.length; i++) {
    let { x, y, originalX, originalY } = ellipses[i];
    let d = dist(x, y, mouseX, mouseY);

    // Calculate the speed of the ellipse
    let speed = dist(originalX, originalY, x, y);

    // Map the speed to a hue value
    let hue = map(speed, 0, maxSpeed, 0, maxHue); // Adjust the hue range as needed

    // Set the fill color based on the mapped hue
    fill(hue, 100, 100); // Using HSB color mode

    if (d < maxDistance) {
      let dx = mouseX - x;
      let dy = mouseY - y;
      let distanceMultiplier = map(d, 0, maxDistance, 1, 0);

      let maxAllowedDist = map(d, 0, maxDistance, maxAllowedMovement, 0);
      maxAllowedDist = constrain(maxAllowedDist, 0, maxAllowedMovement);

      x += dx * ellipseSpeed * distanceMultiplier;
      y += dy * ellipseSpeed * distanceMultiplier;

      let distanceFromOriginal = dist(x, y, originalX, originalY);
      if (distanceFromOriginal > maxAllowedDist) {
        let angle = atan2(y - originalY, x - originalX);
        x = originalX + cos(angle) * maxAllowedDist;
        y = originalY + sin(angle) * maxAllowedDist;
      }
    } else {
      let dx = originalX - x;
      let dy = originalY - y;
      x += dx * easingFactor;
      y += dy * easingFactor;
    }

    ellipses[i] = { x, y, originalX, originalY };
    noStroke();
    ellipse(x, y, 3, 3); // Use a fixed size instead of the slider value
  }
}
