import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Metadata Generator</title>
        <meta name="description" content="Metadata Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
    </div>
  );
}
