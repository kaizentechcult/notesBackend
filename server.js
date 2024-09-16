"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var registerRoute_js_1 = require("./routes/registerRoute.js");
var app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect("mongodb://localhost:27017/your_db_name");
app.use("/api/auth", registerRoute_js_1.default);
app.listen(5000, function () {
    console.log("Server is running on port 5000");
});
