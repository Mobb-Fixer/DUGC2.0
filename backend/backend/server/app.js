var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var jwt = require("jsonwebtoken");
var { config } = require("dotenv");

var cors = require("cors");

var mongoose = require("mongoose");
const { errorMiddleware } = require("./middlewares/errorHandler.js");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var studentRouter = require("./routes/student");
var labRouter = require("./routes/labs");
var userRouter = require("./routes/usermodel");
var withdrawalRouter = require("./routes/students_routes");
var makeupRouter = require("./routes/makeuproute");
var courseRouter = require("./routes/courseroute");

var AuthMiddleware = require("./middlewares/securityHandler.js");

var app = express();
app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//!Minor analysis import -START
const fs = require("fs");
const { type } = require("os");
let data_file = require("./data_files/data-copy.json");
let course_file = require("./data_files/courses.json");
let course_file_with_credits = require("./data_files/courses_with_credits.json");
let course_file_for_endsem = require("./data_files/courses_for_endsem.json");
const { listenerCount } = require("process");
const excelToJson = require("convert-excel-to-json");
var fileManager = require("express-file-manager");
const multer = require("multer");
const { isImportEqualsDeclaration } = require("typescript");
const PATH = "./spreadsheets";
config();

const securityHandler = new AuthMiddleware();

//!Minor analysis import -END
let mongo = mongoose.connect(
  "mongodb+srv://jithendra:jhonny%40589@dugc.gd7mtam.mongodb.net/test"
);

if (mongo) {
  console.log("connected to mongo");
} else {
  console.log("unable to connect");
}

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  let payload1 = jwt.verify(token, "secretKey");
  if (!payload1) {
    return res.status(401).send("unauthorized request");
  }
  req.userId = payload1.subject;
  next();
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/lab", labRouter);
app.use("/users", usersRouter);
app.use("/student", studentRouter);
app.use("/auth", userRouter);
app.use("/withdrawal", withdrawalRouter);
app.use("/makeup", makeupRouter);
app.use("/course", courseRouter);

//!MINOR ANALYSIS ROUTES - START
app.use("/filemanager/", fileManager("./spreadsheets"));
const dataParticulars = ["D", "C", "B", "A", "S", "Average", "Total"];
const dataSections = ["A", "B", "C", "D", "E"];
app.set("json spaces", 2);
const dataExams = ["Minor 1", "Minor 2", "Activity"];

