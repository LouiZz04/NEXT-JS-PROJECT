import ComponentLayout from "../../components/layout";
import Gallery from "../../components/gallery";
import Head from '../../components/header';

type Props = {
    params: {
        term: string;
    };
    isImage: boolean;
};

export function generateMetadata({ params: { term } }: Props) {
    return {
        title: `Results for ${term}`
    };
}

export default function SearchResults({ params: { term }, isImage = false }: Props) {
    console.log(isImage);
    return (
        <ComponentLayout>
            <div>
                <Head isImage={isImage} />
                <Gallery topic={term} isImage={isImage} />
            </div>
        </ComponentLayout>
    );
}
