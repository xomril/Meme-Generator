'use strict'

const HIGHLIGHTED_DIFF = 20
var gElCanvas
var gCtx

function renderMeme(meme) {



    const elImg = new Image()
    elImg.src = gImgs.find(img => img.id === meme.selectedImgId).url

    elImg.onload = () => {
        coverCanvasWithImg(elImg)
        meme.lines.forEach((line, idx) => {
            document.fonts.load(`${line.size * 2}px ${line.font}`).then(() => {
                drawText(line);
            });
            if (isSelected(idx)) drawRect(idx, line.size)

        })
    }
}

// Lets cover a fixed-width canvas using an img
// changing the canvas height
function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function handleKeyPress(ev) {
    if (ev.key === "Enter") {
        ev.preventDefault()
        setLineSelected(-1)
        renderMeme(getMeme())
        outOfFocus()
    }
}

function outOfFocus() {
    const inputValue = document.querySelector('.line-input')
    inputValue.blur()
    inputValue.value = ""

}
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    // Changing the canvas dimension clears the canvas
    gElCanvas.width = elContainer.clientWidth - 10
    if (gMeme) renderMeme(getMeme())
}


function drawText(line, ctx = gCtx) {

    const { txt, size, strokeColor, fillColor, pos, font } = line

    ctx.lineWidth = 2
    ctx.strokeStyle = strokeColor
    ctx.fillStyle = fillColor
    ctx.font = `${size * 2}px ${font}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(txt, pos.x, pos.y)
    ctx.strokeText(txt, pos.x, pos.y)
}


function onIncreaseFont() {
    setFontSize(2)
    renderMeme(getMeme())
}

function onDecreaseFont() {
    setFontSize(-2)
    renderMeme(getMeme())
}

function onAddLine() {
    addLine()
}

function onSwitchLine() {
    switchLine()
    renderMeme(getMeme())
}

function onInput(elInput) {
    setLineTxt(elInput.value)
    renderMeme(getMeme())
}

function downloadCanvas(elLink) {
    const dataUrl = gElCanvas.toDataURL()
    elLink.href = dataUrl
    // Set a name for the downloaded file
    elLink.download = 'my-img'
}

const fillColorPicker = document.querySelector('input[name="color-picker-fill"]')
fillColorPicker.addEventListener('input', function () {
    updateFillColor(fillColorPicker.value)
    renderMeme(getMeme())
})

function onSetFillColor() {
    document.querySelector('.brush').click()
}

const strokeColorPicker = document.querySelector('input[name="color-picker-stroke"]')
strokeColorPicker.addEventListener('input', function () {
    updateStrokeColor(strokeColorPicker.value)
    renderMeme(getMeme())
})
function onSetStrokeColor() {
    document.querySelector('.stroke').click()
}

function selectItem(ev) {

    const { offsetY } = ev

    const clickedLine = gMeme.lines.findIndex(line => {
        return (
            line.pos.y - HIGHLIGHTED_DIFF <= offsetY &&
            offsetY <= line.pos.y + HIGHLIGHTED_DIFF
        )
    })

    setLineSelected(clickedLine)

    renderMeme(getMeme())
}


function drawRect(lineNum, size) {
    const y = getLinePos(lineNum).y
    gCtx.beginPath()
    gCtx.strokeStyle = 'yellow'
    gCtx.lineWidth = 3
    gCtx.rect(5, y - (size), (gElCanvas.width - 10), size * 2)
    gCtx.stroke()

}

function onLeftAlignment() {
    const x = getTextLength() * getTextSize() / 2
    setLineAlignment(x)
    renderMeme(getMeme())
}

function onCenterAlignment() {
    const x = gElCanvas.width / 2
    setLineAlignment(x)
    renderMeme(getMeme())
}

function onRightAlignment() {
    const x = gElCanvas.width - (getTextLength() * getTextSize() / 2)
    setLineAlignment(x)
    renderMeme(getMeme())
}

function onFontSelected() {
    setFont(document.querySelector('.font-type').value)
    renderMeme(getMeme())
}

function handleCanvasKeyPress(ev) {
    
    const idx = getSelectedLineIdx()
    if (idx > -1) {
        const line = getMeme().lines[idx]
        if (ev.key === "ArrowDown") {
            ev.preventDefault()
            line.pos.y += line.size / 4
        }
        if (ev.key === "ArrowUp") {
            ev.preventDefault()
            line.pos.y -= line.size / 4
        }
        renderMeme(getMeme())
    }
}

function onDeleteLine() {
    const idx = getSelectedLineIdx()
    if (idx > -1) {
        getMeme().lines.splice(idx, 1)
        renderMeme(getMeme())
    }
}

function onSave() {
    save()
}

function renderMemes() {
    const memes = getMemes()
    let ctx
    let strHTML = ''
    const elMyMems = document.querySelector('.my-mems div')
    
    memes.forEach((meme) => {
        strHTML +=`<canvas data-id="${meme.id}" onclick="selectmeme(event)">
                    </canvas>`
    })
    elMyMems.innerHTML = strHTML

    memes.forEach((meme, idx) => {
        const elImg = new Image()
        elImg.src = gImgs.find(img => img.id === meme.selectedImgId).url

        elImg.onload = () => {
            let canvas = elMyMems.querySelector(`[data-id="${meme.id}"]`) 
            ctx = canvas.getContext('2d')
            canvas.height = (elImg.naturalHeight / elImg.naturalWidth) * canvas.width
            ctx.drawImage(elImg, 0, 0, canvas.width, canvas.height)
            meme.lines.forEach((line, idx) => {
                document.fonts.load(`${line.size * 2}px ${line.font}`).then(() => {
                    drawText(line, ctx);
                });
                if (isSelected(idx)) drawRect(idx, line.size)

            })
        }
    }
    )
}


function onAddSticker(sticker){
    addLine(sticker)
    renderMeme(getMeme())
}

function onUploadToFB(url) {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}



function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

    // After a successful upload, allow the user to share on Facebook
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
        `
        document.querySelector('.share-button').classList.remove('disabled')
    }

    uploadImg(canvasData, onSuccess)
}

