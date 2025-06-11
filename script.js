document.addEventListener('DOMContentLoaded', function() {
    // --- Referências aos Elementos ---
    const mainSection = document.getElementById('main-section');
    const secondSection = document.getElementById('second-section'); 
    const valentinesButton = document.getElementById('valentines-button');
    const backButton = document.getElementById('back-button');
    const timeTogetherGlobalElement = document.getElementById('time-together-global'); 
    
    // Música de fundo
    const backgroundMusic = document.getElementById('background-music');
    const playPauseButton = document.getElementById('play-pause-button');
    let isPlaying = false; 

    // **IMPORTANTE**: Defina a data de início do relacionamento aqui
    // Formato: Ano, Mês (0=Janeiro, 1=Fevereiro...), Dia, Hora, Minuto, Segundo
    // Exemplo: para 12 de Junho de 2023, use new Date(2023, 5, 12, 0, 0, 0);
    // (Lembre-se que os meses em JavaScript vão de 0 a 11, então Junho é 5)
    const startDate = new Date(2024, 10, 2, 22, 27, 0); 

    // --- Lógica do Contador de Tempo ---
    function updateTimeTogether() {
        const now = new Date();
        const diff = now - startDate; 

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30.44); 
        const years = Math.floor(days / 365.25); 

        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        const currentYear = now.getFullYear();
        const startYear = startDate.getFullYear();
        let displayYears = currentYear - startYear;
        
        let tempDate = new Date(startDate);
        tempDate.setFullYear(startYear + displayYears);
        
        if (tempDate > now) {
            displayYears--;
            tempDate.setFullYear(startYear + displayYears);
        }

        let displayMonths = 0;
        let monthsDiff = (now.getFullYear() - tempDate.getFullYear()) * 12;
        monthsDiff -= tempDate.getMonth();
        monthsDiff += now.getMonth();
        displayMonths = monthsDiff % 12;

        let displayDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
        if (displayDays < 0) {
            tempDate.setMonth(tempDate.getMonth() - 1);
            displayDays = Math.floor((now - tempDate) / (1000 * 60 * 60 * 24));
        }


        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;

        const timeString = `
            <span class="highlight">${displayYears}</span> ano${displayYears !== 1 ? 's' : ''}, 
            <span class="highlight">${displayMonths}</span> mês${displayMonths !== 1 ? 'es' : ''}, 
            <span class="highlight">${displayDays}</span> dia${displayDays !== 1 ? 's' : ''},<br>
            <span class="highlight">${remainingHours}</span> hora${remainingHours !== 1 ? 's' : ''}, 
            <span class="highlight">${remainingMinutes}</span> minuto${remainingMinutes !== 1 ? 's' : ''} e 
            <span class="highlight">${remainingSeconds}</span> segundo${remainingSeconds !== 1 ? 's' : ''}!
        `;

        if (timeTogetherGlobalElement) { 
            timeTogetherGlobalElement.querySelector('.time-together-text').innerHTML = `Estamos juntos há:<br>${timeString}`; 
        }
    }

    // Atualiza o tempo a cada segundo
    setInterval(updateTimeTogether, 1000);
    // Chama a função uma vez para exibir o tempo imediatamente ao carregar a página
    updateTimeTogether(); 

    // --- Lógica de Transição entre Seções ---
    valentinesButton.addEventListener('click', function() {
        console.log('Botão "Feliz Dia dos Namorados!" clicado. Transicionando para segunda seção.');
        mainSection.classList.remove('active-section');
        mainSection.classList.add('inactive-section');

        secondSection.classList.remove('inactive-section'); 
        secondSection.classList.add('active-section');

        // Adicionar animação de entrada para o texto na segunda seção
        const customMessage = secondSection.querySelector('.custom-message-second-section');
        const eternalMessage = secondSection.querySelector('.eternal-message');
        if (customMessage) {
            customMessage.style.opacity = '0';
            customMessage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                customMessage.style.opacity = '1';
                customMessage.style.transform = 'translateY(0)';
            }, 100); 
        }
        if (eternalMessage) {
            eternalMessage.style.opacity = '0';
            eternalMessage.style.transform = 'translateY(20px)';
            setTimeout(() => {
                eternalMessage.style.opacity = '1';
                eternalMessage.style.transform = 'translateY(0)';
            }, 600); 
        }
    });

    backButton.addEventListener('click', function() {
        console.log('Botão "Voltar" clicado. Transicionando para seção principal.');
        secondSection.classList.remove('active-section'); 
        secondSection.classList.add('inactive-section');

        mainSection.classList.remove('inactive-section');
        mainSection.classList.add('active-section');

        // Resetar a animação do texto ao voltar
        const customMessage = secondSection.querySelector('.custom-message-second-section');
        const eternalMessage = secondSection.querySelector('.eternal-message');
        if (customMessage) {
            customMessage.style.opacity = '0';
            customMessage.style.transform = 'translateY(20px)';
        }
        if (eternalMessage) {
            eternalMessage.style.opacity = '0';
            eternalMessage.style.transform = 'translateY(20px)';
        }
    });

    // --- Lógica da Música de Fundo ---
    // Verifica se os elementos de áudio existem antes de adicionar o listener
    if (playPauseButton && backgroundMusic) {
        playPauseButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    isPlaying = true;
                    playPauseButton.textContent = 'Pausar Música';
                    console.log('Música tocando.');
                }).catch(error => {
                    console.error('Erro ao tentar tocar a música:', error);
                    alert('O navegador pode ter bloqueado o autoplay. Por favor, interaja com a página para tocar a música.');
                });
            } else {
                backgroundMusic.pause();
                isPlaying = false;
                playPauseButton.textContent = 'Tocar Música';
                console.log('Música pausada.');
            }
        });
    } else {
        console.warn('Elementos de música (botão ou áudio) não encontrados. Verifique o HTML.');
    }
});