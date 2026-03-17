import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Admin = () => {
  const { data, updateData, resetData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  
  // Local state for edits
  const [editData, setEditData] = useState(data);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'thoyyib123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleSave = () => {
    updateData(activeTab, editData[activeTab]);
    alert(`${activeTab.toUpperCase()} section saved successfully!`);
  };

  const handleReset = () => {
    if(window.confirm('Are you sure you want to reset all modifications to default?')) {
      resetData();
      setEditData(data); // Will still show old data until refresh, let's force a reload:
      window.location.reload();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6 text-foreground">
        <form onSubmit={handleLogin} className="glass p-8 rounded-2xl w-full max-w-md border border-white/10">
          <h2 className="text-2xl font-bold mb-6 text-center text-primary">Admin Access</h2>
          {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Admin Password"
            className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-primary text-white"
          />
          <button type="submit" className="w-full bg-primary text-white font-bold rounded-lg px-4 py-3 hover:bg-primary/80 transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 px-6 md:px-12 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gradient-primary">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button onClick={handleReset} className="px-4 py-2 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors">
              Reset to Defaults
            </button>
            <button onClick={() => window.open('/', '_blank')} className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
              View Site
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4 flex flex-col gap-2">
            {Object.keys(data).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-4 py-3 rounded-lg capitalize font-medium transition-colors ${
                  activeTab === key ? 'bg-primary text-white' : 'glass hover:bg-white/10 text-gray-400 text-white'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="md:w-3/4 glass p-8 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold mb-6 capitalize border-b border-white/10 pb-4">{activeTab} Section</h2>
            
            <div className="flex flex-col gap-4">
              {/* Dynamic form rendering based on activeTab data type */}
              {!Array.isArray(editData[activeTab]) ? (
                // Render object (Hero, About, Footer)
                Object.keys(editData[activeTab]).map(field => (
                  <div key={field} className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-400 capitalize bg-transparent">{field}</label>
                    {editData[activeTab][field].length > 50 ? (
                      <textarea 
                        rows={4}
                        value={editData[activeTab][field]}
                        onChange={(e) => setEditData({
                          ...editData,
                          [activeTab]: { ...editData[activeTab], [field]: e.target.value }
                        })}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                      />
                    ) : (
                      <input 
                        type="text"
                        value={editData[activeTab][field]}
                        onChange={(e) => setEditData({
                          ...editData,
                          [activeTab]: { ...editData[activeTab], [field]: e.target.value }
                        })}
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                      />
                    )}
                  </div>
                ))
              ) : activeTab === 'skills' ? (
                // Render skills array
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Skills (Comma separated)</label>
                  <textarea 
                    rows={4}
                    value={editData.skills.join(', ')}
                    onChange={(e) => setEditData({
                      ...editData,
                      skills: e.target.value.split(',').map(s => s.trim())
                    })}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                  />
                </div>
              ) : (
                // Render arrays of objects (Projects, Experience)
                <p className="text-gray-400 italic">Advanced editing for Arrays (Projects/Experience) in admin UI is complex for this iteration. Edit the JSON directly below.</p>
              )}

              {Array.isArray(editData[activeTab]) && activeTab !== 'skills' && (
                <textarea 
                  rows={15}
                  value={JSON.stringify(editData[activeTab], null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setEditData({ ...editData, [activeTab]: parsed });
                    } catch (err) {
                      // Let them type invalid JSON temporarily, but maybe show an error in a real app
                    }
                  }}
                  className="w-full font-mono text-sm bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-primary"
                />
              )}
            </div>

            <button 
              onClick={handleSave}
              className="mt-8 bg-primary text-white font-bold rounded-lg px-8 py-3 hover:bg-primary/80 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
