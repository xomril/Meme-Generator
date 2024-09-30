'use strict'

function renderGallery(imgs = gImgs) {
    let strHTML = ''
    imgs.forEach((img) => {
        strHTML += `<img src="${img.url}" onclick="onImgSelect(${img.id})" />`
    })
    document.querySelector('.select-img-container').innerHTML = strHTML

    renderSearchByKeywords()
}

function onImgSelect(imgId) {
    setImg(imgId)
    renderMeme(getMeme())
    goToMemeEditor()

}

function goToMemeEditor() {
    const elMenuItems = document.querySelectorAll('.menu-item')

    elMenuItems.forEach(menuItem =>  menuItem.textContent === 'Meme Editor' ? menuItem.classList.add("active") :    menuItem.classList.remove("active"))
    
    const elImageGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    const elMyMems = document.querySelector('.my-mems')
    const elAbout = document.querySelector('.about')

    elImageGallery.classList.remove("active")
    elMemeEditor.classList.add("active")

    elMemeEditor.classList.remove('hidden')
    elImageGallery.classList.add('hidden')
    elAbout.classList.add('hidden')
    elMyMems.classList.add('hidden')
}

function onFilter(filterBy) {
    const imgs = filterImgs(filterBy)
    renderGallery(imgs)
    IncreaseKeyword(filterBy)
}

function renderSearchByKeywords(){
    const elSearchByKeywords = document.querySelector('.searchByKeywords div')
    let strHTML = ''

    for (let key in gKeywordSearchCountMap) {
        strHTML += `<span style="font-size:${ gKeywordSearchCountMap[key]}rem" onclick="onFilter('${key}')"> ${key}</span>`
      }

      elSearchByKeywords.innerHTML = strHTML
}

function IncreaseKeyword(key){
    gKeywordSearchCountMap[key] += 1
    renderSearchByKeywords()
}

function onImgInput(ev) {
    loadImageFromInput(ev, onExternalImgSelect)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}


function onExternalImgSelect(img) {
    const imgId = addImgToGImg(img)
    setImg(imgId)
    renderMeme(getMeme())
    goToMemeEditor()

}