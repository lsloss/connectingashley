import { createCategoryIcon } from '../../utils/categoryIcon';
import { lightenHex, getContrastColor } from '../../utils/colour';

export function buildCategoryGroup(category, data, config) {
    const group = document.createElement('div');
    const header = document.createElement('div');
    const title = document.createElement('div');
    const text = document.createElement('span');

    group.className = 'filter-group';
    header.className = 'category-header';
    header.dataset.category = category;
    title.className = 'category-title';
    text.textContent = data.label;

    title.appendChild(
        createCategoryIcon(config?.[category]?.symbol || category)
    );

    title.appendChild(text);
    header.appendChild(title);
    group.appendChild(header);

    return { group, header };
}