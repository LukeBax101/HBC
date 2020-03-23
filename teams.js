const { Team }  = require('./models');

async function newTeam(req) {
    if (req && req['session_id']) {
        const team = await Team.forge({
          'session_id': req['session_id'],
          name: (req && req.name) || 'Default',
          color:  (req && req.color) || '#000000',
          score: 0
        }).save();
        // Team icons?
        return team.toJSON();
    } else {
        throw new Error('Please provide session ID');
    }
}

async function deleteTeam(id) {
    await new Team({ ['team_id']: id }).destroy({require: true});
    // Team icons?
    return 'Successfully deleted team';
}

async function editTeam(id, req) {
    const teamModel = await new Team({ ['team_id']: id });
    const teamFetch = await teamModel.fetch();
    const team = teamFetch.toJSON();
    const teamRequest = await teamModel.set({
      name: (req && req.name) || team.name,
      color: (req && req.color) || team.color,
      score: team.score + ((req && req.score) || 0),
    });
    // Team icons?
    return teamModel.save();
}


module.exports = {
    newTeam,
    editTeam,
    deleteTeam,
};
