import { server } from "../../config";
import Header from "../components/Header";

export default function Home({ articles }) {
  return (
    <div>
      <Header />
    </div>
  );
}

// export const getStaticProps = async () => {
//   const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`);
//   const articles = await res.json();

//   return {
//     props: {
//       articles
//     }
//   };
// }
