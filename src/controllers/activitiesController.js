const { validationResult } = require('express-validator');

class ActivitiesController {
    async listActivities(req, res, next) {
      
    }
    async createPicture(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.json({ok:'hey'})
    }

    async createPublication(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.json({ok:'hey'})
      // PARSE DURATION
    }

    async createManualPA(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.json({ok:'hey'})
      // PARSE DURATION
    }

    async createAutoPA(req, res, next) {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      res.json({ok:'hey'})
      // try {
      //   const service = new AlertConfigService(req);
      //   const response = await service.create(req.body);
      //   res.json(response);
      // } catch (e) {
      //   next(e);
      // }
    }
}

module.exports = ActivitiesController;