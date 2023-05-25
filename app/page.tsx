"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts?_page=1&_limit=8"
        );
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 20
      ) {
        // User has scrolled to the bottom
        loadMorePosts();
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [posts]);

  const loadMorePosts = async () => {
    if (isLoading) return; // Prevent multiple simultaneous requests
    setIsLoading(true);

    try {
      const nextPage = Math.ceil(posts.length / 8) + 1;
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_page=${nextPage}&_limit=8`
      );

      // Filter out posts that already exist in the current state
      const newPosts = response.data;

      setPosts((prevPosts: any) => [...prevPosts, ...newPosts]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-400 h-96 overflow-scroll" ref={containerRef}>
      {posts.length > 0 &&
        posts.map((post: any) => (
          <p style={{ margin: "20px" }} key={post.id}>
            {post.id}
            {""}
            {post?.body}
          </p>
        ))}
    </main>
  );
}
