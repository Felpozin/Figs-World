const API_KEY = 'AIzaSyAioPdo89J5-nS1T4xpOpuA-HGE93YMkS0'; 

const youtubers = [
    {
        name: "Felpo",
        channelId: "UCgHmybParZzCheOSMQo7Iag",
        desc: "Programador mid e as vezes grava vídeos",
        color: "from-stone-950 to-stone-950",
        neonRgb: "0, 146, 184",
        image: "assets/felpo.png", 
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@Felpozin" },
            { name: "Twitter", icon: "twitter", url: "https://x.com/FelpoDev" },
            { name: "GitHub", icon: "github", url: "https://github.com/Felpozin" }
        ]
    },
    {
        name: "Kan",
        channelId: "UCIjRLWVwvHQ_Lr7DcGTe5bw",
        desc: "O cogumelo mais gostoso do Brasil.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "255, 32, 86",
        image: "assets/kan.png",
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@kanfof" },
        ]
    },
    {
        name: "Bruth",
        channelId: "UCak2awiizUoGLu0psOcq8Xg",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "231, 0, 11",
        image: "assets/bruth.png",
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@justmebruth" },
            { name: "TikTok", icon: "tiktok", url: "https://www.tiktok.com/@justmebruth" },
        ]
    },
    {
        name: "Ivy",
        channelId: "UCbHkPrppTdN2tH-PXuzf-fg",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "77, 23, 154",
        image: "assets/ivy.png",
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@MBForReal" },
        ]
    },
    {
        name: "Poiro",
        channelId: "UComZTK0yCIhyKkkAD9MRnAQ",
        desc: "Poiro e seus amigos",
        color: "from-stone-950 to-stone-950",
        neonRgb: "159, 7, 18",
        image: "assets/davi.png",
        socials: [
            { name: "Youtube", icon: "youtube", url: "https://www.youtube.com/@poirobacana" }
        ]
    },
    {
        name: "Lugurte",
        channelId: "UCvZ9jwy1crDEN-Hvr55o-KQ",
        desc: "Meninacraft",
        color: "from-stone-950 to-stone-950",
        neonRgb: "236, 72, 153",
        image: "assets/lugurte.png",
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@oilugurte" },
            { name: "Twitter", icon: "twitter", url: "https://x.com/lugurte" }
        ]
    },
    {
        name: "Didito",
        channelId: "UCHzcJRIHSBbratHpCg8b8lw",
        desc: "lorem ipsum dolor sit amet.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "68, 63, 209",
        image: "assets/didito.png",
        socials: [
            { name: "YouTube", icon: "youtube", url: "https://www.youtube.com/@diditohut" }
        ]
    },
    {
        name: "Finn",
        channelId: "",
        desc: "_",
        color: "from-stone-950 to-stone-950",
        neonRgb: "177, 170, 134",
        image: "assets/finn.png",
        socials: []
    },
    {
        name: "Gabu",
        channelId: "",
        desc: "Animador e ilustrador.",
        color: "from-stone-950 to-stone-950",
        neonRgb: "38, 28, 23",
        image: "assets/gabu.png",
        socials: [
            { name: "Instagram", icon: "instagram", url: "https://www.instagram.com/zooonta/" },
            { name: "Behance", icon: "behance", url: "https://www.behance.net/zooonta" }
        ]
    }
];

const container = document.getElementById('card-container');
const modal = document.getElementById('profile-modal');
const modalContent = document.getElementById('modal-content');
const modalBody = document.getElementById('modal-body');

let activeMobileCard = null;

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

