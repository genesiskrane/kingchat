const getBoardHTML = ({ width, height }) => {
  const bound = document.createElement('div');
  let w = width < 500 ? width : 500;

  const background = document.createElement('div');
  background.id = 'background';
  bound.appendChild(background);

  // Use flexbox with column direction for centering and stacking
  background.style.display = 'flex';
  background.style.flexDirection = 'column'; // Set flex direction to column
  background.style.justifyContent = 'center';
  background.style.alignItems = 'center';
  
  // Set width and height for background
  background.style.width = width + 'px';
  background.style.height = height + 'px';
  background.style.background = '#256e02';
  
  const boardContainer = document.createElement('div');
  background.appendChild(boardContainer);
  
  // Limit max width to 500px and set width to 100% of the parent
  boardContainer.style.maxWidth = '500px';
  boardContainer.style.width = '100%';
  boardContainer.style.height = w + 'px';
  boardContainer.style.padding = '1rem';
  
  // Style the board itself
  const board = document.createElement('div');
  boardContainer.appendChild(board);
  board.style.display = 'grid';
  board.style.height = '100%';
  board.style.width = '100%';
  board.style.gridTemplateColumns = 'repeat(5, 1fr)';
  board.style.gap = '.25rem';
  board.style.padding = '.25rem';
  board.style.background = '#175800';
  board.style.borderRadius = '2px';

  // Create 25 cells for the board
  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.style.display = 'grid';
    cell.style.alignItems = 'center';
    cell.style.textAlign = 'center';
    cell.style.background = '#256e02';
    cell.style.borderRadius = '3px';
    cell.style.boxShadow = 'rgba(255, 255, 255, 0.25) 0px 1px 1px 1px inset';
    board.appendChild(cell);
  }

  // Add a spinner section below the board
  const spinnerDiv = document.createElement('div');
  background.appendChild(spinnerDiv);
  const spinner = document.createElement('div');
  spinnerDiv.appendChild(spinner);
  spinner.style.background = 'grey';
  spinner.style.margin = 'auto';
  spinner.style.width = `calc(${w}px - 2rem)`;
  spinner.style.height = '40px';

  return bound;
};

export { getBoardHTML };
