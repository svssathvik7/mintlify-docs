import React, { useEffect, useState } from "react";

export const AssetRow = ({ chain, assets }) => {
  return (
    <tr>
      <td className="flex items-center gap-2">
        <img src={chain.icon} width="20" alt={chain.chain} />
        <strong>{chain.chain}</strong>
      </td>
      <td colSpan={4}>
        <div className="flex gap-4 flex-wrap">
          {assets.map((asset, i) => (
            <a
              key={i}
              href={asset.htlc} // using htlc instead of contract, since your data uses `htlc`
              className="border-none flex items-center gap-1"
            >
              <img src={asset.icon} width={20} alt={asset.id} />
              <span>{asset.id}</span>
            </a>
          ))}
        </div>
      </td>
    </tr>
  );
};

export const SupportedAssets = () => {
  const [supportedAssetsConfig, setSupportedAssetsConfig] = useState([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("https://api.garden.finance/v2/chains");
        const data = await response.json();
        console.log("response", data.result);
        setSupportedAssetsConfig(data.result);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr>
          <th>Chain</th>
          <th colSpan="4">Asset HTLCs</th>
        </tr>
      </thead>
      <tbody>
        {supportedAssetsConfig.map((chainConfig, i) => (
          <AssetRow
            key={i}
            chain={{ chain: chainConfig.chain, icon: chainConfig.icon }}
            assets={chainConfig.assets}
          />
        ))}
      </tbody>
    </table>
  );
};
