// ClientHome.tsx
import axios from "axios";
import { useEffect } from "react";

export default function ClientHome() {
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // Handle the response data
        console.log(response.data);
      })
      .catch((error) => {
        // Handle the error
        console.error(error);
      });
  }, []);

  return <main className="bg-green-400 h-96 "></main>;
}
