class Firework {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = x;
        this.y = y;
        this.particles = [];
        this.particleCount = 100;
        this.colors = [
            '#FF5252', '#FF4081', '#E040FB', '#7C4DFF', 
            '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', 
            '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', 
            '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'
        ];

        this.init();
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 5 + 2;
            const size = Math.random() * 4 + 1;
            const color = this.colors[Math.floor(Math.random() * this.colors.length)];
            
            this.particles.push({
                x: this.x,
                y: this.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: size,
                color: color,
                alpha: 1,
                lifetime: Math.random() * 30 + 40
            });
        }
    }

    update() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.alpha = p.lifetime / 70;
            p.lifetime--;
            
            if (p.lifetime <= 0) {
                this.particles.splice(i, 1);
                i--;
            }
        }
        
        return this.particles.length > 0;
    }

    draw() {
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.globalAlpha = 1;
    }
}

class FireworksManager {
    constructor() {
        this.canvas = document.getElementById('fireworks-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.fireworks = [];
        this.resizeCanvas();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        window.addEventListener('mousemove', (e) => this.createFirework(e));
        
        this.animate();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createFirework(e) {
        // Create a new firework where the mouse is
        const firework = new Firework(this.canvas, e.clientX, e.clientY);
        this.fireworks.push(firework);
        
        // Limit the number of fireworks to prevent performance issues
        if (this.fireworks.length > 10) {
            this.fireworks.shift();
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.fireworks.length; i++) {
            const active = this.fireworks[i].update();
            this.fireworks[i].draw();
            
            if (!active) {
                this.fireworks.splice(i, 1);
                i--;
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the fireworks manager when the page loads
window.addEventListener('load', () => {
    new FireworksManager();
});