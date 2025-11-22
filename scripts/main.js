// Main application functionality
class TelephoneDirectory {
    constructor() {
        this.contentContainer = document.getElementById('content-container');
        this.headerContainer = document.getElementById('header-container');
        this.currentPage = 'main';
        
        this.init();
    }
    
    async init() {
        await this.loadHeader();
        await this.loadMainPage();
        this.initEventListeners();
    }
    
    async loadHeader() {
        try {
            const response = await fetch('pages/header.html');
            const headerHTML = await response.text();
            this.headerContainer.innerHTML = headerHTML;
            this.updateHeader();
        } catch (error) {
            console.error('Error loading header:', error);
        }
    }
    
    async loadMainPage() {
        try {
            const response = await fetch('pages/main-page.html');
            const mainHTML = await response.text();
            this.contentContainer.innerHTML = mainHTML;
            this.currentPage = 'main';
            this.updateHeader();
            this.initPageEventListeners();
        } catch (error) {
            console.error('Error loading main page:', error);
        }
    }
    
    async loadSignalTelecomPage() {
        try {
            const response = await fetch('pages/signal-telecom.html');
            const signalHTML = await response.text();
            this.contentContainer.innerHTML = signalHTML;
            this.currentPage = 'signal';
            this.updateHeader();
            this.initPageEventListeners();
        } catch (error) {
            console.error('Error loading signal telecom page:', error);
        }
    }
    
    updateHeader() {
        const headerTitle = document.getElementById('header-title');
        const headerSubtitle = document.getElementById('header-subtitle');
        
        if (headerTitle && headerSubtitle) {
            const dept = departments[this.currentPage];
            headerTitle.textContent = dept.title;
            headerSubtitle.textContent = dept.subtitle;
        }
    }
    
    initEventListeners() {
        // Back button event listener will be added dynamically when pages load
    }
    
    initPageEventListeners() {
        // Event listeners for designation cards
        document.querySelectorAll('[data-designation]').forEach(card => {
            card.addEventListener('click', () => {
                const designation = card.getAttribute('data-designation');
                contactModal.show(designation);
            });
        });
        
        // Event listeners for department cards
        document.querySelectorAll('[data-department]').forEach(card => {
            card.addEventListener('click', () => {
                const department = card.getAttribute('data-department');
                if (department === 'signal') {
                    this.loadSignalTelecomPage();
                }
            });
        });
        
        // Back button event listener
        const backBtn = document.getElementById('back-to-main');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.loadMainPage();
            });
        }
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TelephoneDirectory();
});