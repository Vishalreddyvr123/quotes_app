const db = require("../utils/dbpool");
const { apiSuccess, apiError } = require("../utils/apiresult");
const express = require("express");
const router = express.Router();
const path = require("path");

router.get("", (req, resp) => {
	db.query("SELECT * FROM quote", (err, results) => {
		if (err) return resp.send(apiError(err));
		resp.send(apiSuccess(results));
	});
});

router.post("", (req, resp) => {
    const { author, contents, userId, createdTime} = req.body
    db.query("INSERT INTO quote(author, contents, userId, ,createdTime) VALUES(?, ?, ?, ?)",
        [ author, contents, userId, createdTime],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            // if INSERT is successful, fetch newly inserted record from db and return it
            if(result.affectedRows === 1) {
                db.query("SELECT * FROM quote WHERE id=?", 
                [result.insertId],
                (err, result) => {
                    if(err)
                        return resp.send(apiError(err))
                    resp.send(apiSuccess(result[0]))
                })
            }
        }
    )
})
router.delete("/:id", (req, resp) => {
    db.query("DELETE FROM quote WHERE id=?", [req.params.id],
        (err, result) => {
            if(err)
                return resp.send(err)
            if(result.affectedRows === 1)
                resp.send(apiSuccess("quote deleted"))
            else
                resp.send(apiError("quote not found"))
        }
    )
})

router.put("/:id", (req, resp) => {
    const { author, contents, userId, createdTime} = req.body
    db.query("UPDATE books SET author=?, contents=?, userId=?, createdTime=? WHERE id=?",
        [author, contents, userId, createdTime, req.params.id],
        (err, result) => {
            if(err)
                return resp.send(apiError(err))
            resp.send(apiSuccess({id: req.params.id, ...req.body}))
        }
    )
})

module.exports=router;