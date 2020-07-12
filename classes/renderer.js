class Renderer {
    render(sourceName, data, appendTo) {
        const source = $(`${sourceName}`).html()
        const template = Handlebars.compile(source)
        const newHTML = template({ data })

        appendTo.empty().append(newHTML)
    }
}