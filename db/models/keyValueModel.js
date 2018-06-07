const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeyValueSchema = new Schema(
  {
    key: { type: String, unique: true},
    type: { type: String},
    value: { type: String },
    buffer: { type: Buffer}
  }
)

module.exports = mongoose.model('keyValues', KeyValueSchema);
