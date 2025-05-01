// Example integration in your FundResearchPortal.js component
import { useState, useEffect } from "react";
import { Search, Filter, ArrowUpDown, Download, PieChart, TrendingUp, BarChart2, Percent, DollarSign, AlertTriangle, Globe, ChevronDown, ChevronUp } from "lucide-react";
import api from "../services/api";

export default function FundResearchPortal() {
  const [activeTab, setActiveTab] = useState("comparison");
  const [selectedFund, setSelectedFund] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [funds, setFunds] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch funds data
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        const data = await api.fund.getAllFunds();
        setFunds(data.funds);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch funds data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchFunds();
  }, []);

  // Fetch indices data
  useEffect(() => {
    const fetchIndices = async () => {
      try {
        const data = await api.index.getAllIndices();
        setIndices(data);
      } catch (err) {
        console.error('Failed to fetch indices data', err);
      }
    };

    if (activeTab === 'indices') {
      fetchIndices();
    }
  }, [activeTab]);

  // Fetch holdings when a fund is selected
  useEffect(() => {
    const fetchHoldings = async () => {
      if (!selectedFund) return;
      
      try {
        const data = await api.holding.getHoldingsByFundId(selectedFund._id);
        setHoldings(data.holdings);
      } catch (err) {
        console.error('Failed to fetch holdings data', err);
      }
    };

    if (activeTab === 'holdings' && selectedFund) {
      fetchHoldings();
    }
  }, [activeTab, selectedFund]);

  // Sort function remains the same
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedFunds = [...funds].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    let aValue, bValue;
    
    if (sortConfig.key.includes('.')) {
      const [parentKey, childKey] = sortConfig.key.split('.');
      aValue = a[parentKey][childKey];
      bValue = b[parentKey][childKey];
    } else {
      aValue = a[sortConfig.key];
      bValue = b[sortConfig.key];
    }
    
    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={14} className="ml-1 text-gray-400" />;
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp size={14} className="ml-1 text-blue-600" />
      : <ChevronDown size={14} className="ml-1 text-blue-600" />;
  };

  // Rest of your component remains the same...
}
