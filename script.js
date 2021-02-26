/**
 * The magic canvas!
 */
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/**
 * We need some context!
 * @type {CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');

/**
 * Track the mouse.
 */
canvas.addEventListener('mousemove', e => {
    if (particles.length + 2 < 200) {
        for (let i = 0; i < 2; i++) particles.push(new Particle(e.x, e.y, ctx));
    }
});

/**
 * All the particles ✨
 * @type {Particle[]}
 */
const particles = [];

/**
 * Somewhere over the rainbow 🌈
 */
let hue = 0;

/**
 * The particle ✨
 */
class Particle {

    /**
     * Constructor of Particle.
     * @param {number} x 
     * @param {number} y 
     * @param {CanvasRenderingContext2D} ctx 
     */
    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.color = `hsl(${hue}, 100%, 50%)`;
        this.size = (Math.random() * 10) + 1;
        this.xSpeed = (Math.random() * 3) + 1.5;
        this.ySpeed = (Math.random() * 3) + 1.5;
    }

    /**
     * Updates x and y and shrinks down the particle.
     */
    update() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.shrink();
    }

    /**
     * shrinks down the particle.
     */
    shrink() {
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    /**
     * Draws the particle.
     */
    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    /**
     * Draws the lines to nearby particles.
     * @param {number} originX 
     * @param {number} originY 
     * @param {number} targetX 
     * @param {number} targetY 
     */
    drawLines(originX, originY, targetX, targetY) {
        const directionX = originX - targetX;
        const directionY = originY - targetY;
        const distance = Math.sqrt((directionX * directionX) + (directionY * directionY));

        if (distance <= 100) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = 0.2;
            this.ctx.moveTo(originX, originY);
            this.ctx.lineTo(targetX, targetY);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }

}

/**
 * Adds hue 😎
 */
function addHue() {
    hue++
    if (hue > 360) hue = 0;
    return hue;
}

/**
 * Let's go!
 */
function playEffect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const originParticle = particles[i];
        originParticle.update();
        originParticle.draw();

        for (let j = i; j < particles.length; j++) {
            const targetParticle = particles[j];
            originParticle.drawLines(originParticle.x, originParticle.y, targetParticle.x, targetParticle.y);
        }

        if (originParticle.size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }

    addHue();
    requestAnimationFrame(playEffect);
}

// Give it a nudge Mister Freeman
playEffect();