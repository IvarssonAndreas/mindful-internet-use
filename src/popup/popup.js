import dayjs from "dayjs"
import setUpGoogleAnalytics from "../analytics"
import ToggleSwitch from "../components/toggle-switch"
import htmlToElement from "../utils/htmlToElement/htmlToElement";
import {formatDuration} from "../utilities";

const intervalsIds = []

document.addEventListener('unload', () => intervalsIds.forEach(id => clearInterval(id)))

document.addEventListener("DOMContentLoaded", function () {

  setUpGoogleAnalytics("/page")
  getTempAccessList()
      .then(tempAccessList => {
        renderTempAccessList(tempAccessList)
        intervalsIds.push(setInterval(() => renderTempAccessList(tempAccessList),1000));
      })



  getMIUEnableValue().then(isMIUEnabled => {
    const disableSwitch = new ToggleSwitch({
      onClick: (value) => setAndSendMIUEnableValue(value),

      isChecked: isMIUEnabled
    })

    document.querySelector(".popup__header").append(disableSwitch.render())
  })


  document
    .getElementById('addToDanger')
    .addEventListener('click', addActiveUrlToDanger);
  document.getElementById('goToOptions').addEventListener('click', goToOptions);

})

function goToOptions() {
  chrome.tabs.create({ url: 'options.html' });
}

function addActiveUrlToDanger(e) {
  chrome.storage.sync.get(['dangerList'], (result) => {
    let dangerList = [];
    if (result.dangerList) {
      dangerList = result.dangerList;
    }

    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        const alreadyExits = dangerList.some((url) => tabs[0].url == url);

        if (!alreadyExits) {
          dangerList.push(tabs[0].url);
          chrome.storage.sync.set({ dangerList }, () => {
            chrome.tabs.update(tabs[0].id, { url: tabs[0].url });
          });
        }
      }
    );
  });
}

function getTempAccessList(){
  return new Promise((resolve) => {
    chrome.storage.sync.get(['tempAccess'], ({tempAccess}) => {
      if (!tempAccess) {
        return []
      }
      return resolve(tempAccess)
    })
  })
}

function renderTempAccessList(tempAccessList) {
  const tempAccessListHtml = tempAccessList.map(({firstAccess,time, blockPattern}) => {
    const secondsPast = dayjs().diff(firstAccess, 'seconds')
    const secondsLeft = (time * 60) - secondsPast;
    if(secondsLeft < 0){
      return  false
    }

    const timeLeft = formatDuration(secondsLeft)

    return `<li class="popup__temp-access-list-item">
            <p class="popup__temp-access-list-item-pattern">${blockPattern} </p>
             <p class="popup__temp-access-list-item-time">${timeLeft}</p>  
            </li>`
  }).filter(item => item ).join('')

  const tempAccessListElement =   document.querySelector(".popup__temp-access-list")
  tempAccessListElement.innerHTML = ''
  tempAccessListElement.appendChild(htmlToElement(`<ol>${tempAccessListHtml}</ol>`))
}


function getMIUEnableValue() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['isMIUEnabled'], (result, error) => {

      if (error) {
        reject(error)
      } else {
        resolve(result.isMIUEnabled)
      }
    })
  })
}




function setAndSendMIUEnableValue(value) {
  chrome.storage.sync.set({ isMIUEnabled: value }, () => { })
}
