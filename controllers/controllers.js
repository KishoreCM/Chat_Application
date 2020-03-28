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
    let userId = await pool.query(`SELECT id FROM users WHERE phone=$1`, [
      req.fields.userPh
    ]);
    let friendId = await pool.query(`SELECT id FROM users WHERE phone=$1`, [
      req.fields.friendPh
    ]);

    let isUserChatExist = await pool.query(
      `SELECT * FROM private_chats WHERE user_id=$1 AND friend_name=$2`,
      [userId.rows[0].id, req.fields.friendPh]
    );
    let isFriendChatExist = await pool.query(
      `SELECT * FROM private_chats WHERE user_id=$1 AND friend_name=$2`,
      [friendId.rows[0].id, req.fields.userPh]
    );

    if (!isUserChatExist.rows[0]) {
      await pool.query(
        `INSERT INTO private_chats(friend_name, user_id, created_at) VALUES ($1, $2, NOW())`,
        [req.fields.friendPh, userId.rows[0].id]
      );
    }

    if (!isFriendChatExist.rows[0]) {
      await pool.query(
        `INSERT INTO private_chats(friend_name, user_id, created_at) VALUES ($1, $2, NOW())`,
        [req.fields.userPh, friendId.rows[0].id]
      );
    }

    let userChatId = await pool.query(
      `SELECT id FROM private_chats WHERE user_id=$1 and friend_name=$2`,
      [userId.rows[0].id, req.fields.friendPh]
    );

    let friendChatId = await pool.query(
      `SELECT id FROM private_chats WHERE user_id=$1 and friend_name=$2`,
      [friendId.rows[0].id, req.fields.userPh]
    );

    await pool.query(
      `INSERT INTO private_msgs(user_id, chat_id, sent_msgs, sent_at) VALUES ($1, $2, $3, NOW())`,
      [userId.rows[0].id, userChatId.rows[0].id, req.fields.sentMsg]
    );

    await pool.query(
      `INSERT INTO private_msgs(user_id, chat_id, received_msgs, received_at) VALUES ($1, $2, $3, NOW())`,
      [friendId.rows[0].id, friendChatId.rows[0].id, req.fields.sentMsg]
    );
    res.status(200).send("Message Sent, Received and Stored!");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const getChats = async (req, res) => {
  try {
    let userId = await pool.query(`SELECT id FROM users WHERE phone=$1`, [
      req.fields.userPh
    ]);

    let friendPh = await pool.query(`SELECT phone FROM users WHERE id=$1`, [
      req.fields.friendId
    ]);

    let chatId = await pool.query(
      `SELECT id FROM private_chats WHERE user_id=$1 AND friend_name=$2`,
      [userId.rows[0].id, friendPh.rows[0].phone]
    );

    if (!chatId.rows[0]) {
      return res.status(200).send("You haven't made any conversation yet");
    }

    let chatMsgs = await pool.query(
      `SELECT * FROM private_msgs WHERE chat_id=$1 ORDER BY id ASC`,
      [chatId.rows[0].id]
    );

    res.status(200).send(chatMsgs);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = {
  addUsers,
  getUsers,
  getUserChats,
  addChats,
  getChats
};
