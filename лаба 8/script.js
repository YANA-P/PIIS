const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');

let isDrawing = false;
let startX, startY;
let selectedShape = 'circle';
let shapes = []; // Array to store drawn shapes

// Event listener for shape selection
document.getElementsByName('shape').forEach(shape => {
    shape.addEventListener('change', (event) => {
        selectedShape = event.target.value;
    });
});

// Start drawing
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

// Drawing
canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    // Clear the canvas and redraw all shapes
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    redrawShapes();

    // Preview the current shape being drawn
    if (selectedShape === 'circle') {
        const radius = Math.sqrt(
            Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
        );
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        ctx.fill();
        ctx.closePath();

    } else if (selectedShape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(
            Math.min(startX, currentX),
            Math.min(startY, currentY),
            Math.abs(width),
            Math.abs(height)
        );
    }
});

// Finish drawing
canvas.addEventListener('mouseup', (event) => {
    isDrawing = false;

    // Add the completed shape to the shapes array
    const currentX = event.offsetX;
    const currentY = event.offsetY;

    if (selectedShape === 'circle') {
        const radius = Math.sqrt(
            Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
        );
        shapes.push({ shape: 'circle', x: startX, y: startY, radius: radius });
    } else if (selectedShape === 'rectangle') {
        const width = currentX - startX;
        const height = currentY - startY;
        shapes.push({
            shape: 'rectangle',
            x: Math.min(startX, currentX),
            y: Math.min(startY, currentY),
            width: Math.abs(width),
            height: Math.abs(height),
        });
    }
});

// Function to redraw all shapes
function redrawShapes() {
    shapes.forEach(item => {
        if (item.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
            ctx.fill();
            ctx.closePath();
        } else if (item.shape === 'rectangle') {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
            ctx.fillRect(item.x, item.y, item.width, item.height);
        }
    });
}

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = []; // Clear the shapes array
});



