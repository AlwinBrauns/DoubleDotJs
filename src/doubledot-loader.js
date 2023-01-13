module.exports = function(source){
    source = source.replace(/(\r\n|\n|\r)/gm, "");

    const elements = getElements(source)
    const addElementsCode = getCodeToAddElements(elements)
    const result = `
    const create = () => {
        let elements = []
        ${addElementsCode}
        console.dir(elements)
        return elements
    }
    const elementList = create()
    export default function Elements() { return elementList }
    `
    this.callback(null, result)
    return
}

function getElements(source) {
    const getHtmlElementText = (type) => {
        return type.split('>')[1];
    }
    const sourceParts = source.split(':')

    const elements = [];
    for (let index = 0; index < sourceParts.length; index += 2) {
        const _type = sourceParts[index].split('>')[0];
        const _class = sourceParts[index+1];
        const _text = getHtmlElementText(sourceParts[index])

        elements.push({
            type: _type,
            class: _class,
            text: _text?_text:''
        })
    }
    return elements
}

function getCodeToAddElements(elements) {
    const pushElementCode = (index) => `
        elements.push(document.createElement('${elements[index].type}'))
        elements[${index}].classList.add('${elements[index].class}')
        elements[${index}].innerText = '${elements[index].text}'
    `
    let pushers = ""
    for (let index = 0; index < elements.length; index++) {
        pushers = pushers + (pushElementCode(index))
    }
    return pushers
}