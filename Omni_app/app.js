// PATCHED: refined registration flow auto-switch + success message handling
class Ben10Database {
    constructor() {
        this.adminCredentials = { username: 'admin', password: 'adm1n@321' };
        this.currentUser = null;
        this.registeredUsers = JSON.parse(localStorage.getItem('ben10_users') || '{}');
        this.aliens = this.getPredefinedAliens();
        this.filteredAliens = [...this.aliens];
        this.currentAlien = null;
        this.modelRotation = { x: 0, y: 0, z: 0 };
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    /* --------------------------- INIT & EVENT BINDINGS -------------------------- */
    init() {
        this.bindEvents();
        if (localStorage.getItem('ben10_current_user')) {
            this.currentUser = localStorage.getItem('ben10_current_user');
            this.showMainApp();
        } else {
            this.showLoginSection();
        }
    }

    bindEvents() {
        // Tab Buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.addEventListener('click', () => this.switchTab(btn.dataset.tab)));
        // Auth forms
        document.getElementById('loginForm').addEventListener('submit', e => { e.preventDefault(); this.handleLogin(); });
        document.getElementById('registerForm').addEventListener('submit', e => { e.preventDefault(); this.handleRegister(); });
        document.getElementById('logoutBtn').addEventListener('click', () => this.handleLogout());
        // Search / Filter / Sort
        document.getElementById('searchInput').addEventListener('input', () => this.applyFilters());
        document.getElementById('seriesFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('sortSelect').addEventListener('change', () => this.applyFilters());
        // Add Alien
        document.getElementById('addAlienBtn').addEventListener('click', () => this.openAlienForm());
        // Modal interactions
        this.bindModalEvents();
    }

    bindModalEvents() {
        document.querySelectorAll('.modal-close').forEach(btn => btn.addEventListener('click', () => this.closeModal(btn.closest('.modal'))));
        document.querySelectorAll('.modal').forEach(modal => modal.addEventListener('click', e => { if (e.target === modal) this.closeModal(modal); }));
        document.getElementById('alienForm').addEventListener('submit', e => { e.preventDefault(); this.handleAlienSave(); });
        document.getElementById('editAlienBtn').addEventListener('click', () => { if (this.currentAlien) { this.openAlienForm(this.currentAlien); this.closeModal(document.getElementById('alienDetailModal')); } });
        document.getElementById('deleteAlienBtn').addEventListener('click', () => { if (this.currentAlien?.isCustom) { this.deleteAlien(this.currentAlien.id); this.closeModal(document.getElementById('alienDetailModal')); } });
        document.querySelectorAll('.rotate-btn').forEach(btn => btn.addEventListener('click', () => this.rotateModel(btn.dataset.axis)));
        document.querySelector('.reset-btn').addEventListener('click', () => this.resetModel());
    }

    /* ----------------------------- AUTHENTICATION ----------------------------- */
    switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
        document.getElementById('loginForm').classList.toggle('active', tab === 'login');
        document.getElementById('registerForm').classList.toggle('active', tab === 'register');
        this.clearAuthMessage();
    }

    handleLogin() {
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
        if ((username === this.adminCredentials.username && password === this.adminCredentials.password) ||
            (this.registeredUsers[username] && this.registeredUsers[username] === password)) {
            this.currentUser = username;
            localStorage.setItem('ben10_current_user', username);
            this.showAuthMessage('Login successful!', 'success');
            setTimeout(() => this.showMainApp(), 700);
        } else {
            this.showAuthMessage('Invalid username or password', 'error');
        }
    }

    handleRegister() {
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value;
        const confirm  = document.getElementById('confirmPassword').value;
        if (username.length < 3) { this.showAuthMessage('Username must be at least 3 characters', 'error'); return; }
        if (password.length < 6) { this.showAuthMessage('Password must be at least 6 characters', 'error'); return; }
        if (password !== confirm) { this.showAuthMessage('Passwords do not match', 'error'); return; }
        if (username === this.adminCredentials.username || this.registeredUsers[username]) { this.showAuthMessage('Username already exists', 'error'); return; }
        this.registeredUsers[username] = password;
        localStorage.setItem('ben10_users', JSON.stringify(this.registeredUsers));
        this.showAuthMessage('Account created! Redirecting to login…', 'success');
        document.getElementById('registerForm').reset();
        // After showing success, automatically switch to login tab and clear message
        setTimeout(() => { this.switchTab('login'); this.clearAuthMessage(); }, 1800);
    }

    handleLogout() { this.currentUser = null; localStorage.removeItem('ben10_current_user'); this.showLoginSection(); }

    showAuthMessage(text, type) {
        const box = document.getElementById('authMessage');
        box.textContent = text;
        box.className = `auth-message ${type}`;
        box.classList.remove('hidden');
    }
    clearAuthMessage() { document.getElementById('authMessage').classList.add('hidden'); }

    /* ------------------------ SECTION DISPLAY CONTROLS ------------------------ */
    showLoginSection() { document.getElementById('loginSection').classList.remove('hidden'); document.getElementById('mainApp').classList.add('hidden'); this.switchTab('login'); }
    showMainApp() { document.getElementById('loginSection').classList.add('hidden'); document.getElementById('mainApp').classList.remove('hidden'); document.getElementById('welcomeUser').textContent = `Welcome, ${this.currentUser}!`; this.applyFilters(); }

    /* -------------------------- SEARCH / FILTER / SORT ------------------------- */
    applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const seriesF    = document.getElementById('seriesFilter').value;
        const sortBy     = document.getElementById('sortSelect').value;
        this.filteredAliens = this.aliens.filter(a => {
            const matchesSearch = !searchTerm || [a.name, a.species, a.abilities].some(v => v.toLowerCase().includes(searchTerm));
            const matchesSeries = !seriesF || a.series === seriesF; return matchesSearch && matchesSeries; });
        this.filteredAliens.sort((a,b)=>{ if(sortBy==='name')return a.name.localeCompare(b.name); if(sortBy==='series')return a.series.localeCompare(b.series); return a.species.localeCompare(b.species);} );
        this.renderAliens();
    }

