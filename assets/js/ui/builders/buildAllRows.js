export function buildAllRow() {
  const li = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';

  label.appendChild(input);
  label.appendChild(document.createTextNode('All'));
  li.appendChild(label);

  return {
    allRow: li,
    allInput: input
  };
}
