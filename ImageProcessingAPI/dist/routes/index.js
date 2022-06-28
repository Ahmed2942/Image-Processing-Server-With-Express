"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_1 = __importDefault(require("./api/image"));
var routes = (0, express_1.Router)();
routes.get('/', function (req, res) {
    res.send('Hello there!');
});
routes.use('/image', image_1.default);
exports.default = routes;
