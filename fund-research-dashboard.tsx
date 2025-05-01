import { useState } from "react";
import { Download, ChevronDown } from "lucide-react";

// Mock Data
const funds = [
  {
    id: 1,
    name: "Vanguard 500 Index Inv",
    category: "Large Growth",
    country: "United States",
    return5Y: 17.3,
    expenseRatio: 0.14,
    marketCap: "$349.5B"
  },
  {
    id: 2,
    name: "iShares MSCI India ETF",
    category: "India Equity",
    country: "India",
    return5Y: -3.6,
    expenseRatio: 0.69,
    marketCap: "$9.1B"
  },
  {
    id: 3,
    name: "Fidelity US Bond Index",
    category: "Intermed-Term Carn",
    country: "United States",
    return5Y: 0.9,
    expenseRatio: 0.025,
    marketCap: "$63.4B"
  },
  {
    id: 4,
    name: "SPDR Gold Shares",
    category: "Specialty",
    country: "United States",
    return5Y: 9.5,
    expenseRatio: 0.40,
    marketCap: "$59.5B"
  }
];

const holdings = [
  { name: "Microsoft Corp", percent: 7.1, sector: "Technology", return1Y: 12.7 },
  { name: "Apple Inc.", percent: 5.8, sector: "Technology", return1Y: 21.3 },
  { name: "Amazon.com Inc", percent: 3.8, sector: "Consumer Cyclical", return1Y: 13.0 },
  { name: "NVIDIA Corp", percent: 3.2, sector: "Technology", return1Y: 93.8 }
];

const indices = [
  { 
    name: "S&P 500", 
    value: "5,125.51", 
    change: -93.61, 
    percentChange: -1.73,
    chartData: "M5 10 L15 5 L25 8 L35 7 L45 9 L55 6 L65 8 L75 7 L85 5 L95 3"
  },
  { 
    name: "Nifty 50", 
    value: "22,212.70", 
    change: 124.95, 
    percentChange: 0.57,
    chartData: "M5 7 L15 8 L25 6 L35 9 L45 7 L55 8 L65 5 L75 6 L85 4 L95 5"
  },
  { 
    name: "NASDAQ", 
    value: "15,849.31", 
    change: -231.72, 
    percentChange: -1.44,
    chartData: "M5 5 L15 7 L25 6 L35 8 L45 7 L55 9 L65 8 L75 10 L85 9 L95 10"
  },
  { 
    name: "FTSE 100", 
    value: "7,995.58", 
    change: -55.57, 
    percentChange: -0.89,
    chartData: "M5 6 L15 7 L25 8 L35 6 L45 7 L55 6 L65 8 L75 7 L85 8 L95 9"
  },
  { 
    name: "DAX", 
    value: "17,767.52", 
    change: -488.65, 
    percentChange: -2.78,
    chartData: "M5 5 L15 6 L25 7 L35 8 L45 6 L55 7 L65 8 L75 9 L85 10 L95 11"
  },
  { 
    name: "Nikkei 225", 
    value: "37,552.16", 
    change: -976.49, 
    percentChange: -2.53,
    chartData: "M5 5 L15 4 L25 5 L35 3 L45 4 L55 2 L65 3 L75 5 L85 6 L95 8"
  },
  { 
    name: "CAC 40", 
    value: "8,140.70", 
    change: -111.72, 
    percentChange: -1.38,
    chartData: "M5 6 L15 5 L25 7 L35 8 L45 9 L55 10 L65 8 L75 9 L85 10 L95 11"
  },
  { 
    name: "Shanghai Composite", 
    value: "3,083.50", 
    change: 28.54, 
    percentChange: 0.85,
    chartData: "M5 8 L15 7 L25 8 L35 6 L45 5 L55 6 L65 5 L75 6 L85 5 L95 4"
  }
];

export default function FundResearchDashboard() {
  const [showHoldings, setShowHoldings] = useState(false);
  const [selectedFund, setSelectedFund] = useState(null);

  const toggleHoldings = (fund) => {
    if (selectedFund && selectedFund.id === fund.id) {
      setShowHoldings(!showHoldings);
    } else {
      setSelectedFund(fund);
      setShowHoldings(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-gray-900 text-white p-6">
        <h1 className="text-2xl font-bold text-center">ETF & Mutual Fund Research & Comparison Portal</h1>
      </header>
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fund Holdings Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Fund Holdings</h2>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="border rounded p-2 flex items-center">
                <span>Category</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              <div className="border rounded p-2 flex items-center">
                <span>Country / Region</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              <div className="border rounded p-2 flex items-center">
                <span>Returns (5Y)</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              <div className="border rounded p-2 flex items-center">
                <span>Market Cap</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
              <div className="border rounded p-2 flex items-center">
                <span>Risk</span>
                <ChevronDown size={16} className="ml-2" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Fund</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Category</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Country / Region</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">5Y Return</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Expense Ratio</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {funds.map((fund) => (
                    <tr key={fund.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleHoldings(fund)}>
                      <td className="py-3 px-4">{fund.name}</td>
                      <td className="py-3 px-4">{fund.category}</td>
                      <td className="py-3 px-4">{fund.country}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded ${fund.return5Y >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {fund.return5Y >= 0 ? '+' : ''}{fund.return5Y}%
                        </span>
                      </td>
                      <td className="py-3 px-4">{fund.marketCap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {showHoldings && selectedFund && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">
                    Full Holdings
                  </button>
                  <button className="flex items-center text-blue-600 hover:text-blue-800">
                    <Download size={16} className="mr-1" /> Download CSV
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Holding</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">% of Assets</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Sector</th>
                        <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">1Y Return</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {holdings.map((holding, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{holding.name}</td>
                          <td className="py-3 px-4">{holding.percent}%</td>
                          <td className="py-3 px-4">{holding.sector}</td>
                          <td className="py-3 px-4">{holding.return1Y}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          
          {/* Global Market Indices Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Global Market Indices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {indices.map((index, i) => (
                <div key={i} className="bg-white p-4 rounded-lg shadow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold">{index.name}</h3>
                    <div className="text-right">
                      <div className="text-xl font-semibold">{index.value}</div>
                      <div className={`flex items-center ${index.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        <span>{index.change >= 0 ? '+' : ''}{index.change}</span>
                        <span className="ml-1">{index.change >= 0 ? '+' : ''}{index.percentChange}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-2 h-12">
                    <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none" className="overflow-visible">
                      <path
                        d={index.chartData}
                        fill="none"
                        stroke={index.change >= 0 ? "#16a34a" : "#dc2626"}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
