import { createCategoryIcon } from '../../utils/categoryIcon';

export function buildCategoryGroup(category, data, config) {
    const group = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('div');
    const text = document.createElement('span');
    const arrow = document.createElement('span');

    group.className = 'filter-group';
    header.className = 'category-header';
    header.setAttribute('aria-expanded', false);
    arrow.className = 'category-arrow';
    header.dataset.category = category;
    title.className = 'category-title';
    text.textContent = data.label;
    arrow.innerHTML = `
      <svg width="18" height="18">
        <use href="#Arrow" />
      </svg>
    `;

    title.appendChild(
        createCategoryIcon(config?.[category]?.symbol || category)
    );

    title.appendChild(text);
    header.appendChild(title);
    header.appendChild(arrow);
    group.appendChild(header);

    return { group, header };
}