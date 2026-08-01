import React, { useEffect, useRef } from 'react';

export default function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.init();
      }

      init() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 80;
        this.size = Math.random() * 3.5 + 1.5;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.6;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.4 ? '#fd6c9c' : '#cca730'; // Blush Rose or Antique Gold
        this.isHeart = Math.random() > 0.6;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -20) this.init();
      }

      draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;

        if (this.isHeart) {
          // Draw tiny heart
          ctx.beginPath();
          const x = this.x;
          const y = this.y;
          const s = this.size * 1.5;
          ctx.moveTo(x, y);
          ctx.bezierCurveTo(x - s / 2, y - s / 2, x - s, y + s / 3, x, y + s);
          ctx.bezierCurveTo(x + s, y + s / 3, x + s / 2, y - s / 2, x, y);
          ctx.fill();
        } else {
          // Draw sparkle circle
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    for (let i = 0; i < 45; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none w-full h-full"
    />
  );
}
