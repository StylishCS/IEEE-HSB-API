const { Application } = require("../models/Application");
const { ApplicationAnswer } = require("../models/ApplicationAnswer");

async function createApplicationController(req, res) {
  try {
    req.body.image = req.cloudinaryResult.secure_url;
    const application = await Application.create(req.body);
    return res.status(201).json(application);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getApplicationsController(req, res) {
  try {
    const applications = await Application.find().select("-answers");
    return res.status(200).json(applications);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getApplicationByIdController(req, res) {
  try {
    const application = await Application.findById(req.params.id).select(
      "-answers"
    );
    if (!application) {
      return res.status(404).json("Application Not Found..");
    }
    return res.status(200).json(application);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function submitAnswerApplicationController(req, res) {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json("Application Not Found..");
    }
    const currentDate = new Date();
    const startDate = new Date(application.date[0]);
    const endDate = new Date(application.date[1]);

    if (currentDate < startDate || currentDate > endDate) {
      return res.status(400).json("Application is closed for submissions.");
    }

    const applicationAnswer = new ApplicationAnswer({
      application: application._id,
      form: req.body.applicationAnswer,
    });
    await applicationAnswer.save();
    application.answers.push(applicationAnswer._id);
    await application.save();
    return res.status(201).json("Answer Sent..");
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function getApplicationWithAnswersController(req, res) {
  try {
    const application = await Application.find().populate("answers");
    return res.status(200).json(application);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function getApplicationByIdWithAnswersController(req, res) {
  try {
    const application = await Application.findById(req.params.id).populate(
      "answers"
    );
    if (!application) {
      return res.status(404).json("Application Not Found..");
    }
    return res.status(200).json(application);
  } catch (err) {
    console.log(err);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
module.exports = {
  createApplicationController,
  getApplicationsController,
  getApplicationByIdController,
  submitAnswerApplicationController,
  getApplicationWithAnswersController,
  getApplicationByIdWithAnswersController,
};
