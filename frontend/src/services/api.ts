export const API_URL = "http://localhost:4000/api";

export async function fetchUsers() {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
}

export async function fetchUserById(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`);
  return res.json();
}

export async function createUser(user: { name: string; username: string; email: string }) {
  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function updateUser(id: number, user: { name?: string; username?: string; email?: string }) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
}

export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`, { method: "DELETE" });
  return res.json();
}


export async function fetchPosts() {
  const res = await fetch(`${API_URL}/posts`);
  return res.json();
}

export async function fetchPostById(id: number) {
  const res = await fetch(`${API_URL}/posts/${id}`);
  return res.json();
}

export async function fetchPostsByUserId(userId: number) {
  const res = await fetch(`${API_URL}/posts/user/${userId}`);
  return res.json();
}

export async function createPost(post: { content: string; authorId: number }) {
  const res = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function updatePost(id: number, post: { content?: string; authorId?: number }) {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
}

export async function deletePost(id: number) {
  const res = await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
  return res.json();
}