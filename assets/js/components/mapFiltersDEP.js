import { getContrastColor } from '../utils/colour';
import { getSubcategoryColour, getSubcategoryTextColour } from '../utils/categoryColours';

export function initMapFilters(mapState) {
  const { map, markers, filters, config } = mapState;

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

    const left = document.createElement('div');
    left.className = 'category-title';

    left.appendChild(
      createCategoryIcon(config?.[category]?.symbol || category)
    );

    const text = document.createElement('span');
    text.textContent = data.label;

    left.appendChild(text);
    header.appendChild(left);
    group.appendChild(header);

    // =====================
    // SUBCATEGORY LIST
    // =====================
    const subList = document.createElement('ul');
    subList.className = 'subcategory-list collapsed';

    // =====================
    // ALL CHECKBOX
    // =====================
    const allRow = document.createElement('li');
    const allLabel = document.createElement('label');

    allLabel.classList.add('label-all');

    const allInput = document.createElement('input');
    allInput.type = 'checkbox';

    allLabel.textContent = 'All';

    allRow.appendChild(allLabel);
    allLabel.prepend(allInput);

    subList.appendChild(allRow);

    // =====================
    // SUBCATEGORIES
    // =====================
    const allSubs = Object.keys(data.subcategories)
      .sort((a, b) => a.localeCompare(b));

    allSubs.forEach(sub => {

      const count = data.subcategories[sub];

      const bgColour = getSubcategoryColour(
        config[category].baseColor,
        sub,
        allSubs
      );

      const textColour = getSubcategoryTextColour(
        config[category].baseColor,
        sub,
        allSubs
      );

      const row = document.createElement('li');
      const label = document.createElement('label');
      const input = document.createElement('input');

      label.style.background = bgColour;
      label.style.color = textColour;

      input.type = 'checkbox';
      input.checked = false;
      input.dataset.category = category;
      input.dataset.subcategory = sub;

      label.textContent = `${sub} (${count})`;

      input.addEventListener('change', () => {
        if (input.checked) {
          show(category, sub);
        } else {
          hide(category, sub);
        }

        syncAllState(allInput, category);
      });

      row.appendChild(label);
      label.prepend(input);

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
    // ALL TOGGLE
    // =====================
    allInput.addEventListener('change', () => {

      const checked = allInput.checked;

      Object.entries(data.subcategories).forEach(([sub]) => {

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

  // =====================
// ROUTES
// =====================

const routesHeading = document.createElement('h3');
routesHeading.textContent = 'Routes';
container.appendChild(routesHeading);

const routeList = document.createElement('ul');
routeList.className = 'route-list';
container.appendChild(routeList);

// access safely
const routeSystem = mapState.routes;

console.log(mapState.routes);

Object.entries(routeSystem.routes).forEach(([routeId, group]) => {

  const routeName = group.routeName || routeId;

  const row = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';

  label.appendChild(input);
  label.appendChild(document.createTextNode(routeName));

  input.addEventListener('change', () => {
    if (input.checked) {
      // Hide all other routes
      Object.entries(routeSystem.routes).forEach(([id, group]) => {
        if (id !== routeId) {
          routeSystem.hide(id);
        }
      });
      // Uncheck all other route inputs
      const otherInputs = routeList.querySelectorAll('input');
      otherInputs.forEach(otherInput => {
        if (otherInput !== input) {
          otherInput.checked = false;
        }
      });
      routeSystem.show(routeId);
    } else {
      routeSystem.hide(routeId);
    }
  });

  row.appendChild(label);
  routeList.appendChild(row);
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