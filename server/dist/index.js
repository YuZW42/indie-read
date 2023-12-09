"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const prismaclient_1 = __importDefault(require("./pages/shared/prismaclient"));
const resources_1 = __importDefault(require("./pages/resource/resources"));
const searchquery_1 = __importDefault(require("./pages/search/searchquery"));
const google_1 = __importDefault(require("./pages/login/google"));
const save_fav_1 = __importDefault(require("./pages/save_fav/save_fav"));
const display_fav_1 = __importDefault(require("./pages/save_fav/display_fav"));
const app = (0, express_1.default)();
const port = 5002;
app.use((0, cookie_session_1.default)({
    name: 'session',
    keys: ['indie-book'],
    maxAge: 24 * 60 * 60 * 100
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
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
app.get('/save_fav', async (req, res) => {
    const { id, bookId } = req.query;
    console.log(id, bookId);
    try {
        const result = await (0, save_fav_1.default)(String(id), Number(bookId));
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/get_fav', async (req, res) => {
    const preference = req.query;
    try {
        const result = await (0, display_fav_1.default)(preference);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add this route to retrieve user data by ID
app.get('/user', async (req, res) => {
    try {
        const userEmail = req.query.list; // Extract the email from the query params
        if (!userEmail) {
            return res.status(400).json({ message: 'Email parameter is missing' });
        }
        // Retrieve the user data based on the user's email
        const user = await prismaclient_1.default.user.findFirst({
            where: { email: userEmail },
            // Include additional fields if needed
            include: { /* additional fields */}
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.error('Error retrieving user:', error);
        return res.status(500).json({ message: 'Error retrieving user data' });
    }
});
app.get('/api/healthchecker', (_, res) => {
    res.status(200).json({
        status: 'success',
        message: 'server running'
    });
});
app.use('/auth', google_1.default);
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=index.js.map