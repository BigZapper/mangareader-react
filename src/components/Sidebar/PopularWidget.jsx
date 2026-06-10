import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { popularRanked } from '../../data/mockData';

const tabs = ['weekly', 'monthly', 'alltime'];

export default function PopularWidget() {
  const [activeTab, setActiveTab] = useState('weekly');
  const items = popularRanked[activeTab] || [];

  return (
    <div className="bg-th-surface rounded-lg p-4">
      <h3 className="text-th-text font-semibold text-sm mb-3 flex items-center gap-2">
        <span className="w-1 h-4 bg-[#366ad3] rounded-full block" />
        Popular
      </h3>

      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 text-xs py-1 rounded capitalize transition-colors ${
              activeTab === tab
                ? 'bg-[#366ad3] text-white'
                : 'bg-th-card text-th-muted hover:text-th-text'
            }`}
          >
            {tab === 'alltime' ? 'All' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-2">
        {items.map(item => (
          <Link
            key={item.rank}
            to={`/manga/${item.slug}`}
            className="flex items-center gap-2 group"
          >
            <span className={`w-6 h-6 flex items-center justify-center text-xs font-bold rounded shrink-0 ${
              item.rank <= 3 ? 'bg-[#366ad3] text-white' : 'bg-th-card text-th-muted'
            }`}>
              {item.rank}
            </span>
            <img src={item.cover} alt={item.title} className="w-8 h-10 object-cover rounded shrink-0" loading="lazy" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-th-text group-hover:text-[#366ad3] transition-colors line-clamp-1 font-medium">
                {item.title}
              </p>
              <p className="text-[10px] text-th-dim flex items-center gap-0.5">
                <FaStar size={8} className="text-[#f90]" /> {item.rating}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
