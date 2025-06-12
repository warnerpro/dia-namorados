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
    const startDate = new Date(2021, 11, 22); // MUDE ESTA DATA!
    
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
    
}

// Função para animar os números do contador
function animateCounters() {
    const timeNumbers = document.querySelectorAll('.time-number');
    timeNumbers.forEach(number => {
        number.style.transform = 'scale(1.1)';
        setTimeout(() => {
            number.style.transform = 'scale(1)';
        }, 200);
    });
}

// Função para tratar erros de carregamento de imagem
function handleImageError(img) {
    img.style.display = 'none';
    console.log('Erro ao carregar imagem:', img.src);
    // Tenta a próxima foto
    setTimeout(changePhoto, 1000);
}

// Inicializa tudo quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página carregada, iniciando...');
    
    // Atualiza o contador de tempo
    updateRelationshipTime();
    
    // Atualiza o total de fotos
    const totalPhotosElement = document.getElementById('totalPhotos');
    if (totalPhotosElement) {
        totalPhotosElement.textContent = photos.length;
    }
    
    // Configura a primeira foto
    const photoElement = document.getElementById('currentPhoto');
    if (photoElement) {
        photoElement.src = photos[0];
        photoElement.onerror = function() {
            handleImageError(this);
        };
        
        // Adiciona evento de clique na foto para trocar manualmente
        photoElement.addEventListener('click', changePhoto);
    }
    
    // Troca as fotos a cada 4 segundos
    setInterval(changePhoto, 4000);
    
    // Anima os contadores a cada 10 segundos
    setInterval(animateCounters, 10000);
    
    console.log('Configuração concluída!');
});