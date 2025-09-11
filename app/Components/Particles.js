"use client";
import React, { useEffect, useRef } from "react";

export default function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let neurons = [];
    let connections = [];
    let pulseTimer = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNeurons();
    };

    // Neuron class
    class Neuron {
      constructor(isInput = false) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = isInput ? Math.random() * 4 + 2 : Math.random() * 3 + 1;
        this.baseSize = this.size;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.color = isInput ? "rgba(74, 222, 128, opacity)" : "rgba(168, 85, 247, opacity)";
        this.opacity = isInput ? Math.random() * 0.7 + 0.3 : Math.random() * 0.5 + 0.2;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.05 + 0.02;
        this.isInput = isInput;
        this.activation = 0;
        this.activationDecay = 0.93;
      }

      update() {
        // Move neurons slowly
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Keep within bounds with gentle bounce
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -0.7;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -0.7;
        
        // Apply gentle boundary force
        if (this.x < 0) this.x = 0;
        if (this.x > canvas.width) this.x = canvas.width;
        if (this.y < 0) this.y = 0;
        if (this.y > canvas.height) this.y = canvas.height;
        
        // Natural pulsing
        this.pulsePhase += this.pulseSpeed;
        this.size = this.baseSize * (1 + 0.2 * Math.sin(this.pulsePhase));
        
        // Decay activation
        this.activation *= this.activationDecay;
        
        // Occasionally fire randomly
        if (Math.random() < 0.002) {
          this.activate(0.8 + Math.random() * 0.2);
        }
      }

      activate(strength = 1.0) {
        this.activation = Math.min(1.0, this.activation + strength);
      }

      draw() {
        // Draw glow/aura
        const glowSize = this.size * (2 + this.activation * 3);
        const gradient = ctx.createRadialGradient(
          this.x, this.y, this.size,
          this.x, this.y, glowSize
        );
        
        if (this.isInput) {
          gradient.addColorStop(0, `rgba(74, 222, 128, ${0.7 + this.activation * 0.3})`);
          gradient.addColorStop(0.6, `rgba(74, 222, 128, ${0.2 + this.activation * 0.2})`);
          gradient.addColorStop(1, 'rgba(74, 222, 128, 0)');
        } else {
          gradient.addColorStop(0, `rgba(168, 85, 247, ${0.7 + this.activation * 0.3})`);
          gradient.addColorStop(0.6, `rgba(168, 85, 247, ${0.2 + this.activation * 0.2})`);
          gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw neuron core
        ctx.fillStyle = this.isInput ? 
          `rgba(74, 222, 128, ${this.opacity + this.activation * 0.5})` : 
          `rgba(168, 85, 247, ${this.opacity + this.activation * 0.5})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Connection class
    class Connection {
      constructor(source, target) {
        this.source = source;
        this.target = target;
        this.strength = Math.random();
        this.pulseProgress = 0;
        this.pulseSpeed = 0.05 + Math.random() * 0.03;
        this.active = false;
      }

      update() {
        // Check if source is activated enough to trigger pulse
        if (this.source.activation > 0.3 && Math.random() < 0.5) {
          this.triggerPulse();
        }
        
        // Update pulse animation
        if (this.active) {
          this.pulseProgress += this.pulseSpeed;
          if (this.pulseProgress >= 1) {
            this.active = false;
            this.pulseProgress = 0;
            // Activate target neuron when pulse reaches it
            this.target.activate(this.strength * 0.7);
          }
        }
      }

      triggerPulse() {
        if (!this.active) {
          this.active = true;
          this.pulseProgress = 0;
        }
      }

      draw() {
        const dx = this.target.x - this.source.x;
        const dy = this.target.y - this.source.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 250) return; // Skip drawing distant connections
        
        const opacity = 0.7 * (1 - distance / 250) * this.strength;
        
        if (this.active) {
          // Draw active pulse
          const pulsePos = this.pulseProgress;
          const pulseX = this.source.x + dx * pulsePos;
          const pulseY = this.source.y + dy * pulsePos;
          
          // Pulse dot
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8})`;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 2 + 2 * (1 - Math.abs(pulsePos - 0.5) * 2), 0, Math.PI * 2);
          ctx.fill();
          
          // Connection line with pulse
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.6})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.source.x, this.source.y);
          ctx.lineTo(pulseX, pulseY);
          ctx.stroke();
        } else {
          // Draw inactive connection
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(this.source.x, this.source.y);
          ctx.lineTo(this.target.x, this.target.y);
          ctx.stroke();
        }
      }
    }

    // Initialize neurons and connections
    const initNeurons = () => {
      neurons = [];
      connections = [];
      
      // Create input neurons (green)
      for (let i = 0; i < 15; i++) {
        neurons.push(new Neuron(true));
      }
      
      // Create hidden neurons (purple)
      for (let i = 0; i < 40; i++) {
        neurons.push(new Neuron(false));
      }
      
      // Create connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const dx = neurons[i].x - neurons[j].x;
          const dy = neurons[i].y - neurons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only connect nearby neurons
          if (distance < 200 && Math.random() < 0.3) {
            connections.push(new Connection(neurons[i], neurons[j]));
          }
        }
      }
    };

    // Global pulse effect
    const triggerGlobalPulse = () => {
      // Activate random neurons
      for (let i = 0; i < 5; i++) {
        const randomNeuron = neurons[Math.floor(Math.random() * neurons.length)];
        randomNeuron.activate(0.9);
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update pulse timer
      pulseTimer++;
      if (pulseTimer > 120) { // Global pulse every ~2 seconds
        pulseTimer = 0;
        triggerGlobalPulse();
      }

      // Update and draw connections first (behind neurons)
      for (const connection of connections) {
        connection.update();
        connection.draw();
      }

      // Update and draw neurons
      for (const neuron of neurons) {
        neuron.update();
        neuron.draw();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Initialize and start animation
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="neural-particles absolute inset-0 -z-10"
      style={{ background: "transparent" }}
    />
  );
}