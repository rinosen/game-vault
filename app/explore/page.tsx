import Link from "next/link";

interface DealGame {
  internalName: string;
  title: string;
  thumb: string;     
  steamAppID: string;
  salePrice: string;
  normalPrice: string;
  steamRatingPercent: string;
  dealID: string;
}

async function getGameDeals() {
  const res = await fetch(
    'https://www.cheapshark.com/api/1.0/deals?storeID=1&sortBy=Metacritic&pageSize=120', 
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error('Gagal mengambil data dari CheapShark');
  }

  return res.json();
}

export default async function ExplorePage() {
  const games: DealGame[] = await getGameDeals();
  const getHighResImage = (steamAppID: string, thumb: string) => {
    if(steamAppID) {
      return `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${steamAppID}/header.jpg`;
    }
    return thumb;
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2>Game Deals Tracker</h2>
          <p className="text-muted">Powered by CheapShark API (No Key Required)</p>
        </div>
        <Link href="/" className="btn btn-outline-secondary">Back Home</Link>
      </div>

      <div className="row">
        {games.map((game) => (
          <div key={game.dealID} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img 
                src={getHighResImage(game.steamAppID, game.thumb)} 
                className="card-img-top" 
                alt={game.title}
                style={{ height: "160px", objectFit: "cover" }} 
              />
              
              <div className="card-body">
                <h5 className="card-title text-truncate" title={game.title}>
                  {game.title}
                </h5>
                
                <div className="mb-2">
                  <span className="badge bg-success me-2">-{Math.round(100 - (parseFloat(game.salePrice)/parseFloat(game.normalPrice)*100))}%</span>
                  <span className="fw-bold">${game.salePrice}</span>
                  <span className="text-muted text-decoration-line-through ms-2" style={{fontSize: '0.9em'}}>
                    ${game.normalPrice}
                  </span>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-muted">
                    Steam Rating: <span className="text-primary fw-bold">{game.steamRatingPercent}%</span>
                  </small>
                  
                  <a 
                    href={`https://store.steampowered.com/app/${game.steamAppID}`} 
                    target="_blank" 
                    className="btn btn-sm btn-outline-primary"
                  >
                    View on Steam
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}