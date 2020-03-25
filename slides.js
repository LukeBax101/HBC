const { Slide }  = require('./models');
const { newFile } = require('./files');
const fs = require('fs');
const path = require('path');

async function newSlide(req, fileName) {
    if (req && req['song_id'] && req['slide_no']) {
        const slide = await Slide.forge({
          'song_id': req['song_id'],
          'slide_no': req['slide_no'],
        }).save();
        const slideJson = slide.toJSON();
        fs.rename( path.join(__dirname,  `./database/images/slides/${fileName}`),  path.join(__dirname, `./database/images/slides/${slideJson['slide_id']}.png`))
        return slideJson;
    } else {
        throw new Error('Please provide song ID and slide number');
    }
}

async function deleteSlide(id) {
    await new Slide({ ['slide_id']: id }).destroy({require: true});
    // Remove slide from file system
    // What of 'slide_no' of other slides?
    try {
      await fs.unlinkSync(path.join(__dirname, `./database/images/slides/${id}.png`));
    } catch (e) {
      throw new Error('Could no delete from filesystem, perhaps the file does not exist');
    }
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

async function replaceSlide(id, fileName) {
  if (id) {
    await fs.unlinkSync(path.join(__dirname, `./database/images/slides/${id}.png`));;
    fs.rename(path.join(__dirname,  `./database/images/slides/${fileName}`),  path.join(__dirname, `./database/images/slides/${id}.png`));
    return 'Slide replaced successfully'
  } else {
    throw new Error('Please provide slide ID');
  }
}


module.exports = {
    newSlide,
    editSlide,
    deleteSlide,
    replaceSlide,
};
