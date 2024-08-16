const express = require("express");
var mustacheExpress = require("mustache-express");
const child_process = require("child_process");

const app = express();
const port = 3213;

const ips = [];

// set public dir
app.use(express.static("public"));

// set the view engine
app.engine("html", mustacheExpress());
app.set("view engine", "html");
app.set("views", __dirname + "/views");

function shutdown() {
  const command = "shutdown /s /t 0"; // Replace with your operating system's shutdown command

  child_process.exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("Error shutting down:", error);
    } else {
      console.log("Shutdown initiated.");
    }
  });
}
app.get("/", (req, res) => {
  let add = true;
  ips.forEach((item) => {
    if (item == req.ip) {
      add = false;
    }
  });
  console.log(add);
  if (add) {
    ips.push(req.ip);
  }
  console.log(ips);
  res.render("index", { title: "Home", ip: req.ip.slice(7) });
});

app.get("/mini-games", (req, res) => {
  res.render("mini-games", { title: "Mini Games", ip: req.ip.slice(7) });
});

app.get("/players", (req, res) => {
  res.render("players", { title: "Players", ip: req.ip.slice(7), ips: ips });
});

app.get("/shutdown", (req, res) => {
  shutdown();
});

app.listen(port, () => console.log(`****--live on ${port}!!!--*****`));