function openModal(yt) {
    if (document.body.classList.contains('is-dragging')) return;

    document.body.style.overflow = 'hidden';

    const socialButtonsHtml = yt.socials.map(social => {
        let iconHtml;

        if (social.icon === 'tiktok') {
            iconHtml = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                </svg>
            `;
        } else if (social.icon === 'behance') {
            iconHtml = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                    <path d="M6.2 7h2.5c2.3 0 3.6 1.3 3.6 3.4 0 1-.4 1.8-1.1 2.4.9.5 1.6 1.3 1.6 2.5 0 2.4-1.6 3.7-4 3.7H6.2V7zm2.4 4.5h.5c.8 0 1.2-.4 1.2-1.2s-.4-1.1-1.2-1.1h-.5v2.3zm0 5.2h.8c.9 0 1.4-.5 1.4-1.4 0-1-.5-1.5-1.4-1.5h-.8v2.9zM16.5 12h5.1c0-2.6-1.9-4.3-4.5-4.3-2.6 0-4.6 1.9-4.6 4.7s1.9 4.6 4.6 4.6c1.8 0 3.2-.8 3.9-2.2l-1.9-1c-.3.5-.9.9-1.9.9-1.2 0-2-.8-2.2-2.1h6v-.6zm-4-1.7c.1-1.1.9-1.9 2-1.9 1 0 1.9.8 1.9 1.9h-3.9zM17.5 6h4v1.5h-4V6z"/>
                </svg>
            `;
        } else {
            iconHtml = `<i data-lucide="${social.icon}" class="w-5 h-5"></i>`;
        }

        return `
        <a href="${social.url}" target="_blank" 
           class="flex items-center gap-3 w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/btn">
            <div class="p-2 rounded-full bg-white/5 text-[rgb(${yt.neonRgb})] group-hover/btn:bg-[rgba(${yt.neonRgb},0.2)] transition-colors">
                ${iconHtml}
            </div>
            <span class="font-bold tracking-wide text-[rgb(${yt.neonRgb})]">${social.name}</span>
            <i data-lucide="external-link" class="w-4 h-4 ml-auto text-white/30 group-hover/btn:text-white transition-colors"></i>
        </a>
        `;
    }).join('');

    const noSocialsHtml = `<div class="text-white/40 text-center py-4">Nenhuma rede social informada.</div>`;

    modalBody.innerHTML = `
        <div class="relative h-48 w-full overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-[rgb(${yt.neonRgb})] to-[#121212] opacity-40"></div>
            <img src="${yt.image}" class="w-full h-full object-cover opacity-60 mask-image-b">
        </div>
        
        <div class="px-8 pb-8 -mt-12 relative z-10">
            <div class="flex flex-col items-center text-center">
                <div class="w-24 h-24 rounded-full p-1 bg-[#121212] shadow-2xl mb-4">
                    <img src="${yt.image}" class="w-full h-full rounded-full object-cover border-2 border-[rgb(${yt.neonRgb})]">
                </div>
                
                <h2 class="text-3xl font-black text-white mb-2">${yt.name}</h2>
                <p class="text-gray-400 text-sm mb-6 max-w-xs leading-relaxed">${yt.desc}</p>
                
                <div class="w-full grid grid-cols-1 gap-3">
                    ${yt.socials.length > 0 ? socialButtonsHtml : noSocialsHtml}
                </div>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    setTimeout(() => {
        modalContent.classList.remove('scale-95', 'opacity-0');
        modalContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    lucide.createIcons();
}

window.closeModal = function() {
    modalContent.classList.remove('scale-100', 'opacity-100');
    modalContent.classList.add('scale-95', 'opacity-0');
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modalBody.innerHTML = ''; 
        document.body.style.overflow = '';
    }, 300);
}

document.addEventListener('click', (e) => {
    if (!e.target.closest('.card-neon-wrapper')) {
        activeMobileCard = null;
    }
});

youtubers.forEach(yt => {
    const cardWrapper = document.createElement('div');
    
    cardWrapper.className = `
        card-neon-wrapper group relative w-full h-full rounded-3xl 
        z-0
    `;
    
    cardWrapper.style.setProperty('--neon-rgb', yt.neonRgb);

    cardWrapper.addEventListener('click', (e) => {
        const isMobile = window.matchMedia("(pointer: coarse)").matches;
        
        if (isMobile) {
            if (activeMobileCard === yt.name) {
                openModal(yt);
                activeMobileCard = null;
            } else {
                activeMobileCard = yt.name;
            }
        } else {
            openModal(yt);
        }
    });

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
                        
                        <div class="mt-4 flex items-center gap-2 text-[rgb(${yt.neonRgb})] text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all delay-300">
                            <i data-lucide="mouse-pointer-2" class="w-4 h-4"></i> Clique para ver redes
                        </div>
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
    
    new Sortable(el, {
        swap: true, 
        swapClass: 'highlight-swap', 
        animation: 150, 
        
        forceFallback: true, 
        fallbackTolerance: 3, 
        
        ghostClass: 'sortable-ghost', 
        dragClass: 'sortable-drag',   
        
        delay: 300, 
        delayOnTouchOnly: true,
        touchStartThreshold: 5, 
        
        onStart: function (evt) {
            document.body.classList.add('is-dragging', 'select-none', 'cursor-grabbing');
            
            const cards = document.querySelectorAll('.card-neon-wrapper');
            cards.forEach(card => card.classList.remove('group'));
        },
        onEnd: function (evt) {
            setTimeout(() => {
                document.body.classList.remove('is-dragging', 'select-none', 'cursor-grabbing');
            }, 100);
            
            const cards = document.querySelectorAll('.card-neon-wrapper');
            cards.forEach(card => card.classList.add('group'));
        },
    });
}