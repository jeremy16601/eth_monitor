'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const TokenSchema  = new Schema({
    access_token: String,
    expires_in: Number,
    refresh_token: String,
    openid: String,
    scope: String,
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
  } );



  return mongoose.model('token', TokenSchema );
};
