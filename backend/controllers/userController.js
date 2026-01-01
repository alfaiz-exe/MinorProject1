const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const isProduction = process.env.NODE_ENV === "production";
const cookieSameSite = isProduction ? "None" : "Lax";

exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({ name, email, passwordHash, phone });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken({ userId: user._id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: cookieSameSite,
      secure: isProduction,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: cookieSameSite,
      secure: isProduction,
      path: "/",
    })
    .json({ message: "Logged out successfully" });
};

exports.addNote = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.notes.push({ content, status: "unread" });
    await user.save();

    res.status(201).json({ message: "Note added", notes: user.notes });
  } catch (err) {
    res.status(500).json({ message: "Unable to add note", error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ notes: user.notes });
  } catch (err) {
    res.status(500).json({ message: "Unable to fetch notes", error: err.message });
  }
};

exports.deleteNote = async (req, res) => {
  const { noteId } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const noteIndex = user.notes.findIndex((n) => n._id.toString() === noteId);
    if (noteIndex === -1) return res.status(404).json({ message: "Note not found" });

    user.notes.splice(noteIndex, 1);
    await user.save();

    res.status(200).json({ message: "Note deleted", notes: user.notes });
  } catch (err) {
    res.status(500).json({ message: "Unable to delete note", error: err.message });
  }
};

exports.updateNote = async (req, res) => {
  const { noteId } = req.params;
  const { content } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const note = user.notes.id(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.content = content;
    await user.save();

    res.status(200).json({ message: "Note updated", notes: user.notes });
  } catch (err) {
    res.status(500).json({ message: "Unable to update note", error: err.message });
  }
};

exports.markNoteStatus = async (req, res) => {
  const { noteId } = req.params;
  const { readStatus } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const note = user.notes.id(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.status = readStatus;
    await user.save();

    res.status(200).json({ message: "Note status updated", notes: user.notes });
  } catch (err) {
    res.status(500).json({ message: "Unable to update note status", error: err.message });
  }
};
