import React, { useState, useEffect } from 'react';
import { PieChart, Pie, BarChart, Bar, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, Label } from 'recharts';
import './App.css';

// Initial JSON data with chart configs for visuals
const initialData = {
  allWidgets: [
    // CSPM Executive Dashboard widgets
    {
      id: 1,
      name: 'Cloud Accounts',
      chartType: 'pie',
      chartData: [
        { name: 'Connected', value: 2, fill: '#3b82f6' },
        { name: 'Not Connected', value: 20, fill: '#9ca3af' }
      ],
      centerValue: 2,
      total: 22,
      text: 'Fallback random text if no chart'
    },
    {
      id: 2,
      name: 'Cloud Risk Assessment',
      chartType: 'pie',
      chartData: [
        { name: 'Failed', value: 959, fill: '#ef4444', percent: '10%' },
        { name: 'Warning', value: 1918, fill: '#f59e0b', percent: '20%' },
        { name: 'Passed', value: 6582, fill: '#10b981', percent: '70%' }
      ],
      centerValue: 9559,
      text: 'Fallback random text if no chart'
    },
    // CWPP Dashboard widgets
    {
      id: 3,
      name: 'Top 5 Namespace Specific Alerts',
      text: 'No graph available'
    },
    {
      id: 4,
      name: 'Workload Alerts',
      text: 'No graph available'
    },
    {
      id: 5,
      name: 'Registry Scan',
      subheader: 'Risk Assessment',
      chartType: 'bar-horizontal',
      chartData: [
        { name: 'Low', value: 475, fill: '#10b981' },
        { name: 'Medium', value: 0, fill: '#f59e0b' },
        { name: 'High', value: 0, fill: '#ef4444' }
      ],
      totalScans: 475,
      text: 'Fallback random text if no chart'
    },
    {
      id: 6,
      name: 'Image Security Issues',
      subheader: '2 images',
      chartType: 'bar-horizontal',
      chartData: [
        { name: 'Critical', value: 0, fill: '#dc2626' },
        { name: 'High', value: 2, fill: '#ef4444' },
        { name: 'Medium', value: 0, fill: '#f59e0b' }
      ],
      text: 'Fallback random text if no chart'
    }
  ],
  categories: [
    {
      name: 'CSPM Executive Dashboard',
      widgetIds: [1, 2]
    },
    {
      name: 'CWPP Dashboard',
      widgetIds: [3, 4, 5, 6]
    }
  ]
};

