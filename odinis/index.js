function start() {
    if (getContexts().length == 0) {
        alert("Add some contexts before starting ordini.")
        return
    }
    initiateCurrentContexts()
    next()
}

function next() {
    var picked = pickContext()
    showCurrentContexts(getCurrentContexts(), picked)
}

function showCurrentContexts(contexts, pickedContext) {
    var contextsElement = document.getElementById("ordinis");
    contextsElement.innerHTML = ""
    var list = document.createElement("ul")
    list.className = "innerOrdinisList"
    contexts.forEach(context => {
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(context));
        item.className = "innerOrdinisListItem"
        list.appendChild(item);
    });
    contextsElement.appendChild(list)
    var currentContextText = document.createElement('p')
    currentContextText.innerText = "The context now is: " + pickedContext
    currentContextText.className = "contextNow"
    contextsElement.appendChild(currentContextText)

    if (contexts.length == 0) {
        var restartButton = document.createElement('button');
        restartButton.innerHTML = "RESTART!"
        restartButton.className = "restartButton"
        restartButton.onclick = start
        contextsElement.appendChild(restartButton)
    } else {
        var nextButton = document.createElement('button');
        nextButton.innerHTML = "NEXT!"
        nextButton.className = "nextButton"
        nextButton.onclick = next
        contextsElement.appendChild(nextButton)
    }
}

function initiateCurrentContexts() {
    setCurrentContexts(getContexts())
}

function getCurrentContexts() {
    if (localStorage.getItem("currentContexts") === "" || localStorage.getItem("currentContexts") === null) {
        return []
    }
    return JSON.parse(localStorage.getItem("currentContexts"))
}

function setCurrentContexts(currentContexts) {
    localStorage.setItem("currentContexts", JSON.stringify(currentContexts))
}

function pickContext() {
    var currentContexts = getCurrentContexts()
    var pickedContextIndex = getRandomInt(0, currentContexts.length)
    var pickedContext = currentContexts[pickedContextIndex]
    setCurrentContexts(removeFromIndex(currentContexts, pickedContextIndex))
    return pickedContext
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function removeFromIndex(arr, index) {
    var newArr = []
    for (i = 0; i < arr.length; i++) {
        if (i != index) {
            newArr.push(arr[i])
        }
    }
    return newArr
}

function resetAllContexts() {
    localStorage.setItem("contexts", "[]")
    localStorage.setItem("currentContexts", "[]")
}

function addContext(context) {
    if (localStorage.getItem("contexts") === "" || localStorage.getItem("contexts") === null) {
        localStorage.setItem("contexts", JSON.stringify([]))
    }
    var contexts = JSON.parse(localStorage.getItem("contexts"))
    contexts.push(context)
    setContexts(contexts)
}

function removeContextAndFill(index) {
    removeContext(index)
    fillContexts()
}

function removeContext(index) {
    var contexts = getContexts()
    setContexts(removeFromIndex(contexts, index))
}

function setContexts(contexts) {
    localStorage.setItem("contexts", JSON.stringify(contexts))
}

function getContexts() {
    var contexts = localStorage.getItem("contexts")
    return (contexts === "") ? [] : JSON.parse(contexts)
}

function insertContext() {
    var contextInput = document.getElementById("contextInput")
    var context = contextInput.value
    if (context == "" || context == null) {
        alert("Type de context name before adding it.")
        return
    }
    addContext(context)
    fillContexts()
    contextInput.value = ""
}

function fillContexts() {
    var contexts = getContexts()
    var contextsElement = document.getElementById("contexts");
    contextsElement.innerHTML = ""
    for (i = 0; i < contexts.length; i++) {
        var context = contexts[i]
        var item = document.createElement('li');
        item.appendChild(document.createTextNode(context));

        var removeItem = document.createElement('button');
        removeItem.innerHTML = "X"
        removeItem.className = "removeButton"
        removeItem.onclick = createFuncThatRemovesContextAndFill(i)
        item.appendChild(removeItem)
        contextsElement.appendChild(item);
    }
}

function createFuncThatRemovesContextAndFill(index) {
    return function() {
        removeContextAndFill(index)
    }
}

window.onload = function() {
    fillContexts()
}
