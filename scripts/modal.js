// Modal functionality
class ContactModal {
    constructor() {
        this.modal = document.getElementById('contact-modal');
        this.closeBtn = document.querySelector('.close-btn');
        this.whatsappBtn = document.getElementById('whatsapp-btn');
        
        this.initEventListeners();
    }
    
    initEventListeners() {
        // Close modal
        this.closeBtn.addEventListener('click', () => {
            this.hide();
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }
    
    show(designation) {
        const contact = contacts[designation];
        
        if (!contact) return;
        
        document.getElementById('modal-name').textContent = contact.name;
        document.getElementById('modal-designation').textContent = contact.designation;
        document.getElementById('modal-railway-o').textContent = contact.railwayO || '-';
        document.getElementById('modal-railway-r').textContent = contact.railwayR || '-';
        document.getElementById('modal-bsnl-o').textContent = contact.bsnlO || '-';
        document.getElementById('modal-bsnl-r').textContent = contact.bsnlR || '-';
        document.getElementById('modal-mobile').textContent = contact.mobile || '-';
        document.getElementById('modal-email').textContent = contact.email || '-';
        
        // Show/hide WhatsApp icon based on mobile number availability
        if (contact.mobile) {
            this.whatsappBtn.style.display = 'block';
            this.whatsappBtn.onclick = () => {
                window.open(`https://wa.me/91${contact.mobile}`, '_blank');
            };
        } else {
            this.whatsappBtn.style.display = 'none';
        }
        
        this.modal.style.display = 'flex';
    }
    
    hide() {
        this.modal.style.display = 'none';
    }
}

// Initialize modal
const contactModal = new ContactModal();