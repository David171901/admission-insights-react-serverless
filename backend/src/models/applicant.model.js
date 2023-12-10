const { model, Schema } = require("mongoose");

const applicantSchema = new Schema({
  correo: { type: String },
  dominio: { type: String },
  fecha: { type: Date }
});

module.exports = model("applicant", applicantSchema, "postulantes");