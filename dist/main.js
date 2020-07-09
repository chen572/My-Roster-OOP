const apiManager = new ApiManager()
const renderer = new Renderer()

$('#search').click(() => {
    const teamName = $('#team-input').val()
    apiManager.getTeam(teamName)
        .then(() => { renderer.render('#players-template', apiManager.team, '#roster') })
})

$('#roster').on('click', '.player-img-container', event => {
    const playerDiv = $(event.currentTarget).closest('.players')
    const playerName = playerDiv.data().name

    //hasClass addClass removeClass

    apiManager.getStats(playerName)
        .then((a) => {
            renderer.renderStats('#player-stats-template', a, playerDiv)
        })
})
// apiManager.getDreamteam().then((a) => { console.log(a) })
// apiManager.addToDreamTeam({ "tests": "testt", name: "this istest" })
//     .then(apiManager.getDreamteam().then((a) => { console.log(a) }))