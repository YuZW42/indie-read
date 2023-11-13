"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resources_1 = __importDefault(require("./pages/resource/resources"));
const searchquery_1 = __importDefault(require("./pages/search/searchquery"));
const cors = require('cors');
const app = (0, express_1.default)();
const port = 5002;
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello');
});
app.get('/resources_data', (req, res) => {
    res.json(resources_1.default);
});
app.get('/search_keyword', async (req, res) => {
    const keyword = req.query.keyword;
    try {
        const books = await (0, searchquery_1.default)(keyword);
        console.log(books);
        res.json(books);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books' });
    }
});
app.get('/api/healthchecker', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'server running',
    });
});
app.listen(port, () => console.log(`server running on port ${port}`));
//# sourceMappingURL=index.js.map