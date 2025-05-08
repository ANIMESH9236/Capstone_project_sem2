import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';

export default function Blog() {
  return (
    <div className="blog">
      <h1>Blog Posts</h1>
      {blogPosts.map(post => (
        <div key={post.id} className="blog-card">
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <Link to={`/blog/${post.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
}
