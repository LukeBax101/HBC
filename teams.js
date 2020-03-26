const { Team }  = require('./models');
const fs = require('fs');
const path = require('path');

async function newTeam(req) {
    if (req && req['session_id']) {
        const team = await Team.forge({
          'session_id': req['session_id'],
          name: (req && req.name) || 'Default',
          color:  (req && req.color) || '#000000',
          score: 0
        }).save();
        return team.toJSON();
    } else {
        throw new Error('Please provide session ID');
    }
}

async function deleteTeam(id) {
    await new Team({ ['team_id']: id }).destroy({require: true});

    try {
        await deleteTeamIcon(id);
    } catch (e) {}
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
    return teamModel.save();
}

async function teamIconUpload(id, fileName) {
    fs.rename( path.join(__dirname,  `./database/images/teams/${fileName}`),  path.join(__dirname, `./database/images/teams/${id}.gif`), () => {});
    return 'Team icon uploaded successfully'
}

async function deleteTeamIcon(id) {
  try {
    await fs.unlinkSync(path.join(__dirname, `./database/images/teams/${id}.gif`));
  } catch (e) {
    throw new Error('Could no delete from filesystem, perhaps the file does not exist');
  }
  return 'Successfully deleted team icon';
}


module.exports = {
    newTeam,
    editTeam,
    deleteTeam,
    teamIconUpload,
    deleteTeamIcon,
};