    renderAliens() { const grid=document.getElementById('aliensGrid'); grid.innerHTML=''; this.filteredAliens.forEach(a=>grid.appendChild(this.buildCard(a))); }
    buildCard(alien){ const c=document.createElement('div'); c.className='alien-card'; c.innerHTML=`<div class='alien-card-image'>${alien.name.charAt(0)}<div class='power-level'>Lvl ${alien.powerLevel}</div>${alien.isCustom?"<div class='custom-badge'>Custom</div>":''}</div><div class='alien-card-content'><div class='alien-card-header'><h3 class='alien-name'>${alien.name}</h3><span class='alien-series'>${alien.series}</span></div><p class='alien-species'>${alien.species} from ${alien.planet}</p><p class='alien-abilities'>${alien.abilities}</p></div>`; c.addEventListener('click',()=>this.openAlienDetail(alien)); return c; }

    /* ------------------------------- MODALS -------------------------------- */
    openAlienDetail(alien){this.currentAlien=alien; document.getElementById('alienDetailName').textContent=alien.name; document.getElementById('alienDetailSeries').textContent=alien.series; document.getElementById('alienDetailSpecies').textContent=alien.species; document.getElementById('alienDetailPlanet').textContent=alien.planet; document.getElementById('alienDetailPower').textContent=`${alien.powerLevel}/10`; document.getElementById('alienDetailAbilities').textContent=alien.abilities; document.getElementById('alienDetailImage').textContent=alien.name.charAt(0); this.resetModel(); document.getElementById('editAlienBtn').style.display=alien.isCustom?'block':'none'; document.getElementById('deleteAlienBtn').style.display=alien.isCustom?'block':'none'; this.openModal(document.getElementById('alienDetailModal')); }
    openAlienForm(alien=null){const isEdit=!!alien; document.getElementById('alienFormTitle').textContent=isEdit?'Edit Alien':'Add New Alien'; document.getElementById('alienForm').reset(); if(isEdit){document.getElementById('alienId').value=alien.id; document.getElementById('alienName').value=alien.name; document.getElementById('alienSeries').value=alien.series; document.getElementById('alienSpecies').value=alien.species; document.getElementById('alienPlanet').value=alien.planet; document.getElementById('alienPower').value=alien.powerLevel; document.getElementById('alienAbilities').value=alien.abilities;} else {document.getElementById('alienId').value='';} this.openModal(document.getElementById('alienFormModal')); }
    handleAlienSave(){const id=document.getElementById('alienId').value; const name=document.getElementById('alienName').value.trim(); const series=document.getElementById('alienSeries').value; const species=document.getElementById('alienSpecies').value.trim(); const planet=document.getElementById('alienPlanet').value.trim(); const power=parseInt(document.getElementById('alienPower').value,10); const abilities=document.getElementById('alienAbilities').value.trim(); if(!name||!series||!species||!planet||!abilities||isNaN(power)||power<1||power>10){alert('Please complete all fields correctly'); return;} if(id){const idx=this.aliens.findIndex(a=>a.id==id); if(idx!==-1){this.aliens[idx]={...this.aliens[idx],name,series,species,planet,powerLevel:power,abilities};}} else {const newId=Math.max(...this.aliens.map(a=>a.id))+1; this.aliens.push({id:newId,name,series,species,planet,powerLevel:power,abilities,isCustom:true});} this.applyFilters(); this.closeModal(document.getElementById('alienFormModal')); }

