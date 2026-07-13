export function createCategoryIcon(symbol) {
    const wrapper = document.createElement('span');
    wrapper.className = 'category-icon';

    wrapper.innerHTML = `
      <svg width="18" height="18">
        <use href="#${symbol}" />
      </svg>
    `;

    return wrapper;
}