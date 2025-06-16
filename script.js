// Array com os nomes das suas 12 fotos
const photos = [
    'foto1.jpeg',
    'foto2.jpeg',
    'foto3.jpeg',
    'foto4.jpeg',
    'foto5.jpeg',
    'foto6.jpeg',
    'foto7.jpeg',
    'foto8.jpeg',
    'foto9.jpeg',
    'foto10.jpeg',
    'foto11.jpeg',
    'foto12.jpeg'
];

let currentPhotoIndex = 0;

// Função para trocar as fotos automaticamente
function changePhoto() {
    const photoElement = document.getElementById('currentPhoto');
    const photoNumberElement = document.getElementById('currentPhotoNumber');
    
    if (!photoElement || !photoNumberElement) return;
    
    // Adiciona efeito de fade
    photoElement.style.opacity = '0';
    
    setTimeout(() => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        photoElement.src = photos[currentPhotoIndex];
        photoNumberElement.textContent = currentPhotoIndex + 1;
        photoElement.style.opacity = '1';
    }, 500);
}

// Função para calcular o tempo exato de relacionamento
function updateRelationshipTime() {
    // IMPORTANTE: Mude esta data para quando vocês começaram a namorar!
    // Formato: Ano, Mês (0-11), Dia
    // Exemplo: new Date(2020, 7, 15) = 15 de agosto de 2020
    const startDate = new Date(2021, 10, 22); // MUDE ESTA DATA!
    
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Cálculo mais preciso
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Atualiza os elementos na página
    const yearsElement = document.getElementById('years');
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const totalDaysElement = document.getElementById('totalDays');
    
    if (yearsElement) yearsElement.textContent = years;
    if (monthsElement) monthsElement.textContent = months;
    if (daysElement) daysElement.textContent = days;
    if (totalDaysElement) totalDaysElement.textContent = diffDays;
}

// Função para inicializar tudo quando a página carregar
function initializePage() {
    // Atualiza o tempo de relacionamento imediatamente
    updateRelationshipTime();
    
    // Atualiza o tempo de relacionamento a cada minuto (60000 ms)
    setInterval(updateRelationshipTime, 60000);
    
    // Inicia a troca automática de fotos a cada 3 segundos
    setInterval(changePhoto, 3000);
    
    // Define o total de fotos
    const totalPhotosElement = document.getElementById('totalPhotos');
    if (totalPhotosElement) {
        totalPhotosElement.textContent = photos.length;
    }
}

// Inicia tudo quando a página carregar
document.addEventListener('DOMContentLoaded', initializePage);
