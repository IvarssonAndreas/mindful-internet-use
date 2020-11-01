import dayjs from 'dayjs';
import {htmlToElement,insertAfter} from '../utilities';
import createTimerButton from '../components/createTimerButton';
import setUpGoogleAnalytics from "../analytics"

setUpGoogleAnalytics("/stop")



function breathe(numBreaths) {
  // let oneBreathePercentage = 100 / numBreaths
  let counter = 0;
  const container = document.getElementById('breathe-container');
  const actionText = document.getElementById('breathe-text-action');
  const breathLeftText = document.getElementById('breathe-text-action--2');
  breathLeftText.innerText = numBreaths;

  // const progressCircle = document.getElementById('progress-circle');

  const totalTime = 10000;
  const breatheTime = (totalTime / 5) * 2;
  const holdTime = totalTime / 5;

  breathAnimation();

  // const progressIntervalID = setInterval(() => {
  //   counter += 1 / 1000
  //   if (counter > numBreaths) {
  //     clearInterval(progressIntervalID)
  //     clearInterval(breathingIntervalID)
  //     setupAfterBreaths()
  //   }
  //   progressCircle.style.setProperty("--percentage-done", counter * oneBreathePercentage + "%")
  // }, totalTime / 1000)

  function breathAnimation() {
    breathLeftText.innerText = numBreaths - counter; 

    if (counter === numBreaths) {
      clearInterval(breathingIntervalID)
      setupAfterBreaths()
    }
    actionText.innerText = 'Breathe In';
    container.className = 'breathe-container grow';



    setTimeout(() => {
      actionText.innerText = 'Hold';

      setTimeout(() => {
        actionText.innerText = 'Breathe Out';
        container.className = 'breathe-container shrink';
      }, holdTime);

    }, breatheTime);
    counter++
  
    
  }

  const breathingIntervalID = setInterval(breathAnimation, totalTime);
}


const closeTab = (e) => {
  chrome.tabs.getCurrent((tab) => {
    chrome.tabs.remove(tab.id, () => { });
  });
};

const goToOptions = () => {
  chrome.tabs.create({ url: 'options.html' });
};

chrome.storage.sync.get([ 'numBreath'], ({numBreath }) => {
  breathe(numBreath || 10)
});

let currentIndex = 0;
let motivationNode = '';
let motivationAuthor = '';
let htmlString = '';

chrome.storage.sync.get(['defaultQuotes', 'userQuotes', 'copy'], (result) => {
  if (result.defaultQuotes) {
    let qoutes = result.defaultQuotes.reduce((total, current, index, array) => {
      if (current.show) {
        total.push({ qoute: current.qoute, author: current.author });
      }

      return total;
    }, []);

    if (result.userQuotes) {
      qoutes = qoutes.concat(result.userQuotes.map((qoute) => ({ qoute })));
    }
    if (qoutes.length === 0) {
      qoutes = [
        {
          qoute:
            'You don’t need a new plan for next year. You need a commitment',
          author: 'Seth Godin',
        },
      ];
    }

    const index = Math.floor(Math.random() * qoutes.length);
    const author = qoutes[index].author ? qoutes[index].author : '';
    const motivationSplit = qoutes[index].qoute.split('');

    motivationNode = document.getElementById('motivation-text');
    motivationAuthor = document.getElementById('motivation-author');

    htmlString = motivationSplit.reduce(
      (htmlString, char, index) =>
        (htmlString += `<span data-index=${index}>${char}</span>`),
      ''
    );
    motivationNode.innerHTML = htmlString;
    motivationAuthor.innerHTML = author;

    if (result.copy) {
      handleCopying(motivationSplit, author);
    } else {
      handleNotCopying();
    }
  }


  function handleCopying(motivationSplit) {
    motivationNode.insertAdjacentElement(
      'afterbegin',
      htmlToElement('<span class="blinking-cursor">|</span>')
    );

    document.addEventListener('keydown', registerKeyDonw);

    function isCorrectKeyCode(pressedKey, expected) {
      return pressedKey.toLowerCase() === expected.toLowerCase();
    }

    function registerKeyDonw(e) {
      const currentChar = motivationSplit[currentIndex];

      if (isCorrectKeyCode(e.key, currentChar)) {
        const charHtml = motivationNode.querySelector(
          `[data-index='${currentIndex}']`
        );

        charHtml.previousElementSibling &&
          motivationNode.removeChild(charHtml.previousElementSibling);
        insertAfter(
          utilities.htmlToElement('<span class="blinking-cursor">|</span>'),
          charHtml
        );

        charHtml.classList.add('mark');
        currentIndex++;
      }

      if (currentIndex === motivationSplit.length) {
        document.removeEventListener('keydown', registerKeyDonw);
        makeTempAccess();
      }
    }
  }
});

function makeTempAccess() {
  const url = new URL(window.location.href);
  const blockUrl = url.searchParams.get('url');
  const blockPattern = url.searchParams.get('pattern');

  const accessContainer = document.querySelector('#access-container');
  accessContainer.innerHTML = '';

  accessContainer.innerHTML = '';
  createTimerButton('access-container', 'access-dropdown', (time) => {
    chrome.storage.sync.get(['tempAccess'], (result) => {
      let tempAccess = [];

      if (result.tempAccess) {
        tempAccess = result.tempAccess;
      }

      tempAccess = tempAccess.filter(access => access.blockPattern !== blockPattern)

      tempAccess.push( blockPattern, firstAccess: dayjs().format(), time });

      chrome.storage.sync.set({ tempAccess }, () => {
        window.location.replace(blockUrl);
      });
    });
  });
}

function setupAfterBreaths() {
  document.querySelector('.breathe-container').style.display = 'none';
  document.getElementById('afterBreath').style.display = 'flex';
}

function handleNotCopying() {
  document.querySelector('.motivation-text-intro').style.display = 'none';
  makeTempAccess();
}

function randomDisplay(element, howOften) {
  element.style.display = Math.random() < howOften ? "block" : "none"
}


document.querySelector('.logo').addEventListener('click', goToOptions);
document.querySelector('.accessBtn--close').addEventListener('click', closeTab);
document
  .querySelector('.accessBtn--options')
  .addEventListener('click', goToOptions);

const reviewLink = document.querySelector(".stop-container__review")
randomDisplay(reviewLink, 0.2)


