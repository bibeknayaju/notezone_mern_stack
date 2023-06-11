const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URL;
const bcryptjs = require("bcrypt");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Admin = require("./models/Admin");
const Content = require("./models/Content");
const Verifier = require("./models/Verifier");
const Contributor = require("./models/Contributor");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdfe45we45w345wegw345werjktjwertkjsfa1";
const fs = require("fs");
const path = require("path");
const bcryptSalt = bcryptjs.genSaltSync(10);
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "pdfupload/",
});

// Set the Multer upload options
// const pdfMiddleware = multer({
//   storage: storage,
//   limits: {
//     // Increase the field value size limit to 10MB (adjust as needed)
//     fieldSize: 10 * 1024 * 1024,
//   },
// });

const pdfMiddleware = multer({
  dest: "pdfupload/",
  limits: {
    fieldSize: 10 * 1024 * 1024,
  },
});

mongoose.connect(uri);
app.use("/pdfupload", express.static(path.join(__dirname, "pdfupload")));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

// for creating the admin only
app.post("/admin/register", async (req, res) => {
  try {
    const { adminName, email, password } = req.body;
    await Admin.create({
      email,
      adminName,
      password: bcryptjs.hashSync(password, bcryptSalt),
    });
    res.send(200).json({ message: "Admin ID created successfully" });
  } catch (error) {
    console.log(error);
  }
});

// for logging the admin
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      const passOK = await bcryptjs.compare(password, admin.password);
      if (!passOK) {
        return res.status(422).json("Password doesn't matched");
      }
      jwt.sign(
        { email: admin.email, id: admin._id },
        jwtSecret,
        {},
        (error, adminToken) => {
          if (error) throw error;
          res.cookie("token", adminToken).json({
            role: admin.role,
            email: admin.email,
            _id: admin._id,
          });
        }
      );
    }

    // checking for the verifier as well
    const verifier = await Verifier.findOne({ email });
    if (verifier) {
      const passOk = await bcryptjs.compare(password, verifier.password);
      if (!passOk) {
        return res.status(422).json("Password doesn't matched");
      }
      jwt.sign(
        { email: verifier.email, id: verifier._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(verifier);
        }
      );
    }

    // checking for the contributor as well
    const contributor = await Contributor.findOne({ email });
    if (contributor) {
      const passOk = await bcryptjs.compare(password, contributor.password);
      if (!passOk) {
        return res.status(422).json("Password doesn't matched");
      }
      jwt.sign(
        { email: contributor.email, id: contributor._id },
        jwtSecret,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(contributor);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
});

// for creating the verifier by admin
app.post("/verifier/register", async (req, res) => {
  const { verifierName, verifierUsername, verifierEmail, verifierPassword } =
    req.body;
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      try {
        const admin = await Admin.findById(userData.id);
        if (admin) {
          const verifierDoc = await Verifier.create({
            email: verifierEmail,
            fullName: verifierName,
            username: verifierUsername,
            password: bcryptjs.hashSync(verifierPassword, bcryptSalt),
            admin: admin._id, // Save the admin reference in the verifier document
          });
          res.json(verifierDoc);
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
});

// for registering the contributor
app.post("/contributor/register", async (req, res) => {
  const { fullName, email, username, password } = req.body;
  try {
    const response = await Contributor.create({
      fullName,
      username,
      password: bcryptjs.hashSync(password, bcryptSalt),
      email,
    });
    res.send(200).json({ fullName, email, username });
  } catch (error) {
    console.log(error);
  }
});

// for getting the profile of the logged in contributor/admin/verifier
app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (error, userData) => {
      if (error) throw error;
      const admin = await Admin.findById(userData.id);
      if (admin) {
        const { email, role, _id, adminName } = admin;
        return res.json({ email, adminName, role, _id });
      }

      const verifier = await Verifier.findById(userData.id);
      if (verifier) {
        const { email, role, fullName, _id } = verifier;
        return res.json({ email, role, fullName, _id });
      }

      const contributor = await Contributor.findById(userData.id);
      if (contributor) {
        const { email, role, _id, fullName } = contributor;
        return res.json({ email, role, _id, fullName });
      }
    });
  }
});

// for uploadin the pdf file
app.post("/upload/pdf", pdfMiddleware.array("pdfFile", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("pdfupload/", ""));
  }
  res.json(uploadedFiles);
});

// for posting the content in the db
app.post("/create/content", (req, res) => {
  const { token } = req.cookies;
  const { selectedSemester, title, pdfFile } = req.body;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const contentDoc = await Content.create({
        contributor: userData.id,
        semester: selectedSemester,
        title: title,
        pdfFile: pdfFile,
      });
      res.status(200).json(contentDoc);
    });
  }
});

// for retrieving the data from content model
app.get("/contents", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        res.json(
          await Content.find().populate("contributor", [
            "username",
            "fullName",
            "email",
          ])
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
});

// for logging out the user logged in the system
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(4000);