function App() {
  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [filteredWidgets, setFilteredWidgets] = useState(data.allWidgets);

  useEffect(() => {
    const saved = localStorage.getItem('dashboardData');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboardData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const filtered = data.allWidgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (widget.text && widget.text.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredWidgets(filtered);
  }, [searchTerm, data.allWidgets]);

  const addWidgetToCategory = (widgetId, categoryName) => {
    setData(prev => {
      const category = prev.categories.find(cat => cat.name === categoryName);
      if (category && !category.widgetIds.includes(widgetId)) {
        category.widgetIds.push(widgetId);
      }
      return { ...prev, categories: [...prev.categories] };
    });
  };

  const removeWidgetFromCategory = (widgetId, categoryName) => {
    setData(prev => {
      const category = prev.categories.find(cat => cat.name === categoryName);
      if (category) {
        category.widgetIds = category.widgetIds.filter(id => id !== widgetId);
      }
      return { ...prev, categories: [...prev.categories] };
    });
  };

  const createNewWidget = () => {
    if (!newWidget.name || !newWidget.text) return;
    const id = Date.now();
    const widget = { id, name: newWidget.name, text: newWidget.text }; // New widgets default to text, no chart
    setData(prev => ({
      ...prev,
      allWidgets: [...prev.allWidgets, widget]
    }));
    addWidgetToCategory(id, selectedCategory);
    setNewWidget({ name: '', text: '' });
    setShowAddModal(false);
  };

  const updateCategoryAssignment = (widgetId, categoryName, assigned) => {
    setData(prev => {
      const category = prev.categories.find(cat => cat.name === categoryName);
      if (category) {
        if (assigned && !category.widgetIds.includes(widgetId)) {
          category.widgetIds.push(widgetId);
        } else if (!assigned) {
          category.widgetIds = category.widgetIds.filter(id => id !== widgetId);
        }
      }
      return { ...prev, categories: [...prev.categories] };
    });
  };

  const renderWidgetContent = (widget) => {
    if (!widget.chartType && widget.text) {
      return <p>{widget.text}</p>;
    }

    if (widget.chartType === 'pie') {
      return (
        <div className="chart-container">
          {widget.total && <div className="total-label">Total: {widget.total}</div>}
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={widget.chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
              >
                {widget.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
              <Label
                content={(props) => {
                  const { viewBox } = props;
                  const { cx, cy } = viewBox;
                  return (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      dy={10}
                      dominantBaseline="central"
                      className="center-label"
                    >
                      {widget.centerValue}
                    </text>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (widget.chartType === 'bar-horizontal') {
      return (
        <div className="chart-container">
          {widget.subheader && <div className="subheader">{widget.subheader}</div>}
          {widget.totalScans && <div className="total-label">Total: {widget.totalScans}</div>}
          <ResponsiveContainer width="100%" height={150}>
            <BarChart layout="vertical" data={widget.chartData}>
              <XAxis type="number" hide />
              <YAxis type="category" dataKey="name" />
              <Bar dataKey="value">
                {widget.chartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.fill} />
                ))}
              </Bar>
              <Tooltip />
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return <p>{widget.text}</p>;
  };

  return (
    <div className="App">
      <header className="dashboard-header">
        <h1>CNAPP Dashboard</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button onClick={() => setShowManageModal(true)} className="manage-btn">Add Widget</button>
        </div>
      </header>

      <div className="categories-container">
        {data.categories.map((category) => (
          <section key={category.name} className="category-section">
            <div className="category-header">
              <h2>{category.name}</h2>
              <button
                onClick={() => {
                  setSelectedCategory(category.name);
                  setShowAddModal(true);
                }}
                className="add-widget-btn"
              >
                + Add Widget
              </button>
            </div>
            <div className="widgets-grid">
              {category.widgetIds.map((widgetId) => {
                const widget = data.allWidgets.find(w => w.id === widgetId);
                if (!widget) return null;
                return (
                  <div key={widget.id} className="widget">
                    <div className="widget-header">
                      <h3>{widget.name}</h3>
                      <button
                        onClick={() => removeWidgetFromCategory(widget.id, category.name)}
                        className="remove-btn"
                        title="Remove from category"
                      >
                        ×
                      </button>
                    </div>
                    <div className="widget-content">
                      {renderWidgetContent(widget)}
                    </div>
                  </div>
                );
              })}
              {category.widgetIds.length === 0 && (
                <p className="empty-state">No widgets in this category. Add one using + Add Widget.</p>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Add Widget Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Widget to {selectedCategory}</h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) => setNewWidget({ ...newWidget, name: e.target.value })}
            />
            <textarea
              placeholder="Widget Text (random content for demo)"
              value={newWidget.text}
              onChange={(e) => setNewWidget({ ...newWidget, text: e.target.value })}
              rows={4}
            />
            <div className="modal-buttons">
              <button onClick={() => setShowAddModal(false)}>Cancel</button>
              <button onClick={createNewWidget}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Widgets Modal */}
      {showManageModal && (
        <div className="modal-overlay">
          <div className="modal large-modal">
            <h3>Manage All Widgets (Search: "{searchTerm}")</h3>
            <p>Check/uncheck to assign/remove from categories.</p>
            <ul className="widgets-list">
              {filteredWidgets.length > 0 ? (
                filteredWidgets.map((widget) => (
                  <li key={widget.id} className="manage-widget-item">
                    <div className="widget-info">
                      <strong>{widget.name}</strong>
                      <p>{(widget.text || 'Chart widget').substring(0, 100)}...</p>
                    </div>
                    <div className="category-checkboxes">
                      {data.categories.map((cat) => (
                        <label key={cat.name}>
                          <input
                            type="checkbox"
                            checked={cat.widgetIds.includes(widget.id)}
                            onChange={(e) => updateCategoryAssignment(widget.id, cat.name, e.target.checked)}
                          />
                          {cat.name}
                        </label>
                      ))}
                    </div>
                  </li>
                ))
              ) : (
                <p>No widgets match the search. Clear search to see all.</p>
              )}
            </ul>
            <button onClick={() => setShowManageModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;