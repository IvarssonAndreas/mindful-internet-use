export function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

export function handleClass(shouldContain, className, element) {

    if (shouldContain) {
        element.classList.add(className);
    } else {
        element.classList.remove(className);
    }
}

export function updateStorageValue(key, value, callback) {
    chrome.storage.sync.set({[key]: value}, () => {
        callback();
    });
}

export function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

export function formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60)
    const seconds = durationInSeconds - (minutes * 60)



    return `${minutes < 10? '0' + minutes: minutes}:${seconds < 10? '0' + seconds: seconds}`
}

