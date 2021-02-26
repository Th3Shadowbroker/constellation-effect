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

module.exports = Particle;