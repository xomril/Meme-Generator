"use strict"

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    renderGallery()

    window.addEventListener('resize', resizeCanvas)

}

function onMenuItemClick(selectedTab) {
    const elMenuItem = document.querySelectorAll(`.${selectedTab} a`); 
    const elMenuItems = document.querySelectorAll('.menu-item')

    elMenuItems.forEach(menuItem => menuItem.classList.remove("active"))
    elMenuItem[0].classList.add("active")
    elMenuItem[1].classList.add("active")

    const elImageGallery = document.querySelector('.image-gallery')
    const elMemeEditor = document.querySelector('.meme-editor')
    const elMyMems = document.querySelector('.my-mems')
    const elAbout = document.querySelector('.about')

    switch (selectedTab) {
        case 'menu-gallery':
            elImageGallery.classList.remove('hidden')
            elMemeEditor.classList.add('hidden')
            elAbout.classList.add('hidden')
            elMyMems.classList.add('hidden')
            break;
        case 'menu-meme-editor':
            elMemeEditor.classList.remove('hidden')
            elImageGallery.classList.add('hidden')
            elAbout.classList.add('hidden')
            elMyMems.classList.add('hidden')
            break;
        case 'menu-my-memes':
            elMyMems.classList.remove('hidden')
            elMemeEditor.classList.add('hidden')
            elImageGallery.classList.add('hidden')
            elAbout.classList.add('hidden')
            renderMemes()
            
            break;

        case 'menu-about':
            elAbout.classList.remove('hidden')
            elMemeEditor.classList.add('hidden')
            elImageGallery.classList.add('hidden')
            elMyMems.classList.add('hidden')
            break;
    }
}






