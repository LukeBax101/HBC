const { Slide }  = require('./models');

async function newSlide(req) {
    if (req && req['song_id'] && req['slide_no']) {
        const slide = await Slide.forge({
          'song_id': req['song_id'],
          'slide_no': req['slide_no'],
        }).save();
        // Add slide to file system
        //What of other slides order?
        return slide.toJSON();
    } else {
        throw new Error('Please provide song ID and slide number');
    }
}

async function getSlide(id) {
    const slideRequest = await new Slide({ ['slide_id']: id }).fetch();
    const slide = slideRequest.toJSON();
    // get slide from file system
    return {
      ...slide,
    };
}

async function deleteSlide(id) {
    await new Slide({ ['slide_id']: id }).destroy({require: true});
    // Remove slide from file system
    // What of 'slide_no' of other slides?
    return 'Successfully deleted slide';
}

async function editSlide(id, req) {
    const slideModel = await new Slide({ ['slide_id']: id });
    const slideFetch = await slideModel.fetch();
    const slide = slideFetch.toJSON();
    const slideRequest = await slideModel.set({
      'slide_no': (req && req['slide_no']) || slide['slide_no'],
    });
    // Modify slide in file system
    return slideModel.save();
}


module.exports = {
    newSlide,
    getSlide,
    editSlide,
    deleteSlide,
};
