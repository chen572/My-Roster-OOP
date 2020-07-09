const express = require('express')
const router = express.Router()
const urllib = require('urllib')

const teamToIDs = require('../../DB/teams')
const dreamTeam = require('../../DB/dreamTeam')

router.get('/teams/:teamName', (req, res) => {
    const { teamName } = req.params

    urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', (err, data) => {
        const players = JSON.parse(data.toString()).league.standard

        const filteredPlayers = players.filter((p) => {
            if (p.teams.length) {
                return p.teams[p.teams.length - 1].teamId == teamToIDs[teamName] && p.isActive
            } return false
        })
            .map((p) => ({
                firstName: `${p.firstName}`,
                lastName: `${p.lastName}`,
                jersey: `${p.jersey}`,
                pos: `${p.pos}`,
            }))
        res.send(filteredPlayers)
    })
})

router.get('/playerStats/:player', (req, res) => {
    const playerNameQ = req.params.player.split(' ').join('/')

    urllib.request(`https://nba-players.herokuapp.com/players-stats/${playerNameQ}`, (err, data) => {
        res.send(JSON.parse(data.toString()))
    })

})

router.get('/dreamTeam', (req, res) => {
    res.send(dreamTeam)
})

router.post('/roster', (req, res) => {
    const player = req.body
    player.firstName = player.name.split(' ')[1]
    player.lastName = player.name.split(' ')[0]

    if (dreamTeam.some(p =>
        p.name == player.name &&
        p.pos == player.pos &&
        p.jersey == player.jersey
    )) {
        res.end()
    } else {
        dreamTeam.length < 5 ? dreamTeam.push(player) : res.end()
    }
})

router.delete('/roster', (req, res) => {
    const player = req.body
    player.firstName = player.name.split(' ')[1]
    player.lastName = player.name.split(' ')[0]
    dreamTeam.splice(dreamTeam.indexOf(player), 1);
    res.end()
})

router.put('/team', (req, res) => {
    teamToIDs[Object.keys(req.body)] = req.body[Object.keys(req.body)[0]]
    res.end()
})

module.exports = router