const getCourseName = function (code, course_file) {
  for (const { i, j } of Objects.entries(course_file)) {
    for (const { k, l } of Objects.entries(course_file[i])) {
      console.log(k);
    }
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./spreadsheets/new");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
function uploadFiles(req, res) {
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  } else if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Successfully uploaded files" });
}

app.post(
  "/upload_file",
  securityHandler.isFacultyCord,
  upload.single("filename"),
  uploadFiles
);

app.get("/filemanager/raw%5C:fileName", function (req, res) {
  const { fileName } = req.params;
  const file = `./spreadsheets/${fileName}`;
  res.download(file);
});

app.get("/filemanager/browse%5C", (req, res) => {
  console.log("On folder page.");
  res.redirect(`/`);
});

app.get("/filemanager/browse%5C:addr", (req, res) => {
  console.log("On folder page.");
  if (!req.params || !req.params.addr || req.params.addr === " ") {
    res.redirect(`/filemanager`);
    return;
  } else {
    res.redirect(`/filemanager/browse/${req.params.addr}`);
  }
});

app.post("/upload_sheets",securityHandler.isFacultyCord ,(req, res) => {
  let this_year = "2022-23";
  const { academic_year, sem_type, semester, course, exam, section, filename } =
    req.body;
  console.log("Result => ", req.body);
  let new_data = data_file;
  let read_result = {};
  let index = 0;

  if (exam == "m1") {
    index = 0;
  } else if (exam == "m2") {
    index = 1;
  } else {
    index = 2;
  }
  let f = filename.split("\\");
  let file_name = f[f.length - 1];
  console.log(file_name);
  try {
    result = excelToJson({
      sourceFile: path.join(__dirname, "spreadsheets/new", file_name),
    });
  } catch (err) {
    console.log("File not found!");
  }
  let result_keys = Object.keys(result);
  console.log(
    "*************************************************************************************"
  );
  console.log(result);
  console.log(
    "***************************************************************************************"
  );
  read_result.Average = parseFloat(result[result_keys[0]][0]["C"])
    .toFixed(2)
    .toString();
  //S grade
  read_result.S_grade = result[result_keys[0]][2]["C"];
  //A grade
  read_result.A_grade = result[result_keys[0]][3]["C"];
  //B grade
  read_result.B_grade = result[result_keys[0]][4]["C"];
  //C grade
  read_result.C_grade = result[result_keys[0]][5]["C"];
  //D grade
  read_result.D_grade = result[result_keys[0]][6]["C"];
  //Total
  read_result.total = result[result_keys[0]][7]["C"];
  console.log(read_result);
  new_data[academic_year][semester][course][index][section] = {
    Average: read_result.Average,
    S: read_result.S_grade,
    A: read_result.A_grade,
    B: read_result.B_grade,
    C: read_result.C_grade,
    D: read_result.D_grade,
    Total: read_result.total,
  };
  fs.writeFile("./data_files/data-copy.json", JSON.stringify(new_data), () => {
    console.log("Done writing!");
  });
  res.json({
    sem_type,
    academic_year,
    semester,
    course,
    exam,
    section,
    filename,
    read_result,
  });
});

const Theory = require("./models/theories.js"); // Import the User model here
const xlsx = require("xlsx");
var uploadi = multer({ storage: storage });

app.post("/uploadTheory", async (req, res) => {
  const { sem, filename } = req.body;
  console.log("Result => ", req.body);

  if (!filename) {
    console.log("Filename is not provided in the request.");
    return res
      .status(400)
      .json({ error: "Filename is required in the request body." });
  }
  let f = filename.split("\\");
  let file_name = f[f.length - 1];

  let result1 = {};
  try {
    result1 = excelToJson({
      sourceFile: path.join(__dirname, "spreadsheets/new", file_name),
    });
    console.log(result1);
  } catch (err) {
    console.log("File not found!");
    return res.status(400).json({ error: "File not found." });
  }

  let resultSheet1 = result1.Sheet1;
  // Filter out entries where Sl_no is null
  resultSheet1 = resultSheet1.filter((data) => isValidNumber(data.A));

  // Map the data to the desired format for MongoDB insertion
  let userData = resultSheet1.map((data) => ({
    Sl_no: parseInt(data.A),
    USN: data.B,
    Name: data.C,
    Sem: isValidNumber(data.D) ? parseInt(data.D) : null,
    div: data.E,
    CourseId: data.F,
    CourseName: data.G,
    CIE: isValidNumber(data.H) ? parseInt(data.H) : null,
    Attendance: isValidNumber(data.I) ? parseInt(data.I) : null,
  }));

  try {
    // Insert the transformed data into MongoDB
    const result2 = await Theory.create(userData);
    console.log("Data inserted into MongoDB!", result2);

    // You can also write the data to a JSON file if needed
    fs.writeFile(
      "./data_files/ineligible.json",
      JSON.stringify(userData),
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Done writing JSON file!");
        }
      }
    );

    res.json({
      sem,
      filename: file_name,
    });
  } catch (err) {
    console.error("Error inserting data into MongoDB:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function isValidNumber(value) {
  return !isNaN(value) && value !== null && value !== undefined;
}

// Endpoint to retrieve data based on semester
app.get("/getTheoryBySem/:sem", async (req, res) => {
  console.log("HIIII in app");
  try {
    const sem = parseInt(req.params.sem);

    if (isNaN(sem)) {
      return res
        .status(400)
        .json({ error: "Invalid semester value provided." });
    }

    // Query MongoDB to find data based on the provided semester
    const theoryData = await Theory.find({ Sem: sem });
    console.log(theoryData);
    res.json(theoryData);
  } catch (err) {
    console.error("Error retrieving data from MongoDB:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/upload_multiple_sheets",securityHandler.isFacultyCord, (req, res) => {
  let this_year = "2022-23";
  const { academic_year, sem_type, semester, course, exam, filename } =
    req.body;
  console.log("Result => ", req.body);
  let new_data = data_file;
  let read_result_array = [];
  var read_result = {};
  let index = 0;
  read_result_array = [];
  if (exam == "m1") {
    index = 0;
  } else if (exam == "m2") {
    index = 1;
  } else {
    index = 2;
  }
  let f = filename.split("\\");
  let file_name = f[f.length - 1];
  console.log(file_name);
  try {
    result = excelToJson({
      sourceFile: "./spreadsheets/" + file_name,
    });
  } catch (err) {
    console.log("found!");
    // res.render("coordinator")
  }
  let sheets_all = [];
  let sections_all = ["A", "B", "C", "D", "E"];
  for (const [i, j] of Object.entries(result)) {
    sheets_all.push(i);
  }
  if (sheets_all.length != 5) {
    console.log("ERROR! only reading the first 5 pages");
  }
  for (let k = 0; k < sheets_all.length; k++) {
    read_result.Average = parseFloat(result[sheets_all[k]][0]["C"])
      .toFixed(2)
      .toString();
    //S grade
    read_result.S_grade = result[sheets_all[k]][2]["C"];
    //A grade
    read_result.A_grade = result[sheets_all[k]][3]["C"];
    //B grade
    read_result.B_grade = result[sheets_all[k]][4]["C"];
    //C grade
    read_result.C_grade = result[sheets_all[k]][5]["C"];
    //D grade
    read_result.D_grade = result[sheets_all[k]][6]["C"];
    //Total
    read_result.total = result[sheets_all[k]][7]["C"];
    console.log(read_result);
    let clone = { ...read_result };
    read_result_array.push(clone);
    new_data[academic_year][semester][course][index][sections_all[k]] = {
      Average: read_result.Average,
      S: read_result.S_grade,
      A: read_result.A_grade,
      B: read_result.B_grade,
      C: read_result.C_grade,
      D: read_result.D_grade,
      Total: read_result.total,
    };
  }
  console.log(read_result_array);
  fs.writeFile("./data_files/data-copy.json", JSON.stringify(new_data), () => {
    console.log("Done writing!");
  });
  // console.log(result);
  //Average
  // console.log(result);
  console.log("On multiple upload page.");
  res.json({
    sem_type,
    academic_year,
    semester,
    course,
    exam,
    filename,
    read_result_array,
    sections_all,
  });
});

app.get("/dugc_chairman",securityHandler.isDugcChairman ,(req, res) => {
  console.log("On DUGC chairman page.");
  res.json({ data_file });
});

app.get("/create_course",securityHandler.isDugcChairman , (req, res) => {
  let { semester, course_code, course_name, cred1, cred2, cred3 } = req.query;

  let new_data = data_file;

  let sem_numbers = { three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8 };
  let sem_names = {
    three: "sem3",
    four: "sem4",
    five: "sem5",
    six: "sem6",
    seven: "sem7",
    eight: "sem8",
  };

  let new_course_data = course_file;
  let new_course_data_with_credits = course_file_with_credits;
  let new_course_data_for_endsem = course_file_for_endsem;

  let course_code_new = course_code.toUpperCase();
  let credit1 = parseFloat(cred1);
  let credit2 = parseFloat(cred2);
  let credit3 = parseFloat(cred3);
  let totalCredits = String(credit1 + credit2 + credit3);
  let creditFormat =
    String(credit1) + "-" + String(credit2) + "-" + String(credit3);

  console.log(course_code);
  for (const [i, j] of Object.entries(new_data)) {
    try {
      j[semester][course_code_new] = [{}, {}, {}];
    } catch (err) {
      j[semester] = {};
      j[semester][course_code_new] = [{}, {}, {}];
    }
  }

  if (new_course_data[semester]) {
    new_course_data[semester][course_code] = {
      Name: course_name,
      "Minor 1": "Yes",
      "Minor 2": "Yes",
      Activity: "Yes",
    };
  } else {
    new_course_data[semester] = {
      course_code: {
        Name: course_name,
        "Minor 1": "Yes",
        "Minor 2": "Yes",
        Activity: "Yes",
      },
    };
  }
  let inserting_course = {
    id: 0,
    name: course_name,
    code: course_code,
    credits: totalCredits,
    credit: creditFormat,
  };
  let inserting_course_for_endsem = {
    code: course_name,
    name: course_code,
  };
  new_course_data_with_credits[sem_numbers[semester] - 3]["courses"].push(
    inserting_course
  );

  new_course_data_for_endsem[sem_names[semester]].push(
    inserting_course_for_endsem
  );

  fs.writeFile("./data_files/data-copy.json", JSON.stringify(new_data), () => {
    console.log("Done writing!");
  });
  fs.writeFile(
    "./data_files/courses.json",
    JSON.stringify(new_course_data),
    () => {
      console.log("Done writing course file!");
    }
  );
  fs.writeFile(
    "./data_files/courses_with_credits.json",
    JSON.stringify(new_course_data_with_credits),
    () => {
      console.log("Done writing credits course file!");
    }
  );
  fs.writeFile(
    "./data_files/courses_for_endsem.json",
    JSON.stringify(new_course_data_for_endsem),
    () => {
      console.log("Done writing endsem course file!");
    }
  );
  res.json({ course_code, course_name, semester });
});

app.get("/coordinator",securityHandler.isDugcChairman , (req, res) => {
  console.log("On Coordinator page.");
  res.json({ data_file, course_file });
});
let dataCourses = [];
let dataCoursesName = [];

const getScore = function (
  courseInput,
  examInput,
  sectionInput,
  particularInput,
  given_year,
  semester
) {
  const new_data = data_file;
  // console.log("Year =", given_year);
  if (new_data == {}) {
    return "";
  }
  try {
    let c = dataCourses[courseInput];
    let s = dataSections[sectionInput];
    let i = dataParticulars[particularInput];
    let answer = new_data[given_year][semester][c][examInput][s][i];
    return answer;
  } catch (err) {
    return "";
  }
};

const getTotalScore = function (
  examInput,
  sectionInput,
  particularInput,
  given_year,
  semester
) {
  let score = 0;
  const new_data = data_file;
  if (new_data == {}) {
    return "";
  }
  let c, s, i, l, answer;
  for (let k = 0; k < dataCourses.length; k++) {
    s = dataSections[sectionInput];
    i = dataParticulars[particularInput];
    l = dataCourses[k];
    try {
      answer = new_data[given_year][semester][l][examInput][s][i];
    } catch (err) {
      answer = 0;
    }
    score += answer;
  }
  return score;
};
app.get("/delete_sheet", (req, res) => {
  let this_year = "2022-23";
  let exam_index = 0;
  let { academic_year, semester, course, exam, section } = req.query;

  let new_data = data_file;
  if (exam == "m1") {
    exam_index = 0;
  } else if (exam == "m2") {
    exam_index = 1;
  } else {
    exam_index = 2;
  }

  delete new_data[this_year][semester][course][exam_index][section];

  fs.writeFile("./data_files/data-copy.json", JSON.stringify(new_data), () => {
    console.log("Done writing!");
    res.json({ new_data });
  });
});
app.get("/dugc", (req, res) => {
  let this_year = "2022-23";
  let exam_index = 0;
  let { sem_type, semester, exam } = req.query;
  let new_data = data_file;
  dataCourses = [];
  console.log(dataCourses);
  console.log("On DUGC page.");
  for (const [i, j] of Object.entries(new_data[this_year])) {
    for (const [k, l] of Object.entries(j)) {
      if (semester == i) {
        dataCourses.push(k);
      }
    }
  }
  if (exam == "m1") {
    exam_index = 0;
  } else if (exam == "m2") {
    exam_index = 1;
  } else if (exam == "Activity") {
    exam_index = 2;
  }
  console.log("22ECSC301", course_file);
  console.log("Index, ", exam_index);
  res.json({
    new_data,
    dataParticulars,
    dataCourses,
    dataSections,
    dataExams,
    this_year,
    semester,
    exam_index,
    course_file,
  });
});

app.get("/analysis", (req, res) => {
  let new_data = data_file;
  console.log("On DUGC page.");
  res.json({
    new_data,
    dataParticulars,
    dataCourses,
    dataSections,
    dataExams,
    course_file,
    getScore,
  });
});

app.get("/", (req, res) => {
  console.log("On home-page.");
  res.render("home");
});

app.get("/single_sheet", (req, res) => {
  let new_data = data_file;
  console.log("On single sheet page.");
  res.json({ course_file });
});
app.get("/get_courses", (req, res) => {
  let new_data = data_file;
  console.log("On get course page");
  console.log(course_file);
  res.json({ course_file });
});

app.get("/multiple_sheet", (req, res) => {
  let new_data = data_file;
  console.log("On multiple sheet page.");
  res.json({ course_file });
});
//!MINOR ANALYSIS ROUTES - END
app.use(errorMiddleware);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
