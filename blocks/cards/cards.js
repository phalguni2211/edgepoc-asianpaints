import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
 let cardsNav = document.querySelector('.cards-nav');
if (!cardsNav) {
  // Create and insert the arrows if they do not exist
  const cardsContainer = document.querySelector('.cards.custom-tut.block');
  cardsNav = document.createElement('div');
  cardsNav.className = 'cards-nav';
 
  const leftArrow = document.createElement('div');
  leftArrow.className = 'arrow';
  leftArrow.id = 'left-arrow';
  leftArrow.innerHTML = '&larr;';
  cardsNav.appendChild(leftArrow);
 
  const rightArrow = document.createElement('div');
  rightArrow.className = 'arrow';
  rightArrow.id = 'right-arrow';
  rightArrow.innerHTML = '&rarr;';
  cardsNav.appendChild(rightArrow);
 
  // Insert the navigation arrows before the cards container
  cardsContainer.insertAdjacentElement('beforebegin', cardsNav);
 
  const cardsList = document.querySelector('.cards.custom-tut.block ul');
  const cards = document.querySelectorAll('.cards.custom-tut.block ul li');
  const cardWidth = cards[0].clientWidth ? cards[0].clientWidth + 16 :  364; // Including margin
  const visibleCards = 2;
  const maxIndex = cards.length;
  let cardIndex = 0;
 
  const updateCardPosition = () => {
    if(cardIndex < maxIndex - visibleCards){
      cardsList.style.transform = `translateX(${-cardIndex * cardWidth}px)`;
    }
    // Clear previous styles
    cards.forEach(card => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');
      if (h3) { h3.style.color = 'black'; }
      if (p) { p.style.color = 'black'};
      card.style.backgroundColor = 'white';
    });
 
    // Style the current card based on its index
    const currentCard = cards[cardIndex];
    if (currentCard) {
      const h3 = currentCard.querySelector('h3');
      const p = currentCard.querySelector('p');
      if (h3) { h3.style.color = 'white'; }
      if (p) { p.style.color = 'white'};
      currentCard.style.backgroundColor = '';
      currentCard.style.color = 'white';
    }
  };
 
  // Disable left arrow initially
  leftArrow.style.opacity = 0.5;
  leftArrow.style.pointerEvents = 'none';
 
  leftArrow.addEventListener('click', () => {
    if (cardIndex > 0) {
      cardIndex--;
      updateCardPosition();
      rightArrow.style.opacity = 1;
      rightArrow.style.pointerEvents = 'auto';
    }
    if (cardIndex === 0) {
      leftArrow.style.opacity = 0.5;
      leftArrow.style.pointerEvents = 'none';
    }
  });
 
  rightArrow.addEventListener('click', () => {
    if (cardIndex < maxIndex - 1) {
      cardIndex++;
      updateCardPosition();
      leftArrow.style.opacity = 1;
      leftArrow.style.pointerEvents = 'auto';
    }
    if (cardIndex === maxIndex) {
      rightArrow.style.opacity = 0.5;
      rightArrow.style.pointerEvents = 'none';
    }
  });
 
  // Initial call to highlight the first card
  updateCardPosition();
}
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
