let dots = [];
let easing = 0.05;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Create initial random dots
  for (let i = 0; i < 100; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      targetX: random(width),
      targetY: random(height),
      radius: random(2, 50)
    });
  }
}

function draw() {
  background(0);

  // Update and display each dot
  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];

    // Calculate distance from the cursor
    let d = dist(mouseX, mouseY, dot.x, dot.y);

    // Calculate the target radius based on distance
    let targetRadius = map(d, 0, width, 2, 50);

    // Ease the rate of growth
    dot.radius += (targetRadius - dot.radius) * easing;

    // Ease the movement to the new position
    dot.x += (dot.targetX - dot.x) * easing;
    dot.y += (dot.targetY - dot.y) * easing;

    // Display the dot
    fill(255);
    ellipse(dot.x, dot.y, dot.radius * 2, dot.radius * 2);
  }
}

function mouseClicked() {
  // Set new target positions for the dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].targetX = random(width);
    dots[i].targetY = random(height);
  }
}
