import fetchimage from "@/lib/fetch";
import { Media } from "@/modules/types";
import Ani from "./animationim";
import Aniv from "./animationvi";

type Props = {
    topic?: string;
    isImage: boolean;
};

export default async function Gallery({ topic, isImage }: Props) {
    const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
    let v = isImage? "": "videos/";
    v="";

    const url = topic ?`https://pixabay.com/api/${v}?key=${apiKey}&q=${topic}&image_type=photo,video`
    :`https://pixabay.com/api/${v}?key=${apiKey}&editor_edition=true&image_type=photo,video`;

    const media: Media | undefined = await fetchimage(url);

    if (!media || media.hits.length === 0) {
        return <h2 className="font-bold text-lg">Nothing found in here...</h2>;
    }

    return (
        <section className="my-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {media.hits.map((item) => (
                    <li key={item.id} className="flex justify-center items-center">
                        {'imageWidth' in item ? (
                            <Ani item={item}/>
                        ) : ( 
                            <Aniv item={item}/>           
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
