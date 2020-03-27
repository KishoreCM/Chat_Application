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

const addChats = async (req, res) => {
  try {
    let userId;
    let chatId;
    let isFriendChatExist;

    userId = await pool.query(`SELECT id FROM users WHERE phone=$1`, [
      req.fields.userPh
    ]);

    isFriendChatExist = await pool.query(
      `SELECT friend_name, user_id FROM private_chats WHERE friend_name = $1 AND user_id=$2`,
      [req.fields.friendPh, userId.rows[0].id]
    );

    if (!isFriendChatExist.rows[0]) {
      await pool.query(
        `INSERT INTO private_chats(friend_name, user_id, created_at) VALUES ($1, $2, NOW())`,
        [req.fields.friendPh, userId.rows[0].id]
      );
    }
    chatId = await pool.query(
      `SELECT id FROM private_chats WHERE user_id=$1 and friend_name=$2`,
      [userId.rows[0].id, req.fields.friendPh]
    );
    await pool.query(
      `INSERT INTO private_msgs(chat_id, sent_msgs, sent_at) VALUES ($1, $2, NOW())`,
      [chatId.rows[0].id, req.fields.sentMsg]
    );
    res.status(200).send("Message Stored!");
  } catch (error) {
    console.log(error);
  }
  /*
  pool.query(
    `SELECT id FROM users WHERE phone=$1`,
    [req.fields.userPh],
    (q_err, q_res) => {
      if (q_err) {
        console.log(q_err);
      } else {
        userId = q_res.rows[0].id;
      }

      let isFriendChatExist;
      pool.query(
        `SELECT friend_name, user_id FROM private_chats WHERE friend_name = $1 AND user_id=$2`,
        [req.fields.friendPh, userId],
        (q_err, q_res) => {
          if (q_err) {
            console.log(q_err);
          } else {
            console.log("friend_chat: ", q_res.rows[0]);
            isFriendChatExist = q_res.rows[0];
          }
          if (!isFriendChatExist) {
            pool.query(
              `INSERT INTO private_chats(friend_name, user_id, created_at) VALUES ($1, $2, NOW())`,
              [req.fields.friendPh, userId],
              (q_err, q_res) => {
                if (q_err) {
                  console.log(q_err);
                } else {
                  console.log(q_res.rows);
                }
              }
            );
          }
          pool.query(
            `SELECT id FROM private_chats WHERE user_id=$1 and friend_name=$2`,
            [userId, req.fields.friendPh],
            (q_err, q_res) => {
              if (q_err) {
                console.log(q_err);
              } else {
                chatId = q_res.rows[0].id;
              }
              pool.query(
                `INSERT INTO private_msgs(chat_id, sent_msgs, sent_at) VALUES ($1, $2, NOW())`,
                [chatId, req.fields.sentMsg],
                (q_err, q_res) => {
                  if (q_err) {
                    console.log(q_err);
                  } else {
                    res.status(200).send("Message stored!");
                  }
                }
              );
            }
          );
        }
      );
    }
  );*/

  //res.status(200).send("Ok");
};

module.exports = {
  addUsers,
  getUsers,
  getUserChats,
  addChats
};
