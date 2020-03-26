const { Song, Slide }  = require('./models');
const { deleteSlide } = require('./slides');

async function newSong(req) {
    const song = await Song.forge({
      'name': (req && req.name) || 'Default',
    }).save();
    return song.toJSON();
}

async function getAllSongs() {
    const songsFetch = await Song.query(function (qb) {
      qb.leftJoin('session_songs', 'songs.song_id', 'session_songs.song_id');
      qb.groupBy('songs.song_id');
      qb.select("songs.*");
      qb.count('session_songs.session_id as session_count');
      qb.orderBy("session_count", "desc");
    }).fetchAll();
    const songs = songsFetch.toJSON();
    songs
    return songs;
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
        try {
            deleteSlide(slideId)
        } catch (e) {
            console.log('Could not delete slide');
        }
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
