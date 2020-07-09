class ApiManager {
    constructor() {
        this.team = []
        this.dreamTeam = []
    }

    getTeam(teamName) {
        return $.get(`/teams/${teamName.toLowerCase()}`, data => {
            this.team = data
        })
    }

    getStats(playerName) {
        return $.get(`/playerStats/${playerName}`, data => {
            return data
        })
    }


    getDreamteam() {
        return $.get('/dreamTeam', data => {
            return data
        })
    }

    addToDreamTeam(player) {
        return $.post('/roster', player)
    }
}
