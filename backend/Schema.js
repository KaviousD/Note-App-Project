const mongoose = require('mongoose');
const { Schema } = mongoose;

const Note = mongoose.model("Note", new Schema({ title: String , id: Number , category: String , description: String , date: Date , completed: Boolean , }));

module.exports = Note ;

