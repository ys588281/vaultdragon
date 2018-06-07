const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema(
  {
    key: { type: String },
    type: { type: String},
    value: { type: String },
    buffer: { type: Buffer},
    time: { type: Date }
  }
)

module.exports = mongoose.model('Historys', HistorySchema);
