const API_KEY = 'AIzaSyAioPdo89J5-nS1T4xpOpuA-HGE93YMkS0'; 

const youtubers = [
    {
        name: "Felpo",
        channelId: "UCgHmybParZzCheOSMQo7Iag",
        desc: "Programador mid e as vezes grava vídeos",
        color: "from-stone-950 to-stone-950",
        neonRgb: "0, 146, 184",
        image: "assets/felpo.png", 
        link: "https://www.youtube.com/@Felpozin"
    },
    {
        name: "Kan",
        channelId: "UCIjRLWVwvHQ_Lr7DcGTe5bw",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "255, 32, 86",
        image: "assets/kan.png",
        link: "https://www.youtube.com/@kanfof"
    },
    {
        name: "Bruth",
        channelId: "UCak2awiizUoGLu0psOcq8Xg",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "231, 0, 11",
        image: "assets/bruth.png",
        link: "https://www.youtube.com/@justmebruth"
    },
    {
        name: "Ivy",
        channelId: "",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "77, 23, 154",
        image: "assets/ivy.png",
        link: "#"
    },
    {
        name: "Poiro",
        channelId: "",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "159, 7, 18",
        image: "assets/davi.png",
        link: "#"
    },
    {
        name: "Lugurte",
        channelId: "UCvZ9jwy1crDEN-Hvr55o-KQ",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "236, 72, 153",
        image: "assets/lugurte.png",
        link: "https://www.youtube.com/@oilugurte"
    },
    {
        name: "Didito",
        channelId: "UCHzcJRIHSBbratHpCg8b8lw",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "68, 63, 209",
        image: "assets/didito.png",
        link: "https://www.youtube.com/@diditohut"
    },
    {
        name: "Finn",
        channelId: "",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "177, 170, 134",
        image: "assets/finn.png",
        link: "#"
    },
    {
        name: "Gabu",
        channelId: "",
        desc: "Animador e ilustrador.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "38, 28, 23",
        image: "assets/gabu.png",
        link: "#"
    }
];

const container = document.getElementById('card-container');

function formatSubscribers(count) {
    if (count === null || count === undefined) return "---";
    return Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(count);
}

async function fetchYouTubeStats(channelId, element) {
    if (!channelId || channelId.trim() === "") {
        element.innerText = "Sem Canal";
        return;
    }

    try {
        const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Erro na API');
        
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            const subs = stats.hiddenSubscriberCount ? 0 : Number(stats.subscriberCount);

            if (subs === 0) {
                element.innerText = "Sem Canal";
            } else {
                element.innerText = `${formatSubscribers(subs)} Inscritos`;
            }
        } else {
            element.innerText = "Sem Canal";
        }

    } catch (error) {
        console.error(error);
        element.innerText = "Offline"; 
    }
}

youtubers.forEach(yt => {
    const cardWrapper = document.createElement('div');
    
    cardWrapper.className = `
        card-neon-wrapper group relative w-full h-full rounded-3xl 
        z-0
    `;
    
    cardWrapper.style.setProperty('--neon-rgb', yt.neonRgb);

    cardWrapper.innerHTML = `
        <div class="relative w-full h-full rounded-3xl overflow-hidden bg-[#121212] ring-1 ring-white/10 transition-transform duration-300">
            <div class="absolute inset-0 w-full h-full">
                <img src="${yt.image}" alt="${yt.name}" 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    onerror="this.src='https://via.placeholder.com/400x600/000000/FFFFFF/?text=No+Image'">
            </div>

            <div class="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>
            <div class="absolute inset-0 bg-gradient-to-t ${yt.color} opacity-0 group-hover:opacity-25 transition-opacity duration-500 mix-blend-overlay"></div>

            <div class="absolute bottom-0 left-0 w-full p-6 pb-8 flex flex-col justify-end h-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
                
                <span id="subs-${yt.name}" class="js-subs inline-flex items-center w-max px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider text-white bg-white/5 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 -translate-x-2 group-hover:translate-x-0">
                    Carregando...
                </span>

                <h2 class="text-3xl font-black text-white mb-1 drop-shadow-md transition-all">
                    ${yt.name}
                </h2>

                <div class="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                    <div class="overflow-hidden">
                        <p class="text-white text-sm leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                            ${yt.desc}
                        </p>
                        
                        <a href="${yt.link}" target="_blank" class="mt-5 inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold text-sm transition-all duration-300 opacity-0 group-hover:opacity-100 delay-300">
                            Acessar Canal <i data-lucide="arrow-right" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(cardWrapper);

    const subsElement = cardWrapper.querySelector(`#subs-${yt.name}`);
    fetchYouTubeStats(yt.channelId, subsElement);
});

lucide.createIcons();

if (typeof Sortable !== 'undefined') {
    const el = document.getElementById('card-container');
    
    if (Sortable.prototype.hasOwnProperty('mount') && typeof Sortable.mount === 'function') {
    }

    new Sortable(el, {
        swap: true, 
        swapClass: 'highlight-swap', 
        animation: 150, 
        
        forceFallback: true, 
        fallbackTolerance: 3, 
        
        ghostClass: 'sortable-ghost', 
        dragClass: 'sortable-drag',   
        
        delay: 100, 
        delayOnTouchOnly: true,
        
        onStart: function (evt) {
            document.body.classList.add('is-dragging', 'select-none', 'cursor-grabbing');
            
            const cards = document.querySelectorAll('.card-neon-wrapper');
            cards.forEach(card => card.classList.remove('group'));
        },
        onEnd: function (evt) {
            document.body.classList.remove('is-dragging', 'select-none', 'cursor-grabbing');
            
            const cards = document.querySelectorAll('.card-neon-wrapper');
            cards.forEach(card => card.classList.add('group'));
        },
    });
}