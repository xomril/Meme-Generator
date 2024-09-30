'use strict'

const MEMES_KEY = 'my_memes'
var gMemes = []

var gImgs = [
    { id: 1, url: "images/meme-imgs (various aspect ratios)/003.jpg", keywords: ['politic', 'bad'] },
    { id: 2, url: "images/meme-imgs (various aspect ratios)/004.jpg", keywords: ['animal', 'cute'] },
    { id: 3, url: "images/meme-imgs (various aspect ratios)/005.jpg", keywords: ['baby', 'animal', 'cute'] },
    { id: 4, url: "images/meme-imgs (various aspect ratios)/006.jpg", keywords: ['animal', 'cute'] },
    { id: 5, url: "images/meme-imgs (various aspect ratios)/12.jpg", keywords: ['funny'] },
    { id: 6, url: "images/meme-imgs (various aspect ratios)/19.jpg", keywords: ['funny'] },
    { id: 7, url: "images/meme-imgs (various aspect ratios)/2.jpg", keywords: ['happy'] },
    { id: 8, url: "images/meme-imgs (various aspect ratios)/5.jpg", keywords: ['funny', 'cute'] },
    { id: 9, url: "images/meme-imgs (various aspect ratios)/8.jpg", keywords: ['funny'] },
    { id: 10, url: "images/meme-imgs (various aspect ratios)/9.jpg", keywords: ['funny', 'baby', 'bad'] },
    { id: 11, url: "images/meme-imgs (various aspect ratios)/Ancient-Aliens.jpg", keywords: ['funny'] },
    { id: 12, url: "images/meme-imgs (various aspect ratios)/drevil.jpg", keywords: ['funny', 'bad'] },
    { id: 13, url: "images/meme-imgs (various aspect ratios)/img11.jpg", keywords: ['politic', 'happy'] },
    { id: 14, url: "images/meme-imgs (various aspect ratios)/img12.jpg", keywords: ['cute'] },
    { id: 15, url: "images/meme-imgs (various aspect ratios)/img2.jpg", keywords: ['funny', 'baby', 'happy', 'cute'] },
    { id: 16, url: "images/meme-imgs (various aspect ratios)/img4.jpg", keywords: ['politic', 'bad'] },
    { id: 17, url: "images/meme-imgs (various aspect ratios)/img5.jpg", keywords: ['funny', 'baby', 'cute'] },
    { id: 18, url: "images/meme-imgs (various aspect ratios)/img6.jpg", keywords: ['animal', 'cute'] },
    { id: 19, url: "images/meme-imgs (various aspect ratios)/leo.jpg", keywords: ['happy'] },
    { id: 20, url: "images/meme-imgs (various aspect ratios)/meme1.jpg", keywords: ['awkward'] },
    { id: 21, url: "images/meme-imgs (various aspect ratios)/One-Does-Not-Simply.jpg", keywords: [] },
    { id: 22, url: "images/meme-imgs (various aspect ratios)/Oprah-You-Get-A.jpg", keywords: ['happy'] },
    { id: 23, url: "images/meme-imgs (various aspect ratios)/patrick.jpg", keywords: ['funny', 'awkward'] },
    { id: 24, url: "images/meme-imgs (various aspect ratios)/putin.jpg", keywords: ['politic', 'bad'] },
    { id: 25, url: "images/meme-imgs (various aspect ratios)/X-Everywhere.jpg", keywords: ['funny'] }
]

var gMeme

var gKeywordSearchCountMap = { 'funny': 2, 'happy': 1, 'cat': 2, 'baby': 3, 'politic': 2, 'bad': 1, 'animal': 2, 'cute': 1, 'awkward': 2 }

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    const lineNum = getSelectedLineIdx()
    let line = createLine(lineNum, txt)
    gMeme.lines[gMeme.selectedLineIdx] = line
}

function setImg(imgId) {
    gMeme = createMeme(imgId)
}

function createMeme(imgId) {
    return {
        id: makeId(),
        selectedImgId: imgId,
        selectedLineIdx: 0,
        lines: []
    }
}

function getFontSize(selectedLineIdx) {
    const meme = getMeme()
    return 2 * meme.lines[selectedLineIdx].size
}

function setFontSize(diff) {
    const meme = getMeme()
    if (!meme.lines.length) return
    meme.lines[meme.selectedLineIdx].size += diff
    return meme.lines[meme.selectedLineIdx].size
}

function addLine(txt = '') {
    const meme = getMeme()
    const lineNun = getMeme().lines.length
    meme.lines.push(createLine(lineNun, txt))
    meme.selectedLineIdx = meme.lines.length - 1
}

function switchLine(lineNum = -1) {
    const meme = getMeme()
    if (lineNum > -1) {
        meme.selectedLineIdx = lineNum
        return
    }
    meme.selectedLineIdx = meme.selectedLineIdx != meme.lines.length - 1 ? meme.selectedLineIdx + 1 : 0
}

function isSelected(idx) {
    return getMeme().selectedLineIdx === idx
}

function setLineSelected(lineNum) {
    return getMeme().selectedLineIdx = lineNum
}

function updateStrokeColor(color) {
    const meme = getMeme()
    return meme.lines[meme.selectedLineIdx].strokeColor = color
}

function updateFillColor(color) {
    const meme = getMeme()
    return meme.lines[meme.selectedLineIdx].fillColor = color
}

function getSelectedLineIdx() {
    return getMeme() ? getMeme().selectedLineIdx : -1
}


function setLineInitPos(lineNum) {
    let y

    switch (lineNum) {
        case 0:
            y = 50
            break
        case 1:
            y = gElCanvas.height - 50
            break
        default:
            y = gElCanvas.height / 2
            break
    }

    return {
        x: gElCanvas.width / 2,
        y
    }
}

function createLine(lineNun, txt = '', size = 32, strokeColor = 'black', fillColor = 'white', font = 'impact') {
    const linePos = setLineInitPos(lineNun)
    return {
        txt,
        size,
        strokeColor,
        fillColor,
        pos: {
            x: linePos.x,
            y: linePos.y
        },
        font
    }
}

function getLinePos(lineIdx) {
    return getMeme().lines[lineIdx].pos
}

function setLineAlignment(x) {
    return getMeme().lines[getSelectedLineIdx()].pos.x = x
}

function getTextLength() {
    const lineLength = getMeme().lines[getSelectedLineIdx()].txt.length
    return lineLength
}

function getTextSize() {
    return getMeme().lines[getSelectedLineIdx()].size
}

function setSelectedLine(idx) {
    return getMeme().selectedLineIdx = idx
}


function getStrokeStyle() {
    return getMeme().lines[getSelectedLineIdx()].strokeColor
}

function getFillStyle() {
    return getMeme().lines[getSelectedLineIdx()].fillColor
}

function setFont(font) {
    return getMeme().lines[getSelectedLineIdx()].font = font
}

function save() {
    gMemes.push(getMeme())
    saveToStorage(MEMES_KEY, gMemes)
}

function getMemes() {
    return loadFromStorage(MEMES_KEY)
}

function filterImgs(filterBy) {
    const imgs = gImgs.slice()
    const keyword = filterBy.toLowerCase()

    return imgs.filter(img =>
        img.keywords.some(key => key.toLowerCase().includes(keyword))
    )
}

function addImgToGImg(img) {
    const id = makeId()
    gImgs.push(
        {
            id,
            url: img.src,
            keywords: []
        }
    )
    return id
}