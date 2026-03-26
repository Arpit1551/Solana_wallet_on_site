import axios from "axios";

interface uploadMetadataProps {
    name: string,
    desc: string,
    imgUrl: string,
}

export const uploadMetadata = async ({ name, desc, imgUrl }: uploadMetadataProps) => {
    const metadata = {
        name: name,
        desc: desc,
        image: imgUrl,
        attributes: []
    };

    const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        metadata,
        {
            headers:{
                pinata_api_key: process.env.PINATA_API_KEY,
                pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY
            }
        }
    );

    console.log(res.data);
    return res.data;
}