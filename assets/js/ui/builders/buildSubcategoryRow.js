import { getSubcategoryColour, getSubcategoryTextColour } from '../../utils/categoryColours';

export function buildSubcategoryRow(category, sub, count, config, allSubs, { showCount }) {
  const row = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  if(category == "Routes") {
    input.type = 'radio';
  } else {
    input.type = 'checkbox';
  }
  input.dataset.category = category;
  input.dataset.subcategory = sub;

  if(config) {
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
  }

  if(showCount) {
    label.textContent = `${sub} (${count})`;
  } else {
    label.textContent = `${sub}`;
  }

  label.prepend(input);
  row.appendChild(label);

  return { row, input };
}