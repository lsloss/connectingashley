import { buildAllRow } from './buildAllRows';
import { buildSubcategoryRow } from './buildSubcategoryRow';

export function buildSubcategoryList(category, data, config, inputRegistry, controller) {
    const allSubs = Object.keys(data.subcategories).sort();
    const { allInput, allRow } = buildAllRow();
    const subList = document.createElement('ul');
  
    subList.className = 'subcategory-list';
    subList.appendChild(allRow);

    allSubs.forEach(sub => {
      const count = data.subcategories[sub];

      const { row, input } = buildSubcategoryRow(
        category,
        sub,
        count,
        config,
        allSubs
      );

      inputRegistry.set(`${category}:${sub}`, input);

      input.addEventListener('change', () => {
        input.checked
          ? controller.show(category, sub)
          : controller.hide(category, sub);

        syncAllState(allInput, subList);
      });

      subList.appendChild(row);
    });

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
        const input = inputRegistry.get(`${category}:${sub}`);
        if (!input) return;

        input.checked = checked;

        checked
          ? controller.show(category, sub)
          : controller.hide(category, sub);
      });

      syncAllState(allInput, subList);
    });

    return subList;
}