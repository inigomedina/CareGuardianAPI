var express = require('express');
var passport = require('passport');
var router = express.Router();

var libs = process.cwd() + '/libs/';
var log = require(libs + 'log')(module);

var db = require(libs + 'db/mongoose');
var Caregiver = require(libs + 'model/caregiver');

router.get('/', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	Caregiver.find(function (err, caregivers) {
		if (!err) {
			return res.json(caregivers);
		} else {
			res.statusCode = 500;
			
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.post('/', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	var caregiver = new Caregiver({
		name: req.body.name,
		interests: req.body.interests
	});

	caregiver.save(function (err) {
		if (!err) {
			log.info("New Caregiver created with id: %s", caregiver.id);
			return res.json({ 
				status: 'OK', 
				caregiver:caregiver 
			});
		} else {
			if(err.name === 'ValidationError') {
				res.statusCode = 400;
				res.json({ 
					error: 'Validation error' 
				});
			} else {
				res.statusCode = 500;
				res.json({ 
					error: 'Server error' 
				});
			}
			log.error('Internal error(%d): %s', res.statusCode, err.message);
		}
	});
});

router.get('/:id', passport.authenticate('bearer', { session: false }), function(req, res) {
	
	Caregiver.findById(req.params.id, function (err, caregiver) {
		
		if(!caregiver) {
			res.statusCode = 404;
			
			return res.json({ 
				error: 'Not found' 
			});
		}
		
		if (!err) {
			return res.json({ 
				status: 'OK', 
				caregiver:caregiver
			});
		} else {
			res.statusCode = 500;
			log.error('Internal error(%d): %s',res.statusCode,err.message);
			
			return res.json({ 
				error: 'Server error' 
			});
		}
	});
});

router.put('/:id', passport.authenticate('bearer', { session: false }), function (req, res){
	var caregiverId = req.params.id;

	Caregiver.findById(caregiverId, function (err, caregiver) {
		if(!caregiver) {
			res.statusCode = 404;
			log.error('Caregiver with id: %s Not Found', caregiverId);
			return res.json({ 
				error: 'Not found' 
			});
		}

		caregiver.interests = req.body.interests;
		caregiver.name = req.body.name;
		
		caregiver.save(function (err) {
			if (!err) {
				log.info("Caregiver with id: %s updated", caregiver.id);
				return res.json({ 
					status: 'OK', 
					caregiver:caregiver
				});
			} else {
				if(err.name === 'ValidationError') {
					res.statusCode = 400;
					return res.json({ 
						error: 'Validation error' 
					});
				} else {
					res.statusCode = 500;
					
					return res.json({ 
						error: 'Server error' 
					});
				}
				log.error('Internal error (%d): %s', res.statusCode, err.message);
			}
		});
	});
});

module.exports = router;
