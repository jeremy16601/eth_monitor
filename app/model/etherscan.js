'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const etherscanSchema = new Schema({
    eth_id:{type:ObjectId},
    TxHash: { type: String },
    Block: { type: String },
    Age: { type: String },
    From: { type: String },
    IN_Out: { type: String },
    To: { type: String },
    Value: { type: String },
    TxFee: { type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }, 
  } );



  return mongoose.model('etherscan', etherscanSchema);
};