    /* ---- Model rotation ---- */
    rotateModel(axis){this.modelRotation[axis]=(this.modelRotation[axis]+45)%360; this.updateModel();}
    resetModel(){this.modelRotation={x:0,y:0,z:0}; this.updateModel();}
    updateModel(){document.getElementById('alienDetailImage').style.transform=`rotateX(${this.modelRotation.x}deg) rotateY(${this.modelRotation.y}deg) rotateZ(${this.modelRotation.z}deg)`;}
    /* ---- Modal helpers ---- */
    openModal(m){m.classList.add('active');document.body.style.overflow='hidden';}
    closeModal(m){m.classList.remove('active');document.body.style.overflow='';}

    /* Predefined data */
    getPredefinedAliens(){return[{id:1,name:'Heatblast',species:'Pyronite',planet:'Pyros',series:'Original',abilities:'Pyrokinesis, fire immunity, enhanced strength',powerLevel:7,isCustom:false},{id:2,name:'Four Arms',species:'Tetramand',planet:'Khoros',series:'Original',abilities:'Enhanced strength, four arms, skilled fighter',powerLevel:8,isCustom:false},{id:3,name:'Diamondhead',species:'Petrosapien',planet:'Petropia',series:'Original',abilities:'Crystal manipulation, diamond-hard skin, energy refraction',powerLevel:8,isCustom:false},{id:4,name:'XLR8',species:'Kineceleran',planet:'Kinet',series:'Original',abilities:'Super speed, enhanced reflexes, time manipulation',powerLevel:7,isCustom:false},{id:5,name:'Grey Matter',species:'Galvan',planet:'Galvan Prime',series:'Original',abilities:'Super intelligence, small size, technological expertise',powerLevel:9,isCustom:false},{id:6,name:'Stinkfly',species:'Lepidopterran',planet:'Lepidopterra',series:'Original',abilities:'Flight, toxic slime, enhanced vision',powerLevel:6,isCustom:false},{id:7,name:'Wildmutt',species:'Vulpimancer',planet:'Vulpin',series:'Original',abilities:'Enhanced senses, agility, no eyes but perfect tracking',powerLevel:6,isCustom:false},{id:8,name:'Ghostfreak',species:'Ectonurite',planet:'Anur Phaetos',series:'Original',abilities:'Invisibility, intangibility, possession, fear inducement',powerLevel:8,isCustom:false},{id:9,name:'Swampfire',species:'Methanosian',planet:'Methanos',series:'Alien Force',abilities:'Plant manipulation, methane generation, regeneration',powerLevel:8,isCustom:false},{id:10,name:'Echo Echo',species:'Sonorosian',planet:'Sonorosia',series:'Alien Force',abilities:'Sound manipulation, duplication, sonic screams',powerLevel:7,isCustom:false},{id:11,name:'Humungousaur',species:'Vaxasaurian',planet:'Terradino',series:'Alien Force',abilities:'Size manipulation, enhanced strength, thick armor',powerLevel:9,isCustom:false},{id:12,name:'Big Chill',species:'Necrofriggian',planet:'Kylmyys',series:'Alien Force',abilities:'Cryokinesis, intangibility, flight',powerLevel:8,isCustom:false},{id:13,name:'Alien X',species:'Celestialsapien',planet:'Forge of Creation',series:'Alien Force',abilities:'Reality manipulation, omnipotence, cosmic awareness',powerLevel:10,isCustom:false},{id:14,name:'Feedback',species:'Conductoid',planet:'Teslavorr',series:'Omniverse',abilities:'Energy absorption and redirection, electrical immunity',powerLevel:7,isCustom:false},{id:15,name:'Bloxx',species:'Segmentasapien',planet:'Polyominus',series:'Omniverse',abilities:'Shape-shifting, building block construction, elasticity',powerLevel:6,isCustom:false}]; }
}
// Launch app
new Ben10Database();