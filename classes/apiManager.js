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
        return $.get(`/playerStats/${playerName}`, data => data)
    }


    getDreamteam() {
        return $.get('/dreamTeam', data => data)
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
