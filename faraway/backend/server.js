const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken')
const passport = require('passport')
const axios = require('axios')


const {
    Strategy: GoogleStrategy
} = require('passport-google-oauth20');

//Database
const mongoose = require('mongoose')

const uri = "mongodb+srv://pnestrella:eEl6PcilbFMRXZKF@cluster0.axyt3tr.mongodb.net/medicalRecords?retryWrites=true&w=majority&appName=Cluster0";

const mrDB = mongoose.createConnection(
    "mongodb+srv://pnestrella:eEl6PcilbFMRXZKF@cluster0.axyt3tr.mongodb.net/medicalRecords?retryWrites=true&w=majority&appName=Cluster0", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

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

const Patient = mrDB.model('Patient', patientSchema, 'patientInfo');

const getPatient = async () => {
    try {
        await mrDB.asPromise();;;
        const patient = await Patient.find();;
        return patient
    } catch (err) {
        console.log(err);
    }
}

getPatient()



const port = process.env.PORT || 7000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: false,
}));


//Use method
app.use(cors());


passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `https://hppbackend.onrender.com/login/callback`
    },
    function (accessToken, refreshToken, profile, cb) {
        const user = {
            id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
        }

        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {})

        return cb(null, {
            user,
            token
        });
    }
));

//get Methods
app.get('/verify', (req, res) => {
    console.log("called");
    const authHeader = req.headers['authorization']


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            valid: false,
            message: 'No token provided'
        });
    }

    const token = authHeader.split(' ')[1];


    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                valid: false,
                message: 'Invalid token'
            });
        }



        return res.json({
            valid: true,
            user: decoded
        })
    })
})

app.get('/login/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'consent',
    accessType: 'offline'
}));

app.get('/login/callback', passport.authenticate('google', {
        session: false,
        failureRedirect: '/'
    }),
    (req, res) => {
        const {
            token,
            user
        } = req.user;
        res.redirect(`https://hpp-745s.onrender.com/login?token=${token}`);
    }
)


app.get('/prescription', async (req, res) => {
    const {
        email
    } = req.query;
    try {
        const data = await axios.get('https://docsys-app-server.onrender.com/api/prescriptions')
        const filteredData = data.data.data.filter(d => d.email === email);
        res.json({
            message: 'Successfully retrieved the data',
            data: filteredData,
            code: 'success'
        })
        return;
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Error fetching prescription',
            err: err,
            code: 'error'
        })
        return;
    }
})

app.get('/patientData', async (req, res) => {
    const {
        email
    } = req.query;
    let payload = [{}]


    try {
        const getPRMS = async () => {

            const data = await axios.get('https://prms-test.onrender.com/api/patients');
            const docSys = await axios.get('https://docsys-app-server.onrender.com/api/prescriptions');

            const dsFiltered = docSys.data.data.filter(ds => ds.email === email);

            const patientMap = new Map();

            dsFiltered.forEach(ds => {
                if (!patientMap.has(ds.patientId)) {
                    patientMap.set(ds.patientId, ds.dateOfPrescription);
                }
            });

            // Convert Map to array of objects
            const patientInfo = Array.from(patientMap, ([patientId, dateOfPrescription]) => ({
                patientId,
                dateOfPrescription
            }));

            const match = patientInfo.find(p => p.patientId === p)



            const filteredEmail = data.data.filter(d => d.email === email)

            const filteredData = filteredEmail.map(({
                patientId,
                condition,
                dateAdmitted
            }) => {
                const match = patientInfo.find(info => info.patientId === patientId);

                return {
                    patientId,
                    condition,
                    dateAdmitted,
                    status: match ? 'Completed' : 'Pending',
                    prescriptionDate: match ? match.dateOfPrescription : null
                };
            });


            payload = filteredData


            res.json({message:"Successfully retrieved data", data:payload, code:'success'})
        }

        getPRMS()
    } catch (err) {
        console.log("Error fetching data", err);
        res.json({
            message: err,
            err: err,
            code: 'error'
        })
    }


})

app.get('/profile', (req,res) => {
    const {email} = req.query;

    console.log('called✅');
    try{
        const getPRMS = async () => {
            const data = await axios('https://prms-test.onrender.com/api/patients');
            let patient = data.data.filter(p => p.email === email)
            patient = patient[0];
            patient = {
                age: patient.age,
                gender: patient.gender,
                address: patient.address,
                dateOfBirth: patient.dob
            }  
            
            console.log(patient);
            res.json({message:'success', data: patient, code:'success'})
        }


        getPRMS();


    }catch(err){
        res.json({message:'error fetching profile', err: err, code:'error'})
    }
})



//listen methods
app.listen(port, () => {
    console.log(`Listening to port: ${port}`);
})
