import { ImmutableMethodResults, ImmutableXClient } from '@imtbl/imx-sdk';
import { useState } from 'react';
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

interface GearRarity {
    type: 'Prime' | 'Lume' | 'Irid' | 'Alloy' | 'Core'
    totalOwners: Set<string>
    lockerOwners: Set<string>
    lockerCirculation: number
    lockerInventory: number
    gearOwners: Set<string>
    gearCirculation: number
    gearInventory: number
    floor?: number
}

function App() {
    const tokenAddress = '0x6e8ba426586a96935c6b91fd12206557df6e3ec1';
    const burnAddress = '0x12e923ef5d56f83d874d8d29dc98a7e83a616b19';
    const inventoryAddress = '0xb35d857024031d21974c1bc52ee4f02ce0cc82d9';
    
    const [loadingAssets, setLoadingAssets] = useState<Boolean>(false);
    const [totalOwners, setTotalOwners] = useState<Set<string>>(new Set());
    const [coreInfo, setCoreInfo] = useState<GearRarity>(getInitObject('Core'));
    const [alloyInfo, setAlloyInfo] = useState<GearRarity>(getInitObject('Alloy'));
    const [iridInfo, setIridInfo] = useState<GearRarity>(getInitObject('Irid'));
    const [lumeInfo, setLumeInfo] = useState<GearRarity>(getInitObject('Lume'));
    const [primeInfo, setPrimeInfo] = useState<GearRarity>(getInitObject('Prime'));

    function getInitObject(_type: 'Prime' | 'Lume' | 'Irid' | 'Alloy' | 'Core'): GearRarity {
        return {
            type: _type, 
            totalOwners: new Set(), 
            lockerOwners: new Set(), 
            lockerCirculation: 0, 
            lockerInventory: 0, 
            gearOwners: new Set(), 
            gearCirculation: 0, 
            gearInventory: 0
        };
    }

    async function handleInitButtonClick() {
        const client = await ImmutableXClient.build({ publicApiUrl: 'https://api.x.immutable.com/v1' })
        getOwners(client);
    }

    function resetVariables() {
        setCoreInfo(getInitObject('Core'));
        setAlloyInfo(getInitObject('Alloy'));
        setIridInfo(getInitObject('Irid'));
        setLumeInfo(getInitObject('Lume'));
        setPrimeInfo(getInitObject('Prime'));
    }

    function addItem(type: 'Locker' | 'Gear', rarity: string, owner: string) {
        const isInventory = owner === inventoryAddress;
        const isLocker = type === 'Locker';
        switch(rarity) {
            case 'Core':
                setCoreInfo(i => ({
                    ...i, 
                    lockerOwners: (isInventory && isLocker) ? i.lockerOwners : i.lockerOwners.add(owner),
                    lockerCirculation: (isInventory && isLocker) ? i.lockerCirculation : (i.lockerCirculation + 1),
                    lockerInventory: (isInventory && isLocker) ? (i.lockerInventory + 1) : i.lockerInventory,
                    gearOwners: (isInventory && !isLocker) ? i.gearOwners : i.gearOwners.add(owner),
                    gearCirculation: (isInventory && !isLocker) ? i.gearCirculation : (i.gearCirculation + 1),
                    gearInventory: (isInventory && !isLocker) ? (i.gearInventory + 1) : i.gearInventory,
                    totalOwners: isInventory ? i.totalOwners : i.totalOwners.add(owner),
                }))
                break;
            case 'Alloy':
                setAlloyInfo(i => ({
                    ...i, 
                    lockerOwners: (isInventory && isLocker) ? i.lockerOwners : i.lockerOwners.add(owner),
                    lockerCirculation: (isInventory && isLocker) ? i.lockerCirculation : (i.lockerCirculation + 1),
                    lockerInventory: (isInventory && isLocker) ? (i.lockerInventory + 1) : i.lockerInventory,
                    gearOwners: (isInventory && !isLocker) ? i.gearOwners : i.gearOwners.add(owner),
                    gearCirculation: (isInventory && !isLocker) ? i.gearCirculation : (i.gearCirculation + 1),
                    gearInventory: (isInventory && !isLocker) ? (i.gearInventory + 1) : i.gearInventory,
                    totalOwners: isInventory ? i.totalOwners : i.totalOwners.add(owner),
                }))
                break;
            case 'Irid':
                setIridInfo(i => ({
                    ...i, 
                    lockerOwners: (isInventory && isLocker) ? i.lockerOwners : i.lockerOwners.add(owner),
                    lockerCirculation: (isInventory && isLocker) ? i.lockerCirculation : (i.lockerCirculation + 1),
                    lockerInventory: (isInventory && isLocker) ? (i.lockerInventory + 1) : i.lockerInventory,
                    gearOwners: (isInventory && !isLocker) ? i.gearOwners : i.gearOwners.add(owner),
                    gearCirculation: (isInventory && !isLocker) ? i.gearCirculation : (i.gearCirculation + 1),
                    gearInventory: (isInventory && !isLocker) ? (i.gearInventory + 1) : i.gearInventory,
                    totalOwners: isInventory ? i.totalOwners : i.totalOwners.add(owner),
                }))
                break;
            case 'Lume':
                setLumeInfo(i => ({
                    ...i, 
                    lockerOwners: (isInventory && isLocker) ? i.lockerOwners : i.lockerOwners.add(owner),
                    lockerCirculation: (isInventory && isLocker) ? i.lockerCirculation : (i.lockerCirculation + 1),
                    lockerInventory: (isInventory && isLocker) ? (i.lockerInventory + 1) : i.lockerInventory,
                    gearOwners: (isInventory && !isLocker) ? i.gearOwners : i.gearOwners.add(owner),
                    gearCirculation: (isInventory && !isLocker) ? i.gearCirculation : (i.gearCirculation + 1),
                    gearInventory: (isInventory && !isLocker) ? (i.gearInventory + 1) : i.gearInventory,
                    totalOwners: isInventory ? i.totalOwners : i.totalOwners.add(owner),
                }))
                break;
            case 'Prime':
                setPrimeInfo(i => ({
                    ...i, 
                    lockerOwners: (isInventory && isLocker) ? i.lockerOwners : i.lockerOwners.add(owner),
                    lockerCirculation: (isInventory && isLocker) ? i.lockerCirculation : (i.lockerCirculation + 1),
                    lockerInventory: (isInventory && isLocker) ? (i.lockerInventory + 1) : i.lockerInventory,
                    gearOwners: (isInventory && !isLocker) ? i.gearOwners : i.gearOwners.add(owner),
                    gearCirculation: (isInventory && !isLocker) ? i.gearCirculation : (i.gearCirculation + 1),
                    gearInventory: (isInventory && !isLocker) ? (i.gearInventory + 1) : i.gearInventory,
                    totalOwners: isInventory ? i.totalOwners : i.totalOwners.add(owner),
                }))
                break;
        }
    }

    async function getOwners(imxClient: ImmutableXClient) {
        let req_cursor = '';
        setLoadingAssets(true);
        resetVariables();
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
                const itemType = metadata.name.match('Locker') ? 'Locker' : 'Gear';
                const rarity = (itemType === 'Locker') ? metadata.name.split(' ')[0] : metadata.Type;

                setTotalOwners(t => t.add(asset.user as string));
                addItem(itemType, rarity, asset.user);

            }

            if (!res.remaining)
                break;
        }

        setLoadingAssets(false);
    }

    return (
        <div className="App">
            {loadingAssets ? <h2>LOADING ASSETS...</h2> : null}
            <button onClick={handleInitButtonClick}>Reload Items</button>
            <h3>Total Owners: {totalOwners.size}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Total Holders</th>
                        <th>Gear Holders</th>
                        <th>Gear Circulation</th>
                        <th>Gear Inventory</th>
                        <th>Locker Holders</th>
                        <th>Locker Circulation</th>
                        <th>Locker Inventory</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{background: '#fd6d30'}}>
                        <td>Prime</td>
                        <td>{primeInfo.totalOwners.size}</td>
                        <td>{primeInfo.gearOwners.size}</td>
                        <td>{primeInfo.gearCirculation}</td>
                        <td>{primeInfo.gearInventory}</td>
                        <td>{primeInfo.lockerOwners.size}</td>
                        <td>{primeInfo.lockerCirculation}</td>
                        <td>{primeInfo.lockerInventory}</td>
                    </tr>
                    <tr style={{background: '#e34ef0'}}>
                        <td>Lume</td>
                        <td>{lumeInfo.totalOwners.size}</td>
                        <td>{lumeInfo.gearOwners.size}</td>
                        <td>{lumeInfo.gearCirculation}</td>
                        <td>{lumeInfo.gearInventory}</td>
                        <td>{lumeInfo.lockerOwners.size}</td>
                        <td>{lumeInfo.lockerCirculation}</td>
                        <td>{lumeInfo.lockerInventory}</td>
                    </tr>
                    <tr style={{background: '#4b88fd'}}>
                        <td>Irid</td>
                        <td>{iridInfo.totalOwners.size}</td>
                        <td>{iridInfo.gearOwners.size}</td>
                        <td>{iridInfo.gearCirculation}</td>
                        <td>{iridInfo.gearInventory}</td>
                        <td>{iridInfo.lockerOwners.size}</td>
                        <td>{iridInfo.lockerCirculation}</td>
                        <td>{iridInfo.lockerInventory}</td>
                    </tr>
                    <tr style={{background: '#00e5ad'}}>
                        <td>Alloy</td>
                        <td>{alloyInfo.totalOwners.size}</td>
                        <td>{alloyInfo.gearOwners.size}</td>
                        <td>{alloyInfo.gearCirculation}</td>
                        <td>{alloyInfo.gearInventory}</td>
                        <td>{alloyInfo.lockerOwners.size}</td>
                        <td>{alloyInfo.lockerCirculation}</td>
                        <td>{alloyInfo.lockerInventory}</td>
                    </tr>
                    <tr style={{background: ''}}>
                        <td>Core</td>
                        <td>{coreInfo.totalOwners.size}</td>
                        <td>{coreInfo.gearOwners.size}</td>
                        <td>{coreInfo.gearCirculation}</td>
                        <td>{coreInfo.gearInventory}</td>
                        <td>{coreInfo.lockerOwners.size}</td>
                        <td>{coreInfo.lockerCirculation}</td>
                        <td>{coreInfo.lockerInventory}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
