import Gallery from "./components/gallery";
import Head from "./components/header";

export default function Home() {

  let isImage: boolean = true;
  let topic: string | undefined = undefined;

  return (
    <div className="bg-black mx-auto p-0 text-white">
      <Head isImage={isImage}/>
      <div className="max-w-4xl mx-auto">
        <Gallery topic={topic} isImage={isImage}/>
      </div>
    </div>
  );
}
