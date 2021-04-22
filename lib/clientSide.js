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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAnswers = exports.recoveryKeypair = exports.sanitizeAnswers = void 0;
var REGULAR_EXPRESSION = /\W/gi;
var EMPTY_STRING = "";
var DEFAULT_USER = "user";
var zenroom_1 = require("./zenroom");
/*
  This function is using zenroom to encrypt a given string with the password
*/
function sanitizeAnswers(answers) {
    for (var key in answers) {
        if (answers[key]) {
            answers[key] = answers[key]
                .replace(REGULAR_EXPRESSION, EMPTY_STRING)
                .toLowerCase();
        }
    }
    return answers;
}
exports.sanitizeAnswers = sanitizeAnswers;
function recoveryKeypair(clientSideContractText, answers, PBKDF) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, data, response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    keys = {
                        userChallenges: answers,
                        username: DEFAULT_USER,
                        key_derivation: PBKDF,
                    };
                    data = {};
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, zenroom_1.default.execute(clientSideContractText, JSON.stringify(keys), JSON.stringify(data))];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, JSON.parse(response)];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.recoveryKeypair = recoveryKeypair;
function verifyAnswers(clientSideContractText, answers, PBKDF, userPublicKey) {
    return __awaiter(this, void 0, void 0, function () {
        var execution;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, recoveryKeypair(clientSideContractText, answers, PBKDF)];
                case 1:
                    execution = _a.sent();
                    return [2 /*return*/, userPublicKey === execution[DEFAULT_USER].keypair.public_key];
            }
        });
    });
}
exports.verifyAnswers = verifyAnswers;
