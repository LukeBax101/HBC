const { Song, Slide }  = require('./models');

async function newSong(req) {
    const song = await Song.forge({
      'name': (req && req.name) || 'Default',
    }).save();
    return song.toJSON();
}

async function getAllSongs() {
    const songs = await Song.fetchAll();
    return songs.toJSON();
}

async function getSong(id) {
    const songRequest = await new Song({ ['song_id']: id }).fetch();
    const song = songRequest.toJSON();
    const slideRequest = await Slide.where({ ['song_id']: id }).fetchAll();
    return {
      ...song,
      slides: slideRequest.toJSON(),
    };
}

async function deleteSong(id) {
    const songFetch = await new Song({ ['song_id']: id }).fetch();
    const song = songFetch.toJSON();
    const slideFetch = await Slide.where({ ['song_id']: id }).fetchAll();
    const slides = await slideFetch.toJSON();
    slides.map(slide => slide['slide_id']).forEach(async (slideId) => {
        await new Slide({ ['slide_id']: slideId }).destroy({require: true});
        // Also delete slide from file system here
    });
    await new Song({ ['song_id']: id }).destroy({require: true});
    return 'Successfully deleted song';
}

async function editSong(id, req) {
    const songModel = await new Song({ ['song_id']: id });
    const songFetch = await songModel.fetch();
    const song = songFetch.toJSON();
    const songRequest = await songModel.set({
      'name': (req && req.name) || song.name,
    });
    return songModel.save();
}

module.exports = {
    newSong,
    getSong,
    getAllSongs,
    editSong,
    deleteSong,
};
