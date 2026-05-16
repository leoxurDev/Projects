// Ben 10 Aliens Data from provided JSON
const originalAliensData = {
  "aliens": [
    {"name":"Heatblast","species":"Pyronite","planet":"Pyros","series":"classic","powers":"Pyrokinesis, fire immunity, flight via fire propulsion, heat generation","imageUrl":"https://static.wikia.nocookie.net/ben10/images/c/c6/Heatblast_OV.png"},
    {"name":"Four Arms","species":"Tetramand","planet":"Khoros","series":"classic","powers":"Super strength, four arms, enhanced durability, combat skills","imageUrl":"https://static.wikia.nocookie.net/ben10/images/e/e4/Four_Arms_OV.png"},
    {"name":"Diamondhead","species":"Petrosapien","planet":"Petropia","series":"classic","powers":"Crystal body, crystal projectiles, light refraction, regeneration","imageUrl":"https://static.wikia.nocookie.net/ben10/images/9/98/Diamondhead_OV.png"},
    {"name":"XLR8","species":"Kineceleran","planet":"Kinet","series":"classic","powers":"Super speed, enhanced reflexes, time manipulation perception, wall running","imageUrl":"https://static.wikia.nocookie.net/ben10/images/2/28/XLR8_OV.png"},
    {"name":"Grey Matter","species":"Galvan","planet":"Galvan Prime","series":"classic","powers":"Super intelligence, small size, technological expertise, problem solving","imageUrl":"https://static.wikia.nocookie.net/ben10/images/e/e2/Grey_Matter_OV.png"},
    {"name":"Wildmutt","species":"Vulpimancer","planet":"Vulpin","series":"classic","powers":"Enhanced senses, agility, no eyes but enhanced hearing and smell","imageUrl":"https://static.wikia.nocookie.net/ben10/images/4/43/Wildmutt_OV.png"},
    {"name":"Stinkfly","species":"Lepidopterran","planet":"Lepidopterra","series":"classic","powers":"Flight, adhesive slime, insect physiology, sharp tail","imageUrl":"https://static.wikia.nocookie.net/ben10/images/a/a2/Stinkfly_OV.png"},
    {"name":"Ripjaws","species":"Piscciss Volann","planet":"Piscciss","series":"classic","powers":"Underwater breathing, powerful jaws, swimming, bioluminescence","imageUrl":"https://static.wikia.nocookie.net/ben10/images/5/56/Ripjaws_OV.png"},
    {"name":"Upgrade","species":"Galvanic Mechamorph","planet":"Galvan B","series":"classic","powers":"Technology integration, shapeshifting, enhancement, liquid metal form","imageUrl":"https://static.wikia.nocookie.net/ben10/images/6/69/Upgrade_OV.png"},
    {"name":"Ghostfreak","species":"Ectonurite","planet":"Anur Phaetos","series":"classic","powers":"Invisibility, intangibility, possession, flight, tentacles","imageUrl":"https://static.wikia.nocookie.net/ben10/images/7/72/Ghostfreak_OV.png"},

    {"name":"Swampfire","species":"Methanosian","planet":"Methanos","series":"alienforce","powers":"Pyrokinesis, plant manipulation, regeneration, gas immunity","imageUrl":"https://static.wikia.nocookie.net/ben10/images/c/c6/Swampfire_AF.png"},
    {"name":"Echo Echo","species":"Sonorosian","planet":"Sonorosia","series":"alienforce","powers":"Sound manipulation, sonic screams, duplication, echolocation","imageUrl":"https://static.wikia.nocookie.net/ben10/images/c/c1/Echo_Echo_AF.png"},
    {"name":"Humungousaur","species":"Vaxasaurian","planet":"Terradino","series":"alienforce","powers":"Super strength, size manipulation, enhanced durability, dinosaur physiology","imageUrl":"https://static.wikia.nocookie.net/ben10/images/4/4f/Humungousaur_AF.png"},
    {"name":"Jetray","species":"Aerophibian","planet":"Aeropela","series":"alienforce","powers":"Flight, underwater travel, neuroshock blasts, speed","imageUrl":"https://static.wikia.nocookie.net/ben10/images/0/06/Jetray_AF.png"},
    {"name":"Big Chill","species":"Necrofriggian","planet":"Kylmyys","series":"alienforce","powers":"Cryokinesis, intangibility, flight, freeze breath","imageUrl":"https://static.wikia.nocookie.net/ben10/images/5/54/Big_Chill_AF.png"},
    {"name":"Chromastone","species":"Crystalsapien","planet":"Petropia","series":"alienforce","powers":"Energy absorption, light manipulation, crystal body, laser beams","imageUrl":"https://static.wikia.nocookie.net/ben10/images/d/d5/Chromastone_AF.png"},
    {"name":"Brainstorm","species":"Cerebrocrustacean","planet":"Encephalonus IV","series":"alienforce","powers":"Super intelligence, electrical blasts, force fields, weather control","imageUrl":"https://static.wikia.nocookie.net/ben10/images/8/84/Brainstorm_AF.png"},
    {"name":"Spidermonkey","species":"Arachnichimp","planet":"Aranhascimmia","series":"alienforce","powers":"Web shooting, enhanced agility, four arms, wall crawling","imageUrl":"https://static.wikia.nocookie.net/ben10/images/7/71/Spidermonkey_AF.png"},
    {"name":"Goop","species":"Polymorph","planet":"Viscosia","series":"alienforce","powers":"Shapeshifting, acid generation, gravity control, regeneration","imageUrl":"https://static.wikia.nocookie.net/ben10/images/b/b5/Goop_AF.png"},
    {"name":"Alien X","species":"Celestialsapien","planet":"Forge of Creation","series":"alienforce","powers":"Reality manipulation, omnipotence, cosmic awareness, immortality","imageUrl":"https://static.wikia.nocookie.net/ben10/images/8/8c/Alien_X_AF.png"},

    {"name":"Ultimate Humungousaur","species":"Evolved Vaxasaurian","planet":"Terradino","series":"ultimatealien","powers":"Enhanced strength, missile launchers, armor plating, size growth","imageUrl":"https://static.wikia.nocookie.net/ben10/images/a/a9/Ultimate_Humungousaur_UA.png"},
    {"name":"Ultimate Swampfire","species":"Evolved Methanosian","planet":"Methanos","series":"ultimatealien","powers":"Blue flames, enhanced plant control, combustion immunity, regeneration","imageUrl":"https://static.wikia.nocookie.net/ben10/images/2/22/Ultimate_Swampfire_UA.png"},
    {"name":"Ultimate Echo Echo","species":"Evolved Sonorosian","planet":"Sonorosia","series":"ultimatealien","powers":"Sonic disks, enhanced sound manipulation, flight, sonic barriers","imageUrl":"https://static.wikia.nocookie.net/ben10/images/9/91/Ultimate_Echo_Echo_UA.png"},
    {"name":"Ultimate Big Chill","species":"Evolved Necrofriggian","planet":"Kylmyys","series":"ultimatealien","powers":"Fire and ice manipulation, flame breath, enhanced flight, temperature immunity","imageUrl":"https://static.wikia.nocookie.net/ben10/images/7/7a/Ultimate_Big_Chill_UA.png"},
    {"name":"Ultimate Spidermonkey","species":"Evolved Arachnichimp","planet":"Aranhascimmia","series":"ultimatealien","powers":"Gorilla physiology, web generation, enhanced strength, agility","imageUrl":"https://static.wikia.nocookie.net/ben10/images/f/f3/Ultimate_Spidermonkey_UA.png"},
    {"name":"Armodrillo","species":"Talpaedan","planet":"Terraexcava","series":"ultimatealien","powers":"Drilling, jackhammer arms, earth manipulation, tunneling","imageUrl":"https://static.wikia.nocookie.net/ben10/images/e/e7/Armodrillo_UA.png"},
    {"name":"Water Hazard","species":"Orishan","planet":"Kiusana","series":"ultimatealien","powers":"Water manipulation, high pressure streams, moisture absorption, shell armor","imageUrl":"https://static.wikia.nocookie.net/ben10/images/3/3a/Water_Hazard_UA.png"},
    {"name":"Ampfibian","species":"Amperi","planet":"Tesslos","series":"ultimatealien","powers":"Electrokinesis, intangibility, flight, electrical absorption","imageUrl":"https://static.wikia.nocookie.net/ben10/images/a/ae/AmpFibian_UA.png"},
    {"name":"Terraspin","species":"Geochelone Aerio","planet":"Aldabra","series":"ultimatealien","powers":"Wind generation, shell protection, spinning attacks, flight","imageUrl":"https://static.wikia.nocookie.net/ben10/images/6/6a/Terraspin_UA.png"},
    {"name":"NRG","species":"Prypiatosian-B","planet":"Prypiatos","series":"ultimatealien","powers":"Radiation manipulation, containment suit, energy blasts, heat generation","imageUrl":"https://static.wikia.nocookie.net/ben10/images/0/0a/NRG_UA.png"},

    {"name":"Feedback","species":"Conductoid","planet":"Teslavorr","series":"omniverse","powers":"Energy absorption, electrical manipulation, energy redirection, conductor physiology","imageUrl":"https://static.wikia.nocookie.net/ben10/images/7/73/Feedback_OV.png"},
    {"name":"Bloxx","species":"Segmentasapien","planet":"Polyominus","series":"omniverse","powers":"Shapeshifting, building block physiology, regeneration, construction","imageUrl":"https://static.wikia.nocookie.net/ben10/images/4/41/Bloxx_OV.png"},
    {"name":"Gravattack","species":"Galilean","planet":"Keplorr","series":"omniverse","powers":"Gravity manipulation, planetary form, orbital control, space survival","imageUrl":"https://static.wikia.nocookie.net/ben10/images/0/07/Gravattack_OV.png"},
    {"name":"Crashhopper","species":"Orthopterran","planet":"Orthoterr","series":"omniverse","powers":"Enhanced jumping, powerful legs, acrobatics, impact absorption","imageUrl":"https://static.wikia.nocookie.net/ben10/images/8/8a/Crashhopper_OV.png"},
    {"name":"Ball Weevil","species":"Brachiolepidoptera","planet":"Lepidopterra","series":"omniverse","powers":"Explosive plasma balls, insect physiology, flight, energy generation","imageUrl":"https://static.wikia.nocookie.net/ben10/images/9/95/Ball_Weevil_OV.png"},
    {"name":"Walkatrout","species":"Ickthyoidperambul","planet":"Gilli-Perambulous Promenade","series":"omniverse","powers":"Land walking fish, slippery skin, water breathing, enhanced swimming","imageUrl":"https://static.wikia.nocookie.net/ben10/images/c/c2/Walkatrout_OV.png"},
    {"name":"Pesky Dust","species":"Nemuina","planet":"Nemunimos IV","series":"omniverse","powers":"Dream manipulation, sleep inducement, flight, fairy physiology","imageUrl":"https://static.wikia.nocookie.net/ben10/images/f/f2/Pesky_Dust_OV.png"},
    {"name":"Mole-Stache","species":"Unknown","planet":"Unknown","series":"omniverse","powers":"Drilling, mustache manipulation, underground travel, enhanced digging","imageUrl":"https://static.wikia.nocookie.net/ben10/images/1/13/Mole-Stache_OV.png"},
    {"name":"The Worst","species":"Atrocian","planet":"Atrocius 0","series":"omniverse","powers":"Invulnerability, indestructibility, damage absorption, yellow skin","imageUrl":"https://static.wikia.nocookie.net/ben10/images/2/21/The_Worst_OV.png"},
    {"name":"Kickin Hawk","species":"Unknown","planet":"Unknown","series":"omniverse","powers":"Enhanced kicking, martial arts, agility, bird physiology","imageUrl":"https://static.wikia.nocookie.net/ben10/images/a/a7/Kickin_Hawk_OV.png"},

    {"name":"Overflow","species":"Cascan","planet":"Cascareau","series":"reboot","powers":"Water manipulation, suit-based abilities, high pressure streams, aquatic adaptation","imageUrl":"https://static.wikia.nocookie.net/ben10/images/7/74/Overflow_Reboot.png"},
    {"name":"Shock Rock","species":"Fulmini","planet":"Fulmas","series":"reboot","powers":"Electrical manipulation, energy constructs, shock generation, crystalline body","imageUrl":"https://static.wikia.nocookie.net/ben10/images/a/a2/Shock_Rock_Reboot.png"},
    {"name":"Slapback","species":"Ekoplektoid","planet":"Ekoplekton","series":"reboot","powers":"Self-duplication on impact, enhanced strength, multiplication, combat skills","imageUrl":"https://static.wikia.nocookie.net/ben10/images/3/3c/Slapback_Reboot.png"},
    {"name":"Gax","species":"Chimera Sui Generis","planet":"Vilgaxia","series":"reboot","powers":"Vilgax abilities, tentacles, enhanced strength, laser eyes","imageUrl":"https://static.wikia.nocookie.net/ben10/images/8/8c/Gax_Reboot.png"}
  ],
  "seriesInfo": {
    "classic":{"name":"Classic","years":"2005-2008","description":"The original Ben 10 series"},
    "alienforce":{"name":"Alien Force","years":"2008-2010","description":"Ben as a teenager with new aliens"},
    "ultimatealien":{"name":"Ultimate Alien","years":"2010-2012","description":"Evolved alien forms and new transformations"},
    "omniverse":{"name":"Omniverse","years":"2012-2014","description":"New art style and universe exploration"},
    "reboot":{"name":"Reboot","years":"2016-2021","description":"Modern retelling of Ben 10"},
    "custom":{"name":"Custom","years":"2025","description":"User-created aliens"}
  }
};

