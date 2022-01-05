import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import './App.css';

interface Metadata {
    Mind?: number
    Power?: number
    Drive?: number
    Heart?: number
    Type: string
    cache_for: number
    cardId?: number
    packId?: number
    cardTemplateId?: number
    packTemplateId?: number
    external_url: string
    image_url: string
    mintNumber: number
    name: string
    totalQuantity: number
    uuid: string
};

interface ItemInfo {
    assets: ImmutableMethodResults.ImmutableAsset[]
    circulation: number
    owners: Set<string>
}

function App() {
    const tokenAddress = '0x6e8ba426586a96935c6b91fd12206557df6e3ec1';
    const burnAddress = '0x12e923ef5d56f83d874d8d29dc98a7e83a616b19';
    const [loadingAssets, setLoadingAssets] = useState<Boolean>(false);
    const [allItems, setAllItems] = useState<{[key: number]: ItemInfo}>({});

    useEffect(() => {
        const init = async () => {
            const client = await ImmutableXClient.build({ publicApiUrl: 'https://api.x.immutable.com/v1' })
            getOwners(client);
        }
        init();
    }, [])

    async function getOwners(imxClient: ImmutableXClient) {
        let req_cursor = '';
        setLoadingAssets(true);
        let tempItems: {[key: number]: ItemInfo} = allItems;
        while (true) {
            const res: ImmutableMethodResults.ImmutableGetAssetsResult = await imxClient.getAssets({
                collection: tokenAddress,
                page_size: 200,
                cursor: req_cursor
            })

            req_cursor = res.cursor;

            for (const asset of res.result) {
                if (!asset.user) continue;
                if (asset.user === burnAddress) continue;

                const metadata = asset.metadata as Metadata;
                const templateId = metadata.cardTemplateId ? metadata.cardTemplateId : metadata.packTemplateId;

                if (!templateId) continue;

                let _old = tempItems[templateId];
                if (!_old) {
                    tempItems[templateId] = {
                        assets: [asset],
                        circulation: 1,
                        owners: new Set([asset.user])
                    } as ItemInfo;
                } else {
                    // tempItems[templateId].assets.push(asset);
                    tempItems[templateId].circulation++;
                    tempItems[templateId].owners.add(asset.user); 
                }
            }

            setAllItems({...tempItems});

            if (!res.remaining)
                break;
        }

        setLoadingAssets(false);
    }

    return (
        <div className="App">
            {loadingAssets ? <h2>LOADING ASSETS...</h2> : null}
            {Object.values(test).length > 0 ?
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Total Supply</th>
                            <th># Unique Holders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(test).map((val: ItemInfo, idx: number) => (
                            <tr key={idx}>
                                <td>{val.assets[0].name}</td>
                                <td>{val.circulation}</td>
                                <td>{val.owners.size}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            : null}
        </div>
    );
}

export default App;
