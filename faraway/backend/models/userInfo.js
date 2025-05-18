const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    patientId: String,
    fullName: String,
    dateOfBirth: Date,
    gender: String,
    contactNumber: String,
    email: String,
    address: String,
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    }
  });

const patient = mongoose.model('patientInfo', patientSchema);

const getPatient = async () => {
    try{
        const info = await patient.find();
        return info;

    }catch(err){
        console.log("Unable to get the patient info:", err)
    }
}

module.exports = {
    patient,
    getPatient
  };