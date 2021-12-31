import { ImmutableAssetStatusCodec, ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const tokenAddress = '0x6e8ba426586a96935c6b91fd12206557df6e3ec1';
    const [imxClient, setImxClient] = useState<ImmutableXClient>();
    useEffect(() => {
        const init = async () => {
            const client = await ImmutableXClient.build({ publicApiUrl: 'https://api.x.immutable.com/v1' })
            setImxClient(client);
        }
        init();
    }, [])

    useEffect(() => {
        getOwners();
    }, [imxClient])

    async function getOwners() {
        if (!imxClient)
            return;
        let req_cursor = '';
        let assets: any = [];
        while (true) {
            const res: ImmutableMethodResults.ImmutableGetAssetsResult = await imxClient.getAssets({
                collection: tokenAddress,
                page_size: 200,
                cursor: req_cursor
            })

            if (!res.remaining)
                break;
            
            req_cursor = res.cursor;
            assets = assets.concat(res.result);
        }
        console.log(assets.length);
    }

    return (
        <div className="App">
        </div>
    );
}

export default App;
