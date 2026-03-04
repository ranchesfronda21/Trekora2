import express from "express";
import { createServer as createViteServer } from "vite";
import { WebSocketServer, WebSocket } from "ws";
import http from "http";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("trekora.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    userName TEXT,
    userPhoto TEXT,
    content TEXT,
    mediaUrl TEXT,
    mediaType TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    postId INTEGER,
    userId TEXT,
    userName TEXT,
    userPhoto TEXT,
    content TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(postId) REFERENCES posts(id)
  );
`);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocketServer({ server });

  app.use(express.json());

  // WebSocket broadcast helper
  const broadcast = (data: any) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  };

  // API Routes
  app.get("/api/posts", (req, res) => {
    const posts = db.prepare("SELECT * FROM posts ORDER BY createdAt DESC").all();
    const postsWithComments = posts.map((post: any) => {
      const comments = db.prepare("SELECT * FROM comments WHERE postId = ? ORDER BY createdAt ASC").all(post.id);
      return { ...post, comments };
    });
    res.json(postsWithComments);
  });

  app.post("/api/posts", (req, res) => {
    const { userId, userName, userPhoto, content, mediaUrl, mediaType } = req.body;
    const info = db.prepare(
      "INSERT INTO posts (userId, userName, userPhoto, content, mediaUrl, mediaType) VALUES (?, ?, ?, ?, ?, ?)"
    ).run(userId, userName, userPhoto, content, mediaUrl, mediaType);
    
    const newPost = db.prepare("SELECT * FROM posts WHERE id = ?").get(info.lastInsertRowid);
    (newPost as any).comments = [];
    
    broadcast({ type: "NEW_POST", post: newPost });
    res.json(newPost);
  });

  app.post("/api/comments", (req, res) => {
    const { postId, userId, userName, userPhoto, content } = req.body;
    const info = db.prepare(
      "INSERT INTO comments (postId, userId, userName, userPhoto, content) VALUES (?, ?, ?, ?, ?)"
    ).run(postId, userId, userName, userPhoto, content);
    
    const newComment = db.prepare("SELECT * FROM comments WHERE id = ?").get(info.lastInsertRowid);
    
    broadcast({ type: "NEW_COMMENT", comment: newComment, postId });
    res.json(newComment);
  });

  app.delete("/api/comments/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // In a real app, verify this with a token
    
    const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(id) as any;
    if (comment && comment.userId === userId) {
      db.prepare("DELETE FROM comments WHERE id = ?").run(id);
      broadcast({ type: "DELETE_COMMENT", commentId: id, postId: comment.postId });
      res.json({ success: true });
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });

  app.put("/api/comments/:id", (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;
    
    const comment = db.prepare("SELECT * FROM comments WHERE id = ?").get(id) as any;
    if (comment && comment.userId === userId) {
      db.prepare("UPDATE comments SET content = ? WHERE id = ?").run(content, id);
      const updatedComment = db.prepare("SELECT * FROM comments WHERE id = ?").get(id);
      broadcast({ type: "UPDATE_COMMENT", comment: updatedComment, postId: comment.postId });
      res.json(updatedComment);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });

  app.put("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { userId, content, mediaUrl, mediaType } = req.body;
    
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as any;
    if (post && post.userId === userId) {
      db.prepare("UPDATE posts SET content = ?, mediaUrl = ?, mediaType = ? WHERE id = ?").run(content, mediaUrl, mediaType, id);
      const updatedPost = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as any;
      const comments = db.prepare("SELECT * FROM comments WHERE postId = ? ORDER BY createdAt ASC").all(id);
      updatedPost.comments = comments;
      broadcast({ type: "UPDATE_POST", post: updatedPost });
      res.json(updatedPost);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });

  app.delete("/api/posts/:id", (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    
    const post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id) as any;
    if (post && post.userId === userId) {
      db.prepare("DELETE FROM comments WHERE postId = ?").run(id);
      db.prepare("DELETE FROM posts WHERE id = ?").run(id);
      broadcast({ type: "DELETE_POST", postId: id });
      res.json({ success: true });
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
