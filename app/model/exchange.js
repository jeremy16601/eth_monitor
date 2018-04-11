'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const exchangeSchema = new Schema({
    title: { type: String },
    content: { type: String },
    count:{type:Number},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }, 
  } );



  return mongoose.model('exchange', exchangeSchema);
};
