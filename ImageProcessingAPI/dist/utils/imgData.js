"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.records = exports.imgNames = void 0;
var cacheFuncs_1 = require("./cacheFuncs");
var imgNames = ['image1', 'image2', 'image3', 'image4', 'image5'];
exports.imgNames = imgNames;
// create array for caching
// const records: Record[];
var records = (0, cacheFuncs_1.readCache)().then(function (records) {
    return records;
});
exports.records = records;
