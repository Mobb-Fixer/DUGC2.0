const jwt = require("jsonwebtoken");
const Roles = require("../helpers/constants.js");
const userModel = require("../models/user.js");

module.exports = class AuthMiddleware {
  async verifyToken(req, res, next) {
    console.log("HI FROM HERE");
    const token = req.headers("Authorization");
    console.log("TOKEN: ", token);

    if (!token) {
      return res.status(400).send("Access Denied! No token received");
    }

    try {
      const jwtData = jwt.verify(
        token.split("Bearer ")[1],
        process.env.JWT_SECRET_TOKEN
      );

      req.jwtData = jwtData; // Attach jwtData to request object
      next(); // Call next function
    } catch (err) {
      return res.status(400).send({
        success: false,
        error: err,
      });
    }
  }

  async isDugcChairman(req, res, next) {
    try {
      const token = req.headers["authorization"];
      console.log("TOKEN: ", token);

      if (!token) {
        return res.status(400).send("Access Denied! No token received");
      }

      let jwtData;
      try {
        jwtData = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).send({
          success: false,
          error: err,
        });
      }
      const user = await userModel.findOne({ _id: jwtData?._id });
      if (user.role !== Roles.DUGCCHAIRMAN) throw new Error();
      req.user = user?.toObject();
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }

  async isDugcCord(req, res, next) {
    try {
      const token = req.headers["authorization"];
      console.log("TOKEN: ", token);

      if (!token) {
        return res.status(400).send("Access Denied! No token received");
      }

      let jwtData;
      try {
        jwtData = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).send({
          success: false,
          error: err,
        });
      }
      const user = await userModel.findOne({ _id: jwtData?._id });
      if (user.role !== Roles.DUGCCORD) throw new Error();
      req.user = user?.toObject();
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }

  async isFacultyCord(req, res, next) {
    try {
      const token = req.headers["authorization"];
      console.log("TOKEN: ", token);

      if (!token) {
        return res.status(400).send("Access Denied! No token received");
      }

      let jwtData;
      try {
        jwtData = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).send({
          success: false,
          error: err,
        });
      }
      const user = await userModel.findOne({ _id: jwtData?._id });
      if (user.role !== Roles.FACULTYCORD) throw new Error();
      req.user = user?.toObject();
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }

  async isFaculty(req, res, next) {
    try {
      const token = req.headers["authorization"];
      console.log("TOKEN: ", token);

      if (!token) {
        return res.status(400).send("Access Denied! No token received");
      }

      let jwtData;
      try {
        jwtData = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).send({
          success: false,
          error: err,
        });
      }
      const user = await userModel.findOne({ _id: jwtData?._id });
      if (user.role !== Roles.FACULTY) throw new Error();
      req.user = user?.toObject();
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }

  async isBothCoordinator(req, res, next) {
    try {
      const token = req.headers["authorization"];
      console.log("TOKEN: ", token);

      if (!token) {
        return res.status(400).send("Access Denied! No token received");
      }

      let jwtData;
      try {
        jwtData = jwt.verify(token.split("Bearer ")[1], process.env.JWT_SECRET);
      } catch (err) {
        return res.status(400).send({
          success: false,
          error: err,
        });
      }
      const user = await userModel.findOne({ _id: jwtData?._id });
      if (user.role !== Roles.DUGCCORD || user.role !== Roles.FACULTYCORD)
        throw new Error();
      req.user = user?.toObject();
      next();
    } catch (err) {
      res
        .status(400)
        .send({ error: "auth failed for STAFF, check auth-token222" });
    }
  }
};
