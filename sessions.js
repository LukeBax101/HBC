const { Session, Dates, State, Team }  = require('./models');
const fs = require('fs');
const path = require('path');

async function newSession(req) {
    let dates = await Dates.forge({
      'start': (req && req['day_1']) || new Date(),
      'final': (req && req.final) || new Date()
    }).save();
    const datesId = dates.toJSON()['dates_id'];
    let state = await State.forge({
      'home': true,
      'race': false,
      'song_overlay': false,
      'slide_id': null
    }).save();
    const stateId = state.toJSON()['state_id'];
    let session = await Session.forge({
      'name': (req && req.name) || 'Default',
      'password_hash': req && req['password_hash'],
      'dates_id': datesId,
      'state_id': stateId
    }).save();
    // Race background?
    // Home background?
    return session.toJSON();
}

async function getAllSessions() {
    const sessions = await Session.fetchAll();
    return sessions.toJSON();
}

async function getSession(id) {
    const sessionRequest = await new Session({ ['session_id']: id }).fetch();
    const session = sessionRequest.toJSON();
    const datesRequest = await new Dates({ ['dates_id']: session['dates_id'] }).fetch();
    const stateRequest = await new State({ ['state_id']: session['state_id'] }).fetch();
    const teamRequest = await Team.where({ ['session_id']: id }).fetchAll();
    // Race background?
    // Home background?
    return {
      ...session,
      state: stateRequest.toJSON(),
      dates: datesRequest.toJSON(),
      teams: teamRequest.toJSON(),
    };
}

async function deleteSession(id) {
    const sessionFetch = await new Session({ ['session_id']: id }).fetch();
    const session = sessionFetch.toJSON();
    const teamFetch = await Team.where({ ['session_id']: id }).fetchAll();
    const teams = await teamFetch.toJSON();
    teams.map(team => team['team_id']).forEach(async (teamId) => {
        await new Team({ ['team_id']: teamId }).destroy({require: true});
        // Team icons?
    });
    await new Session({ ['session_id']: id }).destroy({require: true});
    // Race background?
    // Home background?
    await new Dates({ ['dates_id']: session['dates_id'] }).destroy({require: true});
    await new State({ ['state_id']: session['state_id'] }).destroy({require: true});

    return 'Successfully deleted session';
}

async function editSession(id, req) {
    const sessionModel = await new Session({ ['session_id']: id });
    const sessionFetch = await sessionModel.fetch();
    const session = sessionFetch.toJSON();
    const sessionRequest = await sessionModel.set({
      'name': (req && req.name) || session.name,
      'password_hash': (req && req['password_hash']) || session['password_hash']
    });
    // Race background?
    // Home background?
    return sessionModel.save();
}

async function editState(id, req) {
    if (req) {
        const stateModel = await new State({ ['state_id']: id });
        const stateFetch = await stateModel.fetch();
        const state = stateFetch.toJSON();
        let update = {};
        switch (req.state) {
            case 'home':
                update = {
                    home: true,
                    race: false,
                    'slide_id': null,
                };
                break;
            case 'race':
                update = {
                    home: false,
                    race: true,
                    'slide_id': null,
                };
                break;
            case 'song':
                if (req['slide_id']) {
                  update = {
                      home: false,
                      race: false,
                      'slide_id': req['slide_id'],
                  };
                } else {
                  throw new Error('No slide Id provided')
                }
                break;
            default:
                break;
        }
        const stateRequest = await stateModel.set({
          ...update,
          'song_overlay': (req && req['song_overlay']) || state['song_overlay'],
        });
        return stateModel.save();
    } else {
      throw new Error('No request body set');
    }
}

async function editDates(id, req) {
    const datesModel = await new Dates({ ['dates_id']: id });
    const datesFetch = await datesModel.fetch();
    const dates = datesFetch.toJSON();
    const datesRequest = await datesModel.set({
      'start': (req && req['start']) || dates['start'],
      'final': (req && req.final) || dates.final
    });
    return datesModel.save();
}

async function sessionRaceUpload(id, fileName) {
    fs.rename( path.join(__dirname,  `./database/images/sessions/race/${fileName}`),  path.join(__dirname, `./database/images/sessions/race/${id}.png`), () => {});
    return 'Race image uplaoded successfully'
}

async function sessionHomeUpload(id, fileName) {
    fs.rename( path.join(__dirname,  `./database/images/sessions/home/${fileName}`),  path.join(__dirname, `./database/images/sessions/home/${id}.png`), () => {});
    return 'Home image uplaoded successfully'
}

async function deleteSessionRace(id) {
  try {
    await fs.unlinkSync(path.join(__dirname, `./database/images/sessions/race/${id}.png`));
  } catch (e) {
    throw new Error('Could no delete from filesystem, perhaps the file does not exist');
  }
  return 'Successfully deleted race image';
}

async function deleteSessionHome(id) {
  try {
    await fs.unlinkSync(path.join(__dirname, `./database/images/sessions/home/${id}.png`));
  } catch (e) {
    throw new Error('Could no delete from filesystem, perhaps the file does not exist');
  }
  return 'Successfully deleted home image';
}


module.exports = {
    newSession,
    getAllSessions,
    getSession,
    editSession,
    deleteSession,
    editDates,
    editState,
    sessionRaceUpload,
    sessionHomeUpload,
    deleteSessionRace,
    deleteSessionHome,
};
