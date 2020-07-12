class ApiManager {
    constructor() {
        this.team = []
    }

    getTeam(teamName) {
        return $.get(`/teams/${teamName.toLowerCase()}`, data => {
            this.team = data
        })
    }

    getStats(playerName) {
        return $.get(`/playerStats/${playerName}`)
    }


    getDreamteam() {
        return $.get('/dreamTeam')
    }

    addToDreamTeam(player) {
        return $.post('/roster', player)
    }
    
    removeFromDreamTeam(player) {
        return $.ajax({
            type: 'DELETE',
            url: '/roster',
            contentType: 'application/json',
            data: JSON.stringify(player)
        })
    }
}
