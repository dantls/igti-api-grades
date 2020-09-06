import mongoose from 'mongoose';

import gradeSchema from './gradeModel.js';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.grade = gradeSchema(mongoose);

export { db };
