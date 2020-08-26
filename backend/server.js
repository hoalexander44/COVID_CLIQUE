const pg = require("pg");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require('cors');
const app = express();


const port = 5001;
const hostname = "localhost";

const saltRounds = 10;

const env = require("../env.json");
const Pool = pg.Pool;
const pool = new Pool(env);
app.use(express.json());


pool.connect().then(function () {
    console.log(`Connected to database ${env.database}`);
});

//app.use(express.static("public_html"));

var whitelist = ['http://localhost:3000']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allows by CORS'))
        }
    }
}
//app.use(cors(corsOptions));
app.use(cors());
app.use(express.json());



function dateToString(newDate) {
	var dd = String(newDate.getDate()).padStart(2, '0');
	var mm = String(newDate.getMonth() + 1).padStart(2, '0');
	var hh = String(newDate.getHours()).padStart(2, '0');
	var min = String(newDate.getMinutes()).padStart(2, '0');
	var sec = String(newDate.getSeconds()).padStart(2, '0');

	var yyyy = newDate.getFullYear();
	newStringDate = mm + '/' + dd + '/' + yyyy;
	newStringDate = yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min + ':' + sec;
	return newStringDate;

}

function locationScoreAlgo(visits, infectedVisits) {
	let newLocationScore = (visits) + (infectedVisits * 100);
}

function userScoreAlgo(score, totalMinutesSinceLastVisit, locationScore) {
	let newScore = score + (totalMinutesSinceLastVisit * 10) - locationScore
	return newScore;
}

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/weather", function (req, res) {
    res.status(200);
    res.send("YOU CONNECTED!!!!");
});

app.post("/user", function (req, res) {

	// change
	var today = new Date();
	today = dateToString(today);


	let input = true;
	let username = req.body.username;
	let plaintextPassword = req.body.plaintextPassword;
	if (username !== undefined &
		req.body.plaintextPassword !== undefined) {
		if (((typeof username) == "string") &
			((typeof plaintextPassword) == "string") &
			username.length >= 1 &
			username.length <= 20 &
			plaintextPassword.length >= 5 &
			plaintextPassword.length <= 36

		) {

			pool.query(
				"SELECT username FROM users"
			).then(function (response) {
				console.log(response.rows);
				for (let i = 0; i < response.rows.length; i++) {
					console.log(response.rows[i]["username"]);
					if (response.rows[i]["username"] == username) {
						console.log("account already exists");
						input = false;
						console.log("CAN INPUT inside??: " + input);
						res.status(401).send();
						return;
					}
				}
				console.log("CAN INPUT outside??: " + input);
				if (input) {

					let tableQuery = 'CREATE TABLE past_locations_' + username + ' (id SERIAL PRIMARY KEY, location_name VARCHAR(50), date VARCHAR(50))'
					pool.query(tableQuery).then(function (tableResponse) {

						let tableQuery = 'CREATE TABLE friends_' + username + ' (id SERIAL PRIMARY KEY, friend_name VARCHAR(50))'
						pool.query(tableQuery).then(function (tableResponse) {




							bcrypt
								.hash(plaintextPassword, saltRounds)
								.then(function (hashedPassword) {
									pool.query(
										"INSERT INTO users (username, hashed_password) VALUES ($1, $2)",
										[username, hashedPassword]
									)
										.then(function (response) {
											// account successfully created
											res.status(200).send();
										})
										.catch(function (error) {
											console.log(error);
											res.status(500).send(); // server error
										});
								})
								.catch(function (error) {
									console.log(error);
									res.status(500).send(); // server error
								});


							//[username, { names: ["testName", "testName"] }, { meeting: "test meeting" }, { location: "test location" }, { threat: 0 }]
							// move to database trigger
							pool.query(
								"INSERT INTO user_data (username, friends, score, last_location_time, isinfected, hassymptoms) VALUES ($1, $2, $3, $4, $5, $6)",
								[username, '[]', 0, today, false, false]

							)
								.then(function (response) {
									// account successfully created
									res.status(200).send();
								})
								.catch(function (error) {
									console.log(error);
									res.status(500).send(); // server error
								});



						});
					});
				}
			});

		}
		else {
			res.status(401).send();
		}
	}
	else {
		res.status(401).send();
	}

});


