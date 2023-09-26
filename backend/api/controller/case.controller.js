const caseService = require('../service/case-service');

class CaseController {
  async getAllCases(req, res, next) {
    try {
      const cases = await caseService.getAllCases(req.query);
      res.status(200).json(cases);
    } catch (e) {
      next(e);
    }
  }

  async getCaseById(req, res, next) {
    try {
      const caseFromDb = await caseService.getCaseById(req.params);
      res.status(200).json(caseFromDb);
    } catch (e) {
      next(e);
    }
  }

  async openCase(req, res, next) {
    try {
      const result = await caseService.openCase(req.body);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  async createCase(req, res, next) {
    try {
      const newCase = await caseService.createCase(req.body);
      console.log(newCase);
      res.status(200).json(newCase);
    } catch (e) {
      next(e);
    }
  }

  async createCaseGroup(req, res, next) {
    try {
      const group = await caseService.createCaseGroup(req.body);
      res.status(200).json(group);
    } catch (e) {
      next(e);
    }
  }

  async getCaseGroups(req, res, next) {
    try {
      const groups = await caseService.getCaseGroups();
      res.status(200).json(groups);
    } catch (e) {
      next(e);
    }
  }

  async editCaseGroup(req, res, next) {
    try {
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  async editCase(req, res, next) {
    try {
      res.status(200).json();
    } catch (e) {
      next(e);
    }
  }

  async deleteCase(req, res, next) {
    try {
      const deleted = await caseService.deleteCase(req.params);
      res.status(200).json(deleted);
    } catch (e) {
      next(e);
    }
  }

  async deleteCaseGroup(req, res, next) {
    try {
      const deleted = await caseService.deleteCaseGroup();
      res.status(200).json(deleted);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CaseController();
