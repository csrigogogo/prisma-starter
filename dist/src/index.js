"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var prisma = new client_1.PrismaClient();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.post("/signup", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, _b, posts, k, postData, result;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, _b = _a.posts, posts = _b === void 0 ? [] : _b, k = _a.k;
                postData = posts === null || posts === void 0 ? void 0 : posts.map(function (post) {
                    return { title: post === null || post === void 0 ? void 0 : post.title, content: post === null || post === void 0 ? void 0 : post.content };
                });
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            name: name,
                            email: email,
                            posts: {
                                create: postData
                            }
                        }
                    })];
            case 1:
                result = _c.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.post("/post", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, authorEmail, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content, authorEmail = _a.authorEmail;
                return [4 /*yield*/, prisma.post.create({
                        data: {
                            title: title,
                            content: content,
                            author: { connect: { email: authorEmail } }
                        }
                    })];
            case 1:
                result = _b.sent();
                res.json(result);
                return [2 /*return*/];
        }
    });
}); });
app.put('/post/:id/views', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma.post.update({
                        where: { id: Number(id) },
                        data: {
                            viewCount: {
                                increment: 1
                            }
                        }
                    })];
            case 2:
                post = _a.sent();
                res.json(post);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.json({ error: "Post with ID ".concat(id, " does not exist in the database") });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
app.put('/publish/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, postData, updatedPost, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: Number(id) },
                        select: {
                            published: true
                        }
                    })];
            case 2:
                postData = _a.sent();
                return [4 /*yield*/, prisma.post.update({
                        where: { id: Number(id) || undefined },
                        data: { published: !(postData === null || postData === void 0 ? void 0 : postData.published) }
                    })];
            case 3:
                updatedPost = _a.sent();
                res.json(updatedPost);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _a.sent();
                res.json({ error: "Post with ID ".concat(id, " does not exist in the database") });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app["delete"]("/post/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.post["delete"]({
                        where: {
                            id: Number(id)
                        }
                    })];
            case 1:
                post = _a.sent();
                res.json(post);
                return [2 /*return*/];
        }
    });
}); });
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.user.findMany()];
            case 1:
                users = _a.sent();
                res.json(users);
                return [2 /*return*/];
        }
    });
}); });
app.get('/user/:id/drafts', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, drafts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.user
                        .findUnique({
                        where: {
                            id: Number(id)
                        }
                    })
                        .posts({
                        where: { published: false }
                    })];
            case 1:
                drafts = _a.sent();
                res.json(drafts);
                return [2 /*return*/];
        }
    });
}); });
app.get("/post/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.post.findUnique({
                        where: { id: Number(id) }
                    })];
            case 1:
                post = _a.sent();
                res.json(post);
                return [2 /*return*/];
        }
    });
}); });
app.get('/feed', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, searchString, skip, take, orderBy, or, posts;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.query, searchString = _a.searchString, skip = _a.skip, take = _a.take, orderBy = _a.orderBy;
                or = searchString
                    ? {
                        OR: [
                            { title: { contains: searchString } },
                            { content: { contains: searchString } },
                        ]
                    }
                    : {};
                return [4 /*yield*/, prisma.post.findMany({
                        where: __assign({ published: true }, or),
                        include: { author: true },
                        take: Number(take) || undefined,
                        skip: Number(skip) || undefined,
                        orderBy: {
                            updatedAt: orderBy
                        }
                    })];
            case 1:
                posts = _b.sent();
                res.json(posts);
                return [2 /*return*/];
        }
    });
}); });
var server = app.listen(3000, function () {
    return console.log("\n\uD83D\uDE80 Server ready at: http://localhost:3000\n\u2B50\uFE0F See sample requests: http://pris.ly/e/ts/rest-express#3-using-the-rest-api");
});
//# sourceMappingURL=index.js.map