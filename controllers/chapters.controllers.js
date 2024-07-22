const { Chapter } = require("../models/Chapter");
const { Committee } = require("../models/Committee");

async function createChapterController(req, res) {
  try {
    const chapter = await Chapter.create(req.body);
    return res.status(201).json(chapter);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getChaptersController(req, res) {
  try {
    const chapters = await Chapter.find().populate("committees");
    return res.status(200).json(chapters);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getChapterByIdController(req, res) {
  try {
    const chapter = await Chapter.findById(req.params.id).populate(
      "committees"
    );
    if (!chapter) {
      return res.status(404).json("Chapter Not Found");
    }
    return res.status(200).json(chapter);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function updateChapterNameController(req, res) {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json("Chapter Not Found");
    }
    chapter.name = req.body.name;
    await chapter.save();
    return res.status(200).json("Updated..");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function addCommitteeToChapterController(req, res) {
  try {
    let chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json("Chapter Not Found");
    }
    const committee = await Committee.findById(req.body.committeeId).populate(
      "Chapter"
    );
    if (!committee) {
      return res.status(404).json("Committee Not Found");
    }
    if (committee.chapter) {
      return res.status(400).json("Committee Already Has A Chapter..");
    }
    if (chapter.committees.includes(committee._id)) {
      return res.status(400).json("Committee Already Exists In Chapter..");
    }
    chapter.committees.push(committee._id);
    await chapter.save();
    committee.chapter = chapter._id;
    await committee.save();
    return res.status(200).json("Added..");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function removeCommitteeFromChapterController(req, res) {
  try {
    let chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json("Chapter Not Found");
    }
    const committee = await Committee.findById(req.body.committeeId).populate(
      "Chapter"
    );
    if (!committee) {
      return res.status(404).json("Committee Not Found");
    }
    if (!committee.chapter) {
      return res.status(400).json("Committee Doesn't Have A Chapter..");
    }
    if (!chapter.committees.includes(committee._id)) {
      return res.status(400).json("Committee Doesn't Exist In Chapter..");
    }
    committee.chapter = null;
    await committee.save();
    chapter.committees = chapter.committees.filter((comm) => {
      return comm != committee._id;
    });
    await chapter.save();
    return res.status(200).json("Removed..");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = {
  addCommitteeToChapterController,
  getChaptersController,
  getChapterByIdController,
  createChapterController,
  removeCommitteeFromChapterController,
  updateChapterNameController,
};
