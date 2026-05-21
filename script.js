document.addEventListener('DOMContentLoaded', () => {
    const garden = document.getElementById('garden');
    const foliageGroup = document.getElementById('foliage-group');

    // 1. Renderizar Follaje sobre la estructura de ramas del SVG
    const focosRamas = [
        {x: 50, y: 120, cantidad: 35},
        {x: 80, y: 150, cantidad: 25},
        {x: 255, y: 100, cantidad: 35},
        {x: 215, y: 150, cantidad: 25},
        {x: 120, y: 60, cantidad: 40},
        {x: 145, y: 95, cantidad: 25}
    ];

    const tonosVerdes = ['#1b5e20', '#2e7d32', '#388e3c', '#4caf50', '#66bb6a', '#81c784'];

    focosRamas.forEach((foco) => {
        for (let i = 0; i < foco.cantidad; i++) {
            const angulo = Math.random() * Math.PI * 2;
            const radio = Math.random() * 45;
            const leafX = foco.x + Math.cos(angulo) * radio;
            const leafY = foco.y + Math.sin(angulo) * radio;

            const leafPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            leafPath.setAttribute("d", "M0,0 C8,-8 12,-4 15,0 C12,4 8,8 0,0 Z");
            leafPath.setAttribute("fill", tonosVerdes[Math.floor(Math.random() * tonosVerdes.length)]);
            leafPath.setAttribute("class", "leaf-cluster");
            
            const escala = 0.6 + Math.random() * 0.7;
            const rotacion = Math.random() * 360;
            leafPath.setAttribute("transform", `translate(${leafX}, ${leafY}) rotate(${rotacion}) scale(${escala})`);
            leafPath.style.animationDelay = `${Math.random() * 3}s`;

            foliageGroup.appendChild(leafPath);
        }
    });

    // 2. Generar el Gran Jardín de Lirios Denso (Matriz controlada sin superposición caótica)
    const columnas = 28; 
    const filas = 5;
    const campoAlto = 110; 
    
    for (let fila = 0; fila < filas; fila++) {
        for (let col = 0; col < columnas; col++) {
            const lily = document.createElement('div');
            lily.className = 'lily';
            
            lily.innerHTML = `
                <svg width="30" height="50" viewBox="0 0 40 60">
                    <path d="M20,60 Q19,40 20,25" stroke="#2e6f25" stroke-width="3" fill="none"/>
                    <path d="M20,45 Q12,42 9,37" stroke="#2e6f25" stroke-width="2" fill="none"/>
                    <path d="M20,40 Q28,37 31,32" stroke="#2e6f25" stroke-width="2" fill="none"/>
                    <path d="M20,28 C10,25 6,10 12,5 C16,2 18,12 20,25 C22,12 24,2 28,5 C34,10 30,25 20,28 Z" fill="#ffffff"/>
                    <circle cx="20" cy="11" r="2.5" fill="#fbc02d"/>
                    <line x1="20" y1="18" x2="20" y2="11" stroke="#fbc02d" stroke-width="1"/>
                </svg>
            `;

            const baseX = (col / columnas) * 100;
            const baseY = (fila / filas) * campoAlto;

            const jitterX = (Math.random() * (100 / columnas)) * 0.4; 
            const jitterY = (Math.random() * (campoAlto / filas)) * 0.3;

            const finalX = baseX + jitterX;
            const finalY = baseY + jitterY;

            lily.style.left = `${finalX}%`;
            lily.style.bottom = `${finalY}px`;
            lily.style.animationDelay = `${Math.random() * 3}s`;
            
            const escala = 0.65 + (fila / filas) * 0.45;
            lily.style.transform = `scale(${escala})`;
            lily.style.zIndex = Math.floor(finalY);
            
            garden.appendChild(lily);
        }
    }

    // 3. Temporizador configurado para el 13 de Marzo de 2026
    const fechaInicio = new Date('2026-03-13T00:00:00');

    function actualizarContador() {
        const ahora = new Date();
        const diferencia = ahora - fechaInicio;

        if (diferencia < 0) return;

        const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diferencia / (1000 * 60)) % 60);
        const s = Math.floor((diferencia / 1000) % 60);

        document.getElementById('days').innerText = d;
        document.getElementById('hours').innerText = h.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
    }

    setInterval(actualizarContador, 1000);
    actualizarContador();
});