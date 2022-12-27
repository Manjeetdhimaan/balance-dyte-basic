const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send-mail',  (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.AUTH_USER || 'manjeetdhimaan60@gmail.com',
          pass: process.env.AUTH_PASS || 'lpaqbtmffjmepylc'
        }
      });
      
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: process.env.ADMIN_EMAIL || 'manjeetdhimaan60@gmail.com',
        subject: 'Email for diet plan from ' + req.body.domain,
        html: `<h2>Someone sent email for diet plan on ${req.body.domain}</h2> 
        <h3> Name:  <strong><i>${req.body.fullname}</i></strong></h3>
        <h3> Email:  <strong><i>${req.body.email}</i></strong></h3>
        <h3> Contact No.:  <strong><i>${req.body.phone}</i></strong></h3>
        <h3> Gender:  <strong><i>${req.body.gender}</i></strong></h3>
        <h3> Age:  <strong><i>${req.body.age}</i></strong></h3>
        <h3> Duration of Plan:  <strong><i>${req.body.duration}</i></strong></h3>
        <h3> Goals:  <strong><i>${req.body.goals}</i></strong></h3>
        <h3> Weight:  <strong><i>${req.body.weight}</i></strong></h3>
        <h3> Medical Issue:  <strong><i>${req.body.medicalIssue ? req.body.medicalIssue : 'No Medical Issue'}</i></strong></h3>
        <h3> Food Allergy:  <strong><i>${req.body.foodAllergy ? req.body.foodAllergy : 'No Allergy'}</i></strong></h3>
        <h3> Food Type:  <strong><i>${req.body.foodType}</i></strong></h3>
        <h3> Going to Gym?:  <strong><i>${req.body.goingGym}</i></strong></h3>
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