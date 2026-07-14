import { buildAllRow } from './buildAllRows';
import { buildSubcategoryRow } from './buildSubcategoryRow';
import { createUiState } from './state/uiState';

export function buildSubcategoryList(category, data, config, controller, uiState) {

    const allSubs = Object.keys(data.subcategories).sort();
    const { allInput, allRow } = buildAllRow();
    const subList = document.createElement('ul');
  
    subList.className = 'filter-list subcategory-list';
    subList.dataset.collapsed = 'true';
    subList.appendChild(allRow);

    //uiState.inputRegistry.set(`${category}:ALL`, allInput);

    allSubs.forEach(sub => {
      const count = data.subcategories[sub];

      const { row, input } = buildSubcategoryRow(
        category,
        sub,
        count,
        config,
        allSubs
      );

      input.checked = uiState.selectedMarkers.has(`${category}:${sub}`);

      uiState.inputRegistry.set(`${category}:${sub}`, input);

      input.addEventListener('change', () => {
        const key = `${category}:${sub}`;

        if (input.checked) {
            uiState.selectedMarkers.add(key);
            controller.show(category, sub);
        } else {
            uiState.selectedMarkers.delete(key);
            controller.hide(category, sub);
        }

        syncAllState(allInput, subList);
      });

      subList.appendChild(row);
    });

    syncAllState(allInput, subList);

    function syncAllState(allInput, subList) {
      const subInputs = subList.querySelectorAll('input[data-subcategory]');
    
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

    allInput.addEventListener('change', () => {
      const checked = allInput.checked;

      allSubs.forEach(sub => {
        const input = uiState.inputRegistry.get(`${category}:${sub}`);
        if (!input) return;

        const key = `${category}:${sub}`;

        input.checked = checked;

        uiState.inputRegistry.set(key, input);

        if (input.checked) {
            uiState.selectedMarkers.add(key);
            controller.show(category, sub);
        } else {
            uiState.selectedMarkers.delete(key);
            controller.hide(category, sub);
        }
      });

      syncAllState(allInput, subList);
    });

    return subList;
}