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
var supertest_1 = __importDefault(require("supertest"));
var index_1 = __importDefault(require("../index"));
var path_1 = __importDefault(require("path"));
var cacheFuncs_1 = require("../utils/cacheFuncs");
var imgData_1 = require("../utils/imgData");
var fs_1 = require("fs");
var imgFuncs_1 = require("../utils/imgFuncs");
var request = (0, supertest_1.default)(index_1.default);
describe('Testing responses by', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('checking our endpoint', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toEqual(200);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if image parameteres and their values were entered right', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=&width=')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toEqual(400);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if image is on server', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image6')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toEqual(404);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if caching is working', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response1, response2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image3&width=100')];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, request.get('/image?filename=image3&width=100')];
                    case 2:
                        response2 = _a.sent();
                        expect(response2.status).toEqual(304);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if image was processed successfully on server', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image3')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).not.toEqual(500);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
describe('Testing if image processing was done by', function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        it('checking if the resized image is created on server', function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestedAddress, imgName, imgPath, width, height, cachedIdx, _a, _b, cached, cachedPath, resizedImgPath, resizedImgPath;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        requestedAddress = '/image?filename=image3&width=300&height=300';
                        imgName = 'image3';
                        imgPath = path_1.default.resolve("./images/".concat(imgName, ".jpg"));
                        width = 300;
                        height = 300;
                        _a = cacheFuncs_1.searchCached;
                        _b = [requestedAddress];
                        return [4 /*yield*/, imgData_1.records];
                    case 1:
                        cachedIdx = _a.apply(void 0, _b.concat([_c.sent()]));
                        return [4 /*yield*/, imgData_1.records];
                    case 2:
                        cached = (_c.sent())[cachedIdx];
                        if (!cached) return [3 /*break*/, 4];
                        console.log('there');
                        cachedPath = cached.pth;
                        // delete cached
                        (0, fs_1.unlinkSync)(cachedPath);
                        (0, cacheFuncs_1.dropCached)(cachedIdx);
                        return [4 /*yield*/, (0, imgFuncs_1.resizeImg)(imgName, imgPath, width, height)];
                    case 3:
                        resizedImgPath = _c.sent();
                        (0, cacheFuncs_1.cacheImg)(requestedAddress, resizedImgPath);
                        expect((0, fs_1.existsSync)(resizedImgPath)).toBe(true);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, (0, imgFuncs_1.resizeImg)(imgName, imgPath, width, height)];
                    case 5:
                        resizedImgPath = _c.sent();
                        (0, cacheFuncs_1.cacheImg)(requestedAddress, resizedImgPath);
                        expect((0, fs_1.existsSync)(resizedImgPath)).toBe(true);
                        _c.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
        it('checking if server returns 200 when we provide only width', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image2&width=300')];
                    case 1:
                        response = _a.sent();
                        expect(response.status == 200 || response.status == 304).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if server returns 200 when we provide only height', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image2&height=300')];
                    case 1:
                        response = _a.sent();
                        expect(response.status == 200 || response.status == 304).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        it('checking if server returns 200 when we provide width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, request.get('/image?filename=image2&width=300&height=300')];
                    case 1:
                        response = _a.sent();
                        expect(response.status == 200 || response.status == 304).toBe(true);
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
