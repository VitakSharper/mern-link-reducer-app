const mongoose = require('mongoose');
const config = require('config');

const app = require('./app');
const PORT = config.get('port') || 5000;

(async () => {
    try {
        await mongoose.connect(config.get('dbUrl'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
        console.log('Successful connected to DB (❁´◡`❁)');
        app.listen(PORT, () => console.log(`App running on port ${PORT}, (❁´◡\`❁)`));
    } catch (e) {
        console.log('Error connect to DB ༼ つ ◕_◕ ༽つ', e);
        process.exit(1);
    }
})();
