import { getSubcategoryColour, getSubcategoryTextColour } from '../../utils/categoryColours';

export function buildSubcategoryRow(category, sub, count, config, allSubs) {
  const row = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.dataset.category = category;
  input.dataset.subcategory = sub;

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

  label.style.background = bgColour;
  label.style.color = textColour;
  label.textContent = `${sub} (${count})`;

  label.prepend(input);
  row.appendChild(label);

  return { row, input };
}