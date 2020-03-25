const pool = require("../database/config");

const addUsers = (req, res) => {
  const values = [req.fields.name, req.fields.phone, req.fields.password];
  pool.query(
    `INSERT INTO users(name, phone, password, created_at)
   VALUES($1, $2, $3, NOW() )`,
    values,
    (q_err, q_res) => {
      if (q_err) {
        console.log("Create User Error:", q_err);
        res.status(500).send(q_err);
      } else {
        console.log("Create User Response:", q_res);
        res.status(201).send(q_res);
      }
    }
  );
};

const getUsers = (req, res) => {
  pool.query(`SELECT * FROM users`, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
      res.status(500).send(q_err);
    } else {
      res.status(200).send(q_res);
    }
  });
};

const getUserChats = (req, res) => {
  const user = [req.fields.userPh];
  let userId;
  let users;

  pool.query(`SELECT id FROM users WHERE phone = $1`, user, (q_err, q_res) => {
    if (q_err) {
      console.log(q_err);
    } else {
      //console.log(q_res.rows);
      userId = [q_res.rows[0].id];

      pool.query(`SELECT * FROM users`, (q_err, q_res) => {
        if (q_err) {
          console.log(q_err);
        } else {
          users = q_res.rows;
          //console.log("users: ", users);
        }

        let userPChats;

        pool.query(
          `SELECT * FROM private_chats WHERE user_id = $1`,
          userId,
          (q_err, q_res) => {
            if (q_err) {
              console.log(q_err);
            } else {
              userPChats = q_res.rows;
              users.push({ userPChats });
            }
            let userGChats;

            pool.query(
              `SELECT * FROM group_chats WHERE user_id = $1`,
              userId,
              (q_err, q_res) => {
                if (q_err) {
                  console.log(q_err);
                } else {
                  userGChats = q_res.rows;
                  users.push({ userGChats });
                  //console.log("users: ", users);
                  res.status(200).send(users);
                }
              }
            );
          }
        );
      });
    }
  });
};

module.exports = {
  addUsers,
  getUsers,
  getUserChats
};
