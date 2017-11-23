import mongoose = require('mongoose');

export function connectDatabase(uri) {
    return new Promise((resolve, reject) => {
        mongoose.connection
            .on('error', error => reject(error))
            .on('close', () => console.log('Database connection closed'))
            .once('open', () => resolve(mongoose.connection[0]));
        mongoose.connect(uri, { useMongoClient: true })
    })
}