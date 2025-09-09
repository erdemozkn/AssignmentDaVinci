import { useState } from "react";
import PostList from "../../components/post-list/post-list.component";
import UserList from "../../components/user-list/user-list.component";
import "./home.style.scss";

function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  return (
    <section className="home-container">
      <div className="title-section">
        <h1>Homepage</h1>
        <p>Welcome! Click a user to view only their posts. Click the same user again to show posts from all users.</p>
      </div>
      <div className="home-list">
        <div className="user-list"><><UserList onUserPostsClick={setSelectedUserId} /></></div>
        <div className="post-list"><><PostList selectedUserId={selectedUserId} /></></div>
      </div>
    </section>
  );
}

export default Home;
