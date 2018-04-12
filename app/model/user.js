'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const ObjectId = Schema.ObjectId;

  const userSchema = new Schema({
    openid:{type:String},
    nickname: { type: String },
    sex: { type: String },
    city:{type:String},
    country:{type:String},
    province:{type:String},
    headimgurl:{type:String},
    remark:{type:String},
    groupid:{type:String}, 
    vip:{type:Array },//订阅的项目
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }, 
  } );



  return mongoose.model('user', userSchema);
};
