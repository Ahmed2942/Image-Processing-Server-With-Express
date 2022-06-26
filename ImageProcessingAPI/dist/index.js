"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var app = (0, express_1.default)();
var port = 3000;
var imgNames = ['image1', 'image2', 'image3', 'image4', 'image5'];
// create array for caching
var records = [];
app.listen(port, function () {
    /* eslint-disable */
    console.log("Server is starting at port ".concat(port));
});
app.get('/', function (req, res) {
    res.send('Hello there!');
});
app.get('/image', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var imgName, imgPath, width, height, widthNum, heightNum, i, resizedImgPath_1, resizedImgPath_2, resizedImgPath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                imgName = req.query.filename;
                imgPath = path_1.default.resolve("./images/".concat(imgName, ".jpg"));
                width = req.query.width;
                height = req.query.height;
                widthNum = parseInt(width);
                heightNum = parseInt(height);
                // if image name parameter was not provided
                if (imgName == undefined) {
                    return [2 /*return*/, res
                            .status(400)
                            .send('Bad request, Please enter "filename" parameter!')];
                }
                if (imgName == '') {
                    return [2 /*return*/, res
                            .status(400)
                            .send('Bad request, Please enter a valid image name!')];
                }
                // if image was not found on server
                if (imgNames.includes(imgName) == false) {
                    return [2 /*return*/, res.status(404).send('Image not found')];
                }
                // if image name was provided but width and height parameter was not provided
                if (width == undefined && height == undefined) {
                    return [2 /*return*/, res.status(200).sendFile(imgPath)];
                }
                // if image is cached
                for (i = 0; i < records.length; i++) {
                    if (records[i].addr == req.url) {
                        return [2 /*return*/, res.status(304).sendFile(records[i].pth)];
                    }
                }
                if (!(width == undefined)) return [3 /*break*/, 2];
                resizedImgPath_1 = path_1.default.resolve("./output/".concat(imgName, "-").concat(width, "-").concat(height, ".jpg"));
                return [4 /*yield*/, (0, sharp_1.default)(imgPath)
                        .resize({
                        height: heightNum,
                    })
                        .toFile(resizedImgPath_1)];
            case 1:
                _a.sent();
                records.push({
                    addr: req.url,
                    pth: resizedImgPath_1,
                });
                return [2 /*return*/, res.sendFile(resizedImgPath_1)];
            case 2:
                if (!(height == undefined)) return [3 /*break*/, 4];
                resizedImgPath_2 = path_1.default.resolve("./output/".concat(imgName, "-").concat(width, "-").concat(height, ".jpg"));
                return [4 /*yield*/, (0, sharp_1.default)(imgPath)
                        .resize({
                        width: widthNum,
                    })
                        .toFile(resizedImgPath_2)];
            case 3:
                _a.sent();
                records.push({
                    addr: req.url,
                    pth: resizedImgPath_2,
                });
                return [2 /*return*/, res.sendFile(resizedImgPath_2)];
            case 4:
                // if width was not entered properly
                if (width == '' || isNaN(widthNum)) {
                    return [2 /*return*/, res.status(400).send('Bad request, Please enter a valid width!')];
                }
                // if height was not entered properly
                if (height == '' || isNaN(heightNum)) {
                    return [2 /*return*/, res.status(400).send('Bad request, Please enter a valid height!')];
                }
                resizedImgPath = path_1.default.resolve("./output/".concat(imgName, "-").concat(width, "-").concat(height, ".jpg"));
                return [4 /*yield*/, (0, sharp_1.default)(imgPath)
                        .resize({ width: widthNum, height: heightNum })
                        .toFile("./output/".concat(imgName, ".jpg"))];
            case 5:
                _a.sent();
                records.push({
                    addr: req.url,
                    pth: resizedImgPath,
                });
                return [2 /*return*/, res.status(200).sendFile(resizedImgPath)];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(500).send('server error')];
            case 7: return [2 /*return*/];
        }
    });
}); });
exports.default = app;
