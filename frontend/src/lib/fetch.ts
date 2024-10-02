import type {Media} from "@/modules/types";

export default async function fetchimage(url: string): Promise<Media | undefined> {

    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return undefined;
        }

        const data: Media = await response.json();
        return data;

    } catch (e) {
        console.error("Error fetching images:", e);
        return undefined;
    }
}
