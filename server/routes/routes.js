const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-mail',  (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_USER || 'balancedyte@gmail.com',
          pass: process.env.AUTH_PASS || 'njnoqtfudopcxwrj'
        }
      });
      
      const mailOptions = {
        from: process.env.AUTH_USER,
        to: process.env.ADMIN_EMAIL || 'balancedyte@gmail.com',
        subject: 'Email for diet plan from ' + req.body.domain,
        html: `<h2>Someone sent email for diet plan on ${req.body.domain}</h2> 
        <p> Name:  <strong> ${req.body.fullname}</strong></p>
        <p> Email:  <strong> ${req.body.email}</strong></p>
        <p> Contact No.:  <strong> ${req.body.phone}</strong></p>
        <p> Gender:  <strong> ${req.body.gender}</strong></p>
        <p> Age(in years):  <strong> ${req.body.age}</strong></p>
        <p> Duration of Plan(in months):  <strong> ${req.body.duration}</strong></p>
        <p> Goals:  <strong> ${req.body.goals}</strong></p>
        <p> Lose/Gain Weight:  <strong> ${req.body.loseORgain}</strong></p>
        <p> Weight(in kg(s)):  <strong> ${req.body.weight}</strong></p>
        <p> Height(in feet inches):  <strong> ${req.body.height}</strong></p>
        <p> Medical Issue or Taking any medicines:  <strong> ${req.body.medicalIssue ? req.body.medicalIssue : 'User didn\'t fill up'}</strong></p>
        <p> Food Allergy:  <strong> ${req.body.foodAllergy ? req.body.foodAllergy : 'User didn\'t fill up'}</strong></p>
        <p> Food Type:  <strong> ${req.body.foodType}</strong></p>
        <p> Going to Gym?:  <strong> ${req.body.goingGym}</strong></p>
        <p> Physically Active?:  <strong> ${req.body.physicallyActive}</strong></p>
        `,
      };
      
       transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send({error: error})
        } else {
            res.send({res: info.response, message: 'Details sent successfully'})
        }
      });
});


module.exports = router;