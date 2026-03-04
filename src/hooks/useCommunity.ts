import { useState, useEffect, useCallback } from 'react';
import { Post, Comment } from '../types';

export function useCommunity() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${protocol}//${window.location.host}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case 'NEW_POST':
          setPosts(prev => [data.post, ...prev]);
          break;
        case 'NEW_COMMENT':
          setPosts(prev => prev.map(post => 
            post.id === data.postId 
              ? { ...post, comments: [...post.comments, data.comment] }
              : post
          ));
          break;
        case 'UPDATE_COMMENT':
          setPosts(prev => prev.map(post => 
            post.id === data.postId 
              ? { ...post, comments: post.comments.map(c => c.id === data.comment.id ? data.comment : c) }
              : post
          ));
          break;
        case 'DELETE_COMMENT':
          setPosts(prev => prev.map(post => 
            post.id === data.postId 
              ? { ...post, comments: post.comments.filter(c => c.id !== parseInt(data.commentId)) }
              : post
          ));
          break;
        case 'UPDATE_POST':
          setPosts(prev => prev.map(post => post.id === data.post.id ? data.post : post));
          break;
        case 'DELETE_POST':
          setPosts(prev => prev.filter(post => post.id !== parseInt(data.postId)));
          break;
      }
    };

    return () => ws.close();
  }, [fetchPosts]);

  const createPost = async (postData: Partial<Post>) => {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    });
    return response.json();
  };

  const updatePost = async (postId: number, userId: string, postData: Partial<Post>) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, ...postData }),
    });
    return response.json();
  };

  const deletePost = async (postId: number, userId: string) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  };

  const addComment = async (commentData: Partial<Comment>) => {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });
    return response.json();
  };

  const deleteComment = async (commentId: number, userId: string) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    });
    return response.json();
  };

  const updateComment = async (commentId: number, userId: string, content: string) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, content }),
    });
    return response.json();
  };

  return { posts, loading, createPost, updatePost, deletePost, addComment, deleteComment, updateComment };
}
