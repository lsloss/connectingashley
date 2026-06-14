import { lightenHex, getContrastColor } from '../utils/colour';

export function initMapFilters() {
    const { map, markers, filters, config } = window.__mapState;

    const container = document.getElementById('map-filters');

    function show(category, subcategory) {
        markers[category]?.[subcategory]?.forEach(m => m.addTo(map));
    }

    function hide(category, subcategory) {
        markers[category]?.[subcategory]?.forEach(m => map.removeLayer(m));
    }

    function showCategory(category) {
        Object.values(markers[category] || {})
        .flat()
        .forEach(m => m.addTo(map));
    }

    function hideCategory(category) {
        Object.values(markers[category] || {})
        .flat()
        .forEach(m => map.removeLayer(m));
    }

    function createCategoryIcon(symbol) {
        const wrapper = document.createElement('span');
        wrapper.className = 'category-icon';

        wrapper.innerHTML = `
            <svg width="18" height="18">
            <use href="#${symbol}" />
            </svg>
        `;

        return wrapper;
    }

  // =========================
  // BUILD UI
  // =========================
  Object.entries(filters).forEach(([category, data]) => {

  const group = document.createElement('div');
  group.className = 'filter-group';

  // =====================
  // HEADER (ACCORDION)
  // =====================
  const header = document.createElement('div');
  header.className = 'category-header';

  const baseColor = config?.[category]?.baseColor;

  if (baseColor) {
    header.style.background = baseColor;
    header.style.color = getContrastColor(baseColor);
    }

    header.style.padding = '8px 10px';
    header.style.borderRadius = '6px';

  const left = document.createElement('div');
  left.className = 'category-title';

  left.appendChild(createCategoryIcon(data.symbol || category));

  const text = document.createElement('span');
  text.textContent = data.label;

//   const arrow = document.createElement('span');
//   arrow.className = 'accordion-arrow';
//   arrow.textContent = '▸';

  left.appendChild(text);

  header.appendChild(left);
  //header.appendChild(arrow);

  group.appendChild(header);

  // =====================
  // SUBCATEGORY LIST
  // =====================
  const subList = document.createElement('div');
  subList.className = 'subcategory-list collapsed';

  // =====================
  // ALL CHECKBOX
  // =====================
  const allRow = document.createElement('label');

  const allInput = document.createElement('input');
  allInput.type = 'checkbox';

  const allText = document.createElement('span');
  allText.textContent = 'All';

  allRow.appendChild(allInput);
  allRow.appendChild(allText);

  subList.appendChild(allRow);

  // =====================
  // SUBCATEGORIES
  // =====================
  Object.entries(data.subcategories).forEach(([sub, count]) => {

    const row = document.createElement('label');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.checked = false;
    input.dataset.category = category;
    input.dataset.subcategory = sub;

    const label = document.createElement('span');
    label.textContent = `${sub} (${count})`;

    input.addEventListener('change', () => {

      if (input.checked) {
        show(category, sub);
      } else {
        hide(category, sub);
      }

      syncAllState(allInput, category);
    });

    row.appendChild(input);
    row.appendChild(label);
    subList.appendChild(row);
  });

  group.appendChild(subList);

  // =====================
  // ACCORDION TOGGLE
  // =====================
  header.addEventListener('click', () => {
    subList.classList.toggle('collapsed');
    header.classList.toggle('open');
  });

  // =====================
  // ALL TOGGLE (FIXED SCOPE)
  // =====================
  allInput.addEventListener('change', () => {

    const checked = allInput.checked;

    Object.entries(data.subcategories).forEach(([sub, count]) => {

      const input = container.querySelector(
        `input[data-category="${category}"][data-subcategory="${sub}"]`
      );

      if (input) {
        input.checked = checked;
      }

      if (checked) {
        show(category, sub);
      } else {
        hide(category, sub);
      }
    });

    syncAllState(allInput, category);
  });

  container.appendChild(group);
});

  // =========================
  // INDICATE PARTIAL STATE
  // =========================
  function syncAllState(allInput, category) {
  const subInputs = container.querySelectorAll(
    `input[data-category="${category}"][data-subcategory]`
  );

  const total = subInputs.length;
  const checked = [...subInputs].filter(i => i.checked).length;

  if (checked === 0) {
    allInput.checked = false;
    allInput.indeterminate = false;
  } else if (checked === total) {
    allInput.checked = true;
    allInput.indeterminate = false;
  } else {
    allInput.checked = false;
    allInput.indeterminate = true;
  }
}

  return {
    show,
    hide,
    showCategory,
    hideCategory
  };
}