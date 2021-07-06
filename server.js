const express = require('express');
const app = express();


app.use(express.static("./dist/kefi-angular-front"));
app.get("/*", function(req, res) {
  res.sendFile("index.html", {root: "./dist/kefi-angular-front"}
);
});

app.listen(process.env.PORT || 4200);
