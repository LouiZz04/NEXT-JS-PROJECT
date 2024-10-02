import Gallery from "./gallery";
import Head from './header';

export default function Gall({ topic, isImage }: { topic?: string; isImage: boolean }) {
  console.log("Rendering Gall with topic:", topic, "and isImage:", isImage);

  return (
    <div className="bg-black mx-auto p-0 text-white">
      <Head isImage={isImage} />
      <div className="max-w-4xl mx-auto">
        {topic && <Gallery topic={topic} isImage={isImage} />}
      </div>
    </div>
  );
}
