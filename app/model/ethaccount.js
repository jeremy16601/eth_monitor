'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const ethaccountSchema = new Schema({
    eth:{type:String},
    eth_balance: { type: String },
    token_balance: { type: String },
    transactions:{type:String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }, 
  } );



  return mongoose.model('eth_account', ethaccountSchema);
};
