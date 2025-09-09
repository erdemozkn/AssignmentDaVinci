import { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../../services/api";
import { FaRegSave } from "react-icons/fa";
import { BiMessageAltEdit } from "react-icons/bi";
import { MdDeleteForever, MdCancel } from "react-icons/md";
import "./post-list.style.scss";

interface Post {
  id: number;
  content: string;
  authorId: number;
  createdAt: string;
}

interface PostListProps {
  selectedUserId: number | null;
}

function PostList({ selectedUserId }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  const filteredPosts = selectedUserId
    ? posts.filter((p) => p.authorId === selectedUserId)
    : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  const handleUpdate = async (post: Post) => {
    const updated = await updatePost(post.id, {
      content: post.content,
      authorId: post.authorId,
    });
    setPosts(posts.map((p) => (p.id === post.id ? updated : p)));
    setEditingPost(null);
  };

  const handleCreate = async () => {
    if (!selectedUserId) return alert("Need to select a user first"); // Avoid pop up and logic karmaşa
    const newPost = await createPost({ content: "New Post", authorId: selectedUserId });
    setPosts([...posts, newPost]);
    setCurrentPage(totalPages);
  };

  const getPaginationPages = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(5, totalPages);
      } else if (end === totalPages) {
        start = Math.max(1, totalPages - 4);
      }
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <section className="post-list-container">
      <h2>Post List</h2>
      <div className="list">
        {currentPosts.map((p) => (
          <div key={p.id} className="items">
            {editingPost?.id === p.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate(editingPost);
                }}
              >
                <input
                  value={editingPost.content}
                  onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                />
                <input
                  value={editingPost.authorId}
                  type="number"
                  onChange={(e) => setEditingPost({ ...editingPost, authorId: Number(e.target.value) })}
                />
                <button type="submit" className="submit-button"><FaRegSave /></button>
                <button type="button" className="cancel-button" onClick={() => setEditingPost(null)}>
                  <MdCancel />
                </button>
              </form>
            ) : (
              <div className="details">
                <p>{p.content} (Author {p.authorId})</p>
                <div className="update">
                  <button className="edit-icon" onClick={() => setEditingPost(p)}>
                    <BiMessageAltEdit />
                  </button>
                  <button className="delete-icon" onClick={() => handleDelete(p.id)}>
                    <MdDeleteForever />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="controls">
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {getPaginationPages().map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
        <div className="create">
          <button onClick={handleCreate}>+ Add Post</button>
        </div>
      </div>
    </section>
  );
}

export default PostList;