app.post("/auth", function (req, res) {
	let username = req.body.username;
	let plaintextPassword = req.body.plaintextPassword;
	pool.query("SELECT hashed_password FROM users WHERE username = $1", [
		username,
	])
		.then(function (response) {
			if (response.rows.length === 0) {
				// username doesn't exist
				return res.status(401).send();
			}
			let hashedPassword = response.rows[0].hashed_password;
			bcrypt
				.compare(plaintextPassword, hashedPassword)
				.then(function (isSame) {
					if (isSame) {
						// password matched
						res.status(200).send();
					} else {
						// password didn't match
						res.status(401).send();
					}
				})
				.catch(function (error) {
					console.log(error);
					res.status(500).send(); // server error
				});
		})
		.catch(function (error) {
			console.log(error);
			res.status(500).send(); // server error
		});
});


app.post("/addFriend", function (req, res) {
	let friendName = req.body.friendName;
	let username = req.body.username; // NEED TO COMPARE FRIEND NAME AND USERNAME TO MAKE SURE USER IS NOT ADDING THEMSELVES

	if (friendName !== username) {
		pool.query("SELECT username FROM users WHERE username = $1", [
			friendName,
		])
			.then(function (response) {
				if (response.rows.length === 0) {
					console.log("USERNAME NO EXIST")
					return res.status(401).send();
				}
				else {



					let insertFriendQuery = "INSERT INTO friends_" + username + " (friend_name) VALUES ($1)"
					pool.query(
						insertFriendQuery,
						[friendName]
					).then(function (response) {
						console.log("ADDED FRIEND");
						return res.status(200).send();
					})



				}
			})
			.catch(function (error) {
				console.log(error);
				res.status(500).send(); // server error
			});
	}
	else {
		res.status(500).send();
    }

});


app.post("/getFriends", function (req, res) {
	let username = req.body.username;
	let getFriendQuery = 'SELECT * FROM friends_' + username;
	let friendInfoList = [];

	pool.query(getFriendQuery).then(function (friendNameResponse) {
		friendNameList = friendNameResponse.rows;
		console.log(friendNameList);
		for (let i = 0; i < friendNameList.length; i++) {
			let getFriendInfoQuery = 'SELECT * FROM user_data WHERE username = $1';
			pool.query(getFriendInfoQuery, [friendNameList[i].friend_name]).then(function (friendInfoResponse) {
				friendInfoList.push(friendInfoResponse.rows[0]);
				console.log(friendInfoList);

				// SUPEEERRR Ratchet way to return
				if (i == (friendNameList.length - 1)) {
					let returnData = { friendInfoList: friendInfoList };
					return res.json(returnData);
                }
			});
		}



    })

});


// add validation
// update math
// add how long you were at location
app.post("/addUserData", function (req, res) {
	let newScore = 0;
	let location_score = null;

	let location_name = req.body.location_name;
	let username = req.body.username;

	if (location_name !== undefined && username !== undefined) {
		 pool.query("SELECT * FROM locations where location_name = $1", [location_name]).then(function (locationResponse) {
			console.log(locationResponse.rows[0].location_name);
			console.log(locationResponse.rows[0].visits);
			console.log(locationResponse.rows[0].infected_visits);
			console.log(locationResponse.rows[0].location_score);

			let newVisits = locationResponse.rows[0].visits + 1;
			 let newLocationScore = (newVisits * 1) + (locationResponse.rows[0].infected_visits * 100);
			//newLocationScore = locationScoreAlgo(newVisits, locationResponse.rows[0].infected_visits);
			location_score = newLocationScore;

			pool.query("UPDATE locations SET visits=$1, location_score=$2  WHERE location_name= $3", [
				newVisits, newLocationScore, location_name,
			]).then(function (response) {

				pool.query("SELECT * FROM user_data WHERE username = $1", [username,]).then(function (response) {
					let test_location_date = new Date()
					let last_location_date = new Date(response.rows[0].last_location_time);
					let diff = test_location_date - last_location_date;



					// TODO adjust algorithm
					// maybe add a "how long were you there"
					var totalminutes = Math.floor(diff / 60000); // total_minutes
					//newScore = response.rows[0].score + (totalminutes * 10) - location_score
					newScore = userScoreAlgo(response.rows[0].score, totalminutes, location_score)



					pool.query("UPDATE user_data SET score = $1, last_location_time = $2 WHERE username= $3", [
						newScore, test_location_date, username,
					]).then(function (response) {

						let newStringDate = dateToString(test_location_date);
						let locationHistoryInsertQuery = "INSERT INTO past_locations_" + username + "(location_name, date) VALUES ($1, $2)";
						pool.query(locationHistoryInsertQuery, [location_name, newStringDate])
						return res.status(200).send();
					});

				});

			});

		})


	}
	else {
		console.log("did not have the right parameters");
		return res.status(500).send();
    }



});


app.post("/getUserData", function (req, res) {
	let username = req.body.username;
	console.log("SDFSDAFDAS: " + username);
	if (username !== undefined) {
		pool.query("SELECT * FROM user_data WHERE username=$1", [username]).then(function (response) {
			let userData = response.rows[0];
			console.log("USER DATA");
			console.log(userData);
			return res.json(userData);

		})
	}
	else {
		console.log("username not provided");
		res.status(500).send;
    }

});


app.get("/getLocations", function (req, res) {

	pool.query("SELECT * FROM locations").then(function (response) {
		let locationList = response.rows;
		console.log("LIST");
		console.log(locationList);
		return res.json({ locations: locationList });

	})

});


app.post("/selfReport", function (req, res) {
	let username = req.body.username;
	let isInfected = req.body.isInfected;
	let hasSymptoms = req.body.hasSymptoms;

	if (isInfected == true) {
		let updateIsInfectQuery = 'UPDATE user_data SET isInfected=$1, hassymptoms=$2 WHERE username=$3'
		pool.query(updateIsInfectQuery, [isInfected, hasSymptoms, username]).then(function (response) {

			let locationHistory = 'SELECT * FROM past_locations_' + username;
			pool.query(locationHistory).then(function (response) {
				let pastLocationNames = response.rows;

				if (pastLocationNames.length > 0) {
					for (let i = 0; i < pastLocationNames.length; i++) {
						let locationName = pastLocationNames[i].location_name;
						console.log(locationName);
						pool.query("SELECT * FROM locations WHERE location_name=$1", [locationName]).then(function (visitResponse) {

							let newInfectedVisits = visitResponse.rows[0].infected_visits;
							newInfectedVisits += 1;
							//let newLocationScore = (visitResponse.rows[0].visits) + (newInfectedVisits * 100);
							let newLocationScore = locationScoreAlgo(visitResponse.rows[0].visits, newInfectedVisits)

							pool.query("UPDATE locations SET infected_visits=$1, location_score=$2  WHERE location_name= $3", [
								newInfectedVisits, newLocationScore, locationName,
							]).then(function (response) {


								// SUPEEERRR Ratchet way to return
								if (i == (pastLocationNames.length - 1)) {
									return res.status(200).send();
								}



							});




						})


					}

				}
				else {
					return res.status(200).send();
                }



			})
		})
	}
	else {
		res.status(200).send();
    }

});

//app.get("/addLocation", function (req, res) {

//});


/*
app.post("/vulnerable", function (req, res) {
    let userValue = req.body.userValue;
    let myQuery = `SELECT * FROM users WHERE username = ${userValue}`;
    console.log(myQuery)
    pool.query(myQuery).then(
        function (response) {
            // do nothing
        }
    ).catch(function (error) {
        console.log(error);
    });
    res.send();
});
*/

app.listen(port, hostname, () => {
	console.log(`Listening at: http://${hostname}:${port}`);
});
