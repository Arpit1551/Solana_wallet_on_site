import { PinataSDK } from 'pinata';

interface uploadMetadataProps {
    name: string,
    symbol: string,
    desc: string,
    imgUrl: File,
}

export const uploadMetadata = async ({ name, symbol, desc, imgUrl }: uploadMetadataProps) => {

    try {
        const pinata = new PinataSDK({
            pinataJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxMmY1NWU2ZC0wMTAxLTRlNDEtOWMyMC00ZDc5ZDNhNDk4NjMiLCJlbWFpbCI6ImFycGl0c2hhcm1hMjAwMDVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjM4ZGNlNmVhM2VhOTAyN2ZhZWJmIiwic2NvcGVkS2V5U2VjcmV0IjoiZjdiOTVkMmU5ZjEwYzQ4NjAwN2JmYTcxMDczNDVjODk4ZDVhMDdhNjNkOGRhY2NmYzAyNTBiMzI4Nzc2NTc4ZSIsImV4cCI6MTgwNjY0NjQ2M30.RLmdIpCRpXubU54WWyyEWxX1DfaR8mnqwhEv6_nTf_g",
            pinataGateway: "yellow-total-caribou-514.mypinata.cloud",
        });

        const upload = await pinata.upload.public.file(imgUrl);

        const tokenMetadata = {
            "name": name,
            "symbol": symbol,
            "description": desc,
            "image": `https://gateway.pinata.cloud/ipfs/${upload.cid}`
        };

        const uploadedData = await pinata.upload.public.json(tokenMetadata);

        return `https://gateway.pinata.cloud/ipfs/${uploadedData.cid}`;
    } catch (error) {
        throw error;
    }
}