const apiManager = new ApiManager()
const renderer = new Renderer()

$('#search').click(() => {
    const teamName = $('#team-input').val()
    apiManager.getTeam(teamName)
        .then(() => { renderer.render('#players-template', apiManager.team, '#roster') })
})

$('#roster').on('click', '.player-img-container, .stats', event => {
    const playerDiv = $(event.currentTarget).closest('.players')
    const playerName = playerDiv.data().name

    if (playerDiv.hasClass('stats-T')) {
        renderer.render('#players-template', apiManager.team, '#roster')
        playerDiv.removeClass('stats-T')
    } else {
        apiManager.getStats(playerName)
            .then((stats) => {
                renderer.renderStats('#player-stats-template', stats, playerDiv)
                playerDiv.addClass('stats-T')
            })
    }
})

$('#dream-team-btn').click(() => {
    apiManager.getDreamteam()
        .then(data => { renderer.render('#dreamTeam-template', data, '#roster') })
})

$('#roster').on('click', '.add-to-dt', event => {
    const player = $(event.currentTarget).closest('.players').data()
    apiManager.addToDreamTeam(player)
})

$('#roster').on('click', '.remove-from-dt', event => {
    const player = $(event.currentTarget).closest('.players').data()

    apiManager.removeFromDreamTeam(player)
        .then(apiManager.getDreamteam()
            .then(data => {
                renderer.render('#dreamTeam-template', data, '#roster')
            }))
})