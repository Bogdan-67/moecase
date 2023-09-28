import { API_URL } from '@/http';

export default class CaseScript {
  static reset(fillers, result) {
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';
    for (var i = 0; i < fillers.length; i++) {
      if (i !== fillers.length - 5) {
        var cardHtml = `<div class="card" style="background-color: lightblue;" id='itemNumber${i}'><img src='${
          API_URL + fillers[i].logo
        }' /></div>`;
      } else {
        var cardHtml = `<div class="card reward" style="background-color: lightblue;" id='itemNumber${i}'><img src='${
          API_URL + result.logo
        }' /></div>`;
      }
      var tempContainer = document.createElement('div');
      tempContainer.innerHTML = cardHtml;
      var card = tempContainer.firstChild;
      cardList.appendChild(card);
    }
    const firstCard = document.querySelector('.card');
    firstCard.style.marginLeft = '0px';
  }

  static openCase(fillers, result) {
    return new Promise((resolve) => {
      this.reset(fillers, result);

      var timingFunction = 'cubic-bezier(.14,.83,.58,.98)';
      const firstCard = document.querySelector('.card');
      const marginLeftStart = parseInt(window.getComputedStyle(firstCard).marginLeft);

      const cardList = document.getElementById('cardList');
      const cardListWidth = cardList.offsetWidth;

      const cardWidth = firstCard.offsetWidth;
      const marginBeforeReward =
        (fillers.length - 4 - Math.ceil(cardListWidth / (2 * cardWidth)) - 1) * cardWidth;
      const randomOffset = Math.random() * cardWidth;
      const marginLeftEnd = -marginBeforeReward - randomOffset;

      const animationDuration = 4000;
      const fps = 60;
      const frameDuration = 1000 / fps;
      const totalFrames = Math.ceil(animationDuration / frameDuration);
      let currentFrame = 0;

      firstCard.style.transition = `margin-left ${animationDuration}ms ${timingFunction}`;

      const that = this;

      function animateCard() {
        const progress = currentFrame / totalFrames;
        const marginLeft = marginLeftStart + (marginLeftEnd - marginLeftStart) * progress;
        firstCard.style.marginLeft = marginLeft + 'px';

        if (currentFrame < totalFrames) {
          requestAnimationFrame(animateCard);
        } else {
          setTimeout(() => {
            resolve();
          }, animationDuration + 400);
        }

        currentFrame++;
      }

      animateCard();
    });
  }

  static random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