// Global state
let currentFilter = 'all';
let currentSearch = '';
let allAliens = [];
let customAliens = [];
let alienToDelete = null;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadCustomAliens();
    combineAliens();
    updateAlienCounts();
    setupEventListeners();
    showLoading();
    
    setTimeout(() => {
        renderAliens(allAliens);
        hideLoading();
    }, 1500);
}

// localStorage functions
function saveCustomAliens() {
    try {
        localStorage.setItem('ben10CustomAliens', JSON.stringify(customAliens));
    } catch (error) {
        console.warn('Could not save to localStorage:', error);
    }
}

function loadCustomAliens() {
    try {
        const saved = localStorage.getItem('ben10CustomAliens');
        if (saved) {
            customAliens = JSON.parse(saved);
        }
    } catch (error) {
        console.warn('Could not load from localStorage:', error);
        customAliens = [];
    }
}

function combineAliens() {
    allAliens = [...originalAliensData.aliens, ...customAliens];
}

function setupEventListeners() {
    // DOM References
    const searchInput = document.getElementById('searchInput');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    // Create Alien Modal Elements
    const createAlienBtn = document.getElementById('createAlienBtn');
    const createAlienModal = document.getElementById('createAlienModal');
    const createModalClose = document.getElementById('createModalClose');
    const createAlienForm = document.getElementById('createAlienForm');
    const cancelCreate = document.getElementById('cancelCreate');
    const alienImageInput = document.getElementById('alienImage');
    const removeImageBtn = document.getElementById('removeImage');
    
    // Delete Confirmation Modal Elements
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Modal functionality
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    // Create Alien Modal
    if (createAlienBtn) {
        createAlienBtn.addEventListener('click', openCreateAlienModal);
    }
    if (createModalClose) {
        createModalClose.addEventListener('click', closeCreateAlienModal);
    }
    if (cancelCreate) {
        cancelCreate.addEventListener('click', closeCreateAlienModal);
    }
    if (createAlienForm) {
        createAlienForm.addEventListener('submit', handleCreateAlien);
    }
    
    // Image upload functionality
    if (alienImageInput) {
        alienImageInput.addEventListener('change', handleImageUpload);
    }
    if (removeImageBtn) {
        removeImageBtn.addEventListener('click', removeImage);
    }
    
    // Delete Confirmation Modal
    if (cancelDelete) {
        cancelDelete.addEventListener('click', closeDeleteModal);
    }
    if (confirmDelete) {
        confirmDelete.addEventListener('click', handleDeleteAlien);
    }
    
    // Close modals on overlay click
    if (createAlienModal) {
        createAlienModal.addEventListener('click', (e) => {
            if (e.target === createAlienModal) {
                closeCreateAlienModal();
            }
        });
    }
    
    if (deleteConfirmModal) {
        deleteConfirmModal.addEventListener('click', (e) => {
            if (e.target === deleteConfirmModal) {
                closeDeleteModal();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeCreateAlienModal();
            closeDeleteModal();
        }
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

function handleSearch(e) {
    currentSearch = e.target.value.toLowerCase().trim();
    filterAndRenderAliens();
}

function handleFilter(e) {
    const series = e.target.dataset.series;
    if (!series) return;
    
    currentFilter = series;
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update section title and description
    updateSectionInfo(series);
    
    filterAndRenderAliens();
}

function updateSectionInfo(series) {
    const sectionTitle = document.getElementById('sectionTitle');
    const sectionDescription = document.getElementById('sectionDescription');
    
    if (series === 'all') {
        if (sectionTitle) sectionTitle.textContent = 'All Aliens';
        if (sectionDescription) sectionDescription.textContent = 'Complete collection of Ben 10 aliens from all series';
    } else {
        const info = originalAliensData.seriesInfo[series];
        if (info) {
            if (sectionTitle) sectionTitle.textContent = info.name;
            if (sectionDescription) sectionDescription.textContent = `${info.description} (${info.years})`;
        }
    }
}

function filterAndRenderAliens() {
    let filteredAliens = allAliens;
    
    // Filter by series
    if (currentFilter !== 'all') {
        filteredAliens = filteredAliens.filter(alien => alien.series === currentFilter);
    }
    
    // Filter by search
    if (currentSearch) {
        filteredAliens = filteredAliens.filter(alien => 
            alien.name.toLowerCase().includes(currentSearch) ||
            alien.species.toLowerCase().includes(currentSearch) ||
            alien.planet.toLowerCase().includes(currentSearch)
        );
    }
    
    renderAliens(filteredAliens);
}

function renderAliens(aliens) {
    const aliensGrid = document.getElementById('aliensGrid');
    
    if (aliens.length === 0) {
        showNoResults();
        return;
    }
    
    hideNoResults();
    if (aliensGrid) {
        aliensGrid.innerHTML = '';
        
        aliens.forEach((alien, index) => {
            const alienCard = createAlienCard(alien, index);
            aliensGrid.appendChild(alienCard);
        });
        
        // Animate cards
        setTimeout(() => {
            const cards = document.querySelectorAll('.alien-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 50);
    }
}

function createAlienCard(alien, index) {
    const card = document.createElement('div');
    card.className = `alien-card ${alien.isCustom ? 'alien-card--custom' : ''}`;
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    
    const seriesName = getSeriesDisplayName(alien.series);
    const seriesBadgeClass = alien.series === 'custom' ? 'series-badge--custom' : '';
    
    card.innerHTML = `
        <div class="alien-image">
            ${alien.imageUrl ? 
                `<img src="${alien.imageUrl.includes('data:') ? alien.imageUrl : alien.imageUrl + '/revision/latest?cb=20160101000000'}" alt="${alien.name}" loading="lazy" ${!alien.imageUrl.includes('data:') ? 'crossorigin="anonymous"' : ''} />` :
                `<div style="font-size: 3rem; color: #00ff00;">${getAlienIcon(alien.name)}</div>`
            }
        </div>
        <div class="alien-name">${alien.name}</div>
        <div class="alien-species">${alien.species}</div>
        <div class="series-badge ${seriesBadgeClass}">${seriesName}</div>
        ${alien.isCustom ? `
            <div class="alien-card__actions">
                <button class="delete-btn" data-alien-id="${alien.id}" title="Delete Alien">🗑️</button>
            </div>
        ` : ''}
    `;
    
    // Handle image load error for original aliens
    if (alien.imageUrl && !alien.imageUrl.includes('data:')) {
        const img = card.querySelector('img');
        if (img) {
            img.onerror = function() {
                this.style.display = 'none';
                const container = this.parentElement;
                container.innerHTML = `<div style="font-size: 3rem; color: #00ff00;">${getAlienIcon(alien.name)}</div>`;
            };
        }
    }
    
    // Handle delete button click
    const deleteBtn = card.querySelector('.delete-btn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDeleteModal(alien);
        });
    }
    
    card.addEventListener('click', () => openModal(alien));
    
    return card;
}

function getAlienIcon(alienName) {
    const icons = {
        'Heatblast': '🔥', 'Four Arms': '💪', 'Diamondhead': '💎', 'XLR8': '⚡', 'Grey Matter': '🧠',
        'Wildmutt': '🐺', 'Stinkfly': '🦟', 'Ripjaws': '🦈', 'Upgrade': '🔧', 'Ghostfreak': '👻',
        'Swampfire': '🌱', 'Echo Echo': '🔊', 'Humungousaur': '🦕', 'Jetray': '🛸', 'Big Chill': '❄️',
        'Chromastone': '💎', 'Brainstorm': '🧠', 'Spidermonkey': '🕷️', 'Goop': '🟢', 'Alien X': '⭐',
        'Ultimate Humungousaur': '🦕', 'Ultimate Swampfire': '🌱', 'Ultimate Echo Echo': '🔊',
        'Ultimate Big Chill': '❄️', 'Ultimate Spidermonkey': '🕷️', 'Armodrillo': '🗿',
        'Water Hazard': '🌊', 'Ampfibian': '⚡', 'Terraspin': '🌪️', 'NRG': '☢️',
        'Feedback': '⚡', 'Bloxx': '🧱', 'Gravattack': '🪐', 'Crashhopper': '🦗',
        'Ball Weevil': '🪲', 'Walkatrout': '🐟', 'Pesky Dust': '🧚', 'Mole-Stache': '🕳️',
        'The Worst': '😵', 'Kickin Hawk': '🦅', 'Overflow': '🌊', 'Shock Rock': '⚡',
        'Slapback': '👊', 'Gax': '👽'
    };
    
    return icons[alienName] || '👽';
}

function getSeriesDisplayName(series) {
    const displayNames = {
        'classic': 'Classic', 'alienforce': 'Alien Force', 'ultimatealien': 'Ultimate Alien',
        'omniverse': 'Omniverse', 'reboot': 'Reboot', 'custom': 'Custom'
    };
    return displayNames[series] || series;
}

function openModal(alien) {
    const modalName = document.getElementById('modalName');
    const modalSpecies = document.getElementById('modalSpecies');
    const modalPlanet = document.getElementById('modalPlanet');
    const modalPowers = document.getElementById('modalPowers');
    const modalSeries = document.getElementById('modalSeries');
    const modalImageElement = document.getElementById('modalImageElement');
    const modalActions = document.getElementById('modalActions');
    const modalOverlay = document.getElementById('modalOverlay');
    
    if (modalName) modalName.textContent = alien.name;
    if (modalSpecies) modalSpecies.textContent = alien.species;
    if (modalPlanet) modalPlanet.textContent = alien.planet;
    if (modalPowers) modalPowers.textContent = alien.powers;
    
    const seriesDisplayName = getSeriesDisplayName(alien.series);
    const seriesBadgeClass = alien.series === 'custom' ? 'series-badge--custom' : '';
    if (modalSeries) {
        modalSeries.innerHTML = `<div class="series-badge ${seriesBadgeClass}">${seriesDisplayName}</div>`;
    }
    
    // Handle image display
    if (modalImageElement) {
        if (alien.imageUrl) {
            modalImageElement.src = alien.imageUrl.includes('data:') ? alien.imageUrl : `${alien.imageUrl}/revision/latest?cb=20160101000000`;
            modalImageElement.alt = alien.name;
            modalImageElement.style.display = 'block';
            
            modalImageElement.onerror = function() {
                this.style.display = 'none';
                const container = this.parentElement;
                container.innerHTML = `<div style="font-size: 5rem; color: #00ff00; display: flex; align-items: center; justify-content: center; height: 100%;">${getAlienIcon(alien.name)}</div>`;
            };
        } else {
            modalImageElement.style.display = 'none';
            const container = modalImageElement.parentElement;
            container.innerHTML = `<div style="font-size: 5rem; color: #00ff00; display: flex; align-items: center; justify-content: center; height: 100%;">${getAlienIcon(alien.name)}</div>`;
        }
    }
    
    // Add delete button for custom aliens
    if (modalActions) {
        if (alien.isCustom) {
            modalActions.innerHTML = `
                <button class="btn btn--danger" onclick="openDeleteModal(${JSON.stringify(alien).replace(/"/g, '&quot;')})">
                    Delete Alien
                </button>
            `;
        } else {
            modalActions.innerHTML = '';
        }
    }
    
    if (modalOverlay) {
        modalOverlay.classList.remove('hidden');
        setTimeout(() => {
            modalOverlay.classList.add('show');
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 250);
    }
}

// Create Alien Modal Functions
function openCreateAlienModal() {
    const createAlienForm = document.getElementById('createAlienForm');
    const imagePreview = document.getElementById('imagePreview');
    const createAlienModal = document.getElementById('createAlienModal');
    
    if (createAlienForm) createAlienForm.reset();
    if (imagePreview) imagePreview.classList.add('hidden');
    
    if (createAlienModal) {
        createAlienModal.classList.remove('hidden');
        setTimeout(() => {
            createAlienModal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeCreateAlienModal() {
    const createAlienModal = document.getElementById('createAlienModal');
    if (createAlienModal) {
        createAlienModal.classList.remove('show');
        setTimeout(() => {
            createAlienModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 250);
    }
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    const previewImage = document.getElementById('previewImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (file && previewImage && imagePreview) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImage.src = e.target.result;
            imagePreview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
}

function removeImage() {
    const alienImageInput = document.getElementById('alienImage');
    const imagePreview = document.getElementById('imagePreview');
    
    if (alienImageInput) alienImageInput.value = '';
    if (imagePreview) imagePreview.classList.add('hidden');
}

function handleCreateAlien(e) {
    e.preventDefault();
    
    const previewImage = document.getElementById('previewImage');
    const alienData = {
        name: document.getElementById('alienName').value.trim(),
        species: document.getElementById('alienSpecies').value.trim(),
        planet: document.getElementById('alienPlanet').value.trim(),
        series: document.getElementById('alienSeries').value,
        powers: document.getElementById('alienPowers').value.trim(),
        imageUrl: previewImage && previewImage.src !== window.location.href ? previewImage.src : null,
        isCustom: true,
        id: Date.now() // Unique ID for custom aliens
    };
    
    // Validate required fields
    if (!alienData.name || !alienData.species || !alienData.planet || !alienData.series || !alienData.powers) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Check for duplicate names
    if (allAliens.some(alien => alien.name.toLowerCase() === alienData.name.toLowerCase())) {
        alert('An alien with this name already exists. Please choose a different name.');
        return;
    }
    
    // Add to custom aliens
    customAliens.push(alienData);
    saveCustomAliens();
    combineAliens();
    updateAlienCounts();
    
    // Close modal and refresh display
    closeCreateAlienModal();
    filterAndRenderAliens();
    
    // Show success message
    setTimeout(() => {
        alert(`${alienData.name} has been successfully created!`);
    }, 300);
}

// Delete Modal Functions
function openDeleteModal(alien) {
    const deleteAlienName = document.getElementById('deleteAlienName');
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    
    alienToDelete = alien;
    if (deleteAlienName) deleteAlienName.textContent = alien.name;
    
    if (deleteConfirmModal) {
        deleteConfirmModal.classList.remove('hidden');
        setTimeout(() => {
            deleteConfirmModal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function closeDeleteModal() {
    const deleteConfirmModal = document.getElementById('deleteConfirmModal');
    if (deleteConfirmModal) {
        deleteConfirmModal.classList.remove('show');
        setTimeout(() => {
            deleteConfirmModal.classList.add('hidden');
            alienToDelete = null;
            document.body.style.overflow = 'auto';
        }, 250);
    }
}

function handleDeleteAlien() {
    if (!alienToDelete) return;
    
    // Remove from custom aliens array
    customAliens = customAliens.filter(alien => alien.id !== alienToDelete.id);
    saveCustomAliens();
    combineAliens();
    updateAlienCounts();
    
    // Close modals and refresh display
    closeDeleteModal();
    closeModal();
    filterAndRenderAliens();
    
    // Show success message
    setTimeout(() => {
        alert(`${alienToDelete.name} has been deleted.`);
    }, 300);
}

function showLoading() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const aliensGrid = document.getElementById('aliensGrid');
    const noResults = document.getElementById('noResults');
    
    if (loadingIndicator) loadingIndicator.classList.remove('hidden');
    if (aliensGrid) aliensGrid.classList.add('hidden');
    if (noResults) noResults.classList.add('hidden');
}

function hideLoading() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    const aliensGrid = document.getElementById('aliensGrid');
    
    if (loadingIndicator) loadingIndicator.classList.add('hidden');
    if (aliensGrid) aliensGrid.classList.remove('hidden');
}

function showNoResults() {
    const noResults = document.getElementById('noResults');
    const aliensGrid = document.getElementById('aliensGrid');
    
    if (noResults) noResults.classList.remove('hidden');
    if (aliensGrid) aliensGrid.classList.add('hidden');
}

function hideNoResults() {
    const noResults = document.getElementById('noResults');
    const aliensGrid = document.getElementById('aliensGrid');
    
    if (noResults) noResults.classList.add('hidden');
    if (aliensGrid) aliensGrid.classList.remove('hidden');
}

function updateAlienCounts() {
    const totalAliensCount = document.getElementById('totalAliensCount');
    const allCount = document.getElementById('allCount');
    const customCount = document.getElementById('customCount');
    
    if (totalAliensCount) totalAliensCount.textContent = allAliens.length;
    if (allCount) allCount.textContent = allAliens.length;
    if (customCount) customCount.textContent = customAliens.length;
    
    // Update individual series counts
    const seriesCounts = {};
    allAliens.forEach(alien => {
        seriesCounts[alien.series] = (seriesCounts[alien.series] || 0) + 1;
    });
    
    Object.keys(seriesCounts).forEach(series => {
        const filterBtn = document.querySelector(`[data-series="${series}"] .filter-count`);
        if (filterBtn) {
            filterBtn.textContent = seriesCounts[series];
        }
    });
}