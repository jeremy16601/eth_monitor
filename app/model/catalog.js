'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const catalogSchema = new Schema({
    title:{type:String},
    price: { type: Number },
    content: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }, 
  } );



  return mongoose.model('catalog', catalogSchema);
};
