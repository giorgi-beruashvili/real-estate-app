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
    try {
        Object.values(modalElements).forEach(({ overlay, shapeIcon }) => closeModal(overlay, shapeIcon));
    } catch (error) {}
};

const openModal = (overlay, shapeIcon) => {
    try {
        closeAllModals();
        overlay.style.display = 'flex';
        shapeIcon?.classList.add('rotate');
    } catch (error) {}
};

const closeModal = (overlay, shapeIcon) => {
    try {
        overlay.style.display = 'none';
        shapeIcon?.classList.remove('rotate');
    } catch (error) {}
};

try {
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
} catch (error) {}

try {
    const addPropertyBtn = document.querySelector('.add-property-btn');
    addPropertyBtn?.addEventListener('click', () => window.location.href = 'add-listing.html');
} catch (error) {}

let regionCheckboxesContainer;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        regionCheckboxesContainer = document.querySelector('.region-checkboxes');
        const regionsEndpoint = 'https://api.real-estate-manager.redberryinternship.ge/api/regions';

        const response = await axios.get(regionsEndpoint);
        const regions = response.data;
        populateRegions(regions);
    } catch (error) {}

    function populateRegions(regions) {
        try {
            regionCheckboxesContainer.innerHTML = '';

            const columns = [[], [], []];
            regions.forEach((region, index) => {
                columns[index % 3].push(region);
            });

            columns.forEach(column => {
                const columnDiv = document.createElement('div');
                columnDiv.classList.add('region-column');
                column.forEach(region => {
                    const label = document.createElement('label');
                    label.innerHTML = `<input type="checkbox" value="${region.id}"> ${region.name}`;
                    columnDiv.appendChild(label);
                });
                regionCheckboxesContainer.appendChild(columnDiv);
            });
        } catch (error) {}
    }
});

function validatePriceRange() {
    try {
        const minPriceInput = document.getElementById('min-price');
        const maxPriceInput = document.getElementById('max-price');
        const minPrice = parseInt(minPriceInput.value, 10);
        const maxPrice = parseInt(maxPriceInput.value, 10);

        if (minPrice > maxPrice) {
            alert("Please enter valid price values. Minimum price cannot be greater than maximum price.");
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

function validateAreaRange() {
    try {
        const minAreaInput = document.getElementById('min-area');
        const maxAreaInput = document.getElementById('max-area');
        const minArea = parseInt(minAreaInput.value, 10);
        const maxArea = parseInt(maxAreaInput.value, 10);

        if (minArea > maxArea) {
            alert("Please enter valid area values. Minimum area cannot be greater than maximum area.");
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

try {
    document.getElementById('price-modal-close').addEventListener('click', validatePriceRange);
    document.getElementById('area-modal-close').addEventListener('click', validateAreaRange);
} catch (error) {}

const selectedFilters = {
    regions: [],
    priceRange: { min: null, max: null },
    areaRange: { min: null, max: null },
    bedrooms: null
};

try {
    document.addEventListener('change', (event) => {
        if (event.target.closest('.region-checkboxes input')) {
            const checkbox = event.target;
            const regionId = parseInt(checkbox.value);

            if (checkbox.checked) {
                selectedFilters.regions.push(regionId);
            } else {
                selectedFilters.regions = selectedFilters.regions.filter(id => id !== regionId);
            }
        }
    });
} catch (error) {}

try {
    document.getElementById('price-modal-close').addEventListener('click', () => {
        selectedFilters.priceRange.min = parseInt(document.getElementById('min-price').value, 10);
        selectedFilters.priceRange.max = parseInt(document.getElementById('max-price').value, 10);
    });

    document.getElementById('area-modal-close').addEventListener('click', () => {
        selectedFilters.areaRange.min = parseInt(document.getElementById('min-area').value, 10);
        selectedFilters.areaRange.max = parseInt(document.getElementById('max-area').value, 10);
    });
} catch (error) {}

function applyFilters() {
    try {
        const { regions, priceRange, areaRange, bedrooms } = selectedFilters;
        const filters = {
            regions: regions.join(','),
            minPrice: priceRange.min,
            maxPrice: priceRange.max,
            minArea: areaRange.min,
            maxArea: areaRange.max,
            bedrooms
        };
    } catch (error) {}
}
