document.addEventListener('DOMContentLoaded', () => {
    // Add a pulsing effect to the message
    const message = document.querySelector('.message');
    setInterval(() => {
        message.style.transform = 'scale(1.05)';
        setTimeout(() => {
            message.style.transform = 'scale(1)';
        }, 500);
    }, 3000);

    // Make the cake slightly interactive
    const cake = document.querySelector('.cake');
    cake.addEventListener('mouseenter', () => {
        cake.style.transform = 'scale(1.05)';
    });
    
    cake.addEventListener('mouseleave', () => {
        cake.style.transform = 'scale(1)';
    });
    
    // Create a special effect when clicking on the candle
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    
    candle.addEventListener('click', () => {
        // Make the flame disappear (as if blown out)
        flame.style.opacity = '0';
        flame.style.boxShadow = 'none';
        
        // Create a "wish made" message
        const wishMessage = document.createElement('div');
        wishMessage.textContent = '生日愿望已许下!';
        wishMessage.style.position = 'absolute';
        wishMessage.style.top = '50%';
        wishMessage.style.left = '50%';
        wishMessage.style.transform = 'translate(-50%, -50%)';
        wishMessage.style.fontSize = '2rem';
        wishMessage.style.color = '#FF4081';
        wishMessage.style.fontWeight = 'bold';
        wishMessage.style.textShadow = '0 0 10px rgba(255, 64, 129, 0.5)';
        wishMessage.style.zIndex = '10';
        wishMessage.style.opacity = '0';
        wishMessage.style.transition = 'opacity 1s';
        
        document.body.appendChild(wishMessage);
        
        // Create a massive firework display
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight / 2;
                const event = new MouseEvent('mousemove', {
                    clientX: x,
                    clientY: y
                });
                window.dispatchEvent(event);
            }, i * 100);
        }
        
        // Show the wish message
        setTimeout(() => {
            wishMessage.style.opacity = '1';
        }, 500);
        
        // Remove the wish message after some time
        setTimeout(() => {
            wishMessage.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(wishMessage);
                // Bring back the flame after a while
                flame.style.opacity = '1';
                flame.style.boxShadow = '0 0 20px #ff9800, 0 0 30px #ff5722';
            }, 1000);
        }, 4000);
    });
});