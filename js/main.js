const modalElements = {
    region: {
        overlay: document.getElementById('modal-overlay'),
        modal: document.getElementById('region-modal'),
        closeBtn: document.getElementById('modal-close'),
        filterBtn: document.querySelector('.filter-region'),
        shapeIcon: document.querySelector('.filter-region .shape-icon'),
    },
    price: {
        overlay: document.getElementById('price-modal-overlay'),
        modal: document.getElementById('price-modal'),
        closeBtn: document.getElementById('price-modal-close'),
        filterBtn: document.querySelector('.filter-price'),
        shapeIcon: document.querySelector('.filter-price .shape-icon'),
    },
    area: {
        overlay: document.getElementById('area-modal-overlay'),
        modal: document.getElementById('area-modal'),
        closeBtn: document.getElementById('area-modal-close'),
        filterBtn: document.querySelector('.filter-area'),
        shapeIcon: document.querySelector('.filter-area .shape-icon'),
    },
    bedroom: {
        overlay: document.getElementById('bedroom-modal-overlay'),
        modal: document.getElementById('bedroom-modal'),
        closeBtn: document.getElementById('bedroom-modal-close'),
        filterBtn: document.querySelector('.filter-bedroom'),
        shapeIcon: document.querySelector('.filter-bedroom .shape-icon'),
    },
    agent: {
        overlay: document.getElementById('agent-modal-overlay'),
        modal: document.getElementById('agent-modal'),
        filterBtn: document.querySelector('.add-agent-btn'),
        closeBtn: document.querySelector('.cancel-btn'),
    }
};

const closeAllModals = () => {
    Object.values(modalElements).forEach(({ overlay, shapeIcon }) => closeModal(overlay, shapeIcon));
};

const openModal = (overlay, shapeIcon) => {
    closeAllModals();
    overlay.style.display = 'flex';
    shapeIcon?.classList.add('rotate');
};

const closeModal = (overlay, shapeIcon) => {
    overlay.style.display = 'none';
    shapeIcon?.classList.remove('rotate');
};

Object.keys(modalElements).forEach((key) => {
    const { overlay, closeBtn, filterBtn, shapeIcon } = modalElements[key];

    filterBtn?.addEventListener('click', () => {
        overlay.style.display === 'flex' ? closeModal(overlay, shapeIcon) : openModal(overlay, shapeIcon);
    });

    closeBtn?.addEventListener('click', () => closeModal(overlay, shapeIcon));

    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            closeModal(overlay, shapeIcon);
        }
    });
});

const addPropertyBtn = document.querySelector('.add-property-btn');
addPropertyBtn?.addEventListener('click', () => window.location.href = 'add-listing.html');

