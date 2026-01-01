const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  addNote,
  getNotes,
  deleteNote,
  updateNote,
  markNoteStatus,
} = require("../controllers/userController");
const authenticate = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.post("/addNote", authenticate, addNote);
router.get("/getNotes", authenticate, getNotes);
router.delete("/deleteNote/:noteId", authenticate, deleteNote);
router.put("/updateNote/:noteId", authenticate, updateNote);
router.put("/markNoteStatus/:noteId", authenticate, markNoteStatus);

module.exports = router;
