const mongoose = require('mongoose');
Schema = mongoose.Schema;
// autoIncrement = require('mongoose-auto-increment');//Attributes of the Course object
var memoSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
taskName: {
type: String,
required: 'This field is required!'
},
expiry: {
type: Date
},
memoId:{
    type: String
    },
status: {
    type: String
    },
},

{ timestamps: { createdAt: 'created_at',updatedAt: 'updated_at' } }
);

mongoose.model('Memo', memoSchema);