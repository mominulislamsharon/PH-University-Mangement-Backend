"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const notFound_1 = __importDefault(require("./app/middleware/notFound"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// application routes
// app.use('/api/v1', StudentRoutes);
app.use('/api/v1', routes_1.default);
const test = (req, res) => {
    const a = 10;
    res.send(a);
};
app.get('/', test);
app.use(globalErrorHandler_1.default);
// not found 
app.use(notFound_1.default);
exports.default = app;
