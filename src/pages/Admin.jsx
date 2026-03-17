import React, { useState } from 'react';
import { useData } from '../context/DataContext';

const Admin = () => {
  const { data, updateData, resetData } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('projects'); // Defaulting to projects to see the new feature
  
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
      window.location.reload();
    }
  };

  // Helper for complex array fields
  const handleArrayItemChange = (index, field, value) => {
    const newArray = [...editData[activeTab]];
    if (activeTab === 'projects' && field === 'tech') {
      newArray[index] = { ...newArray[index], [field]: value.split(',').map(s => s.trim()) };
    } else {
      newArray[index] = { ...newArray[index], [field]: value };
    }
    setEditData({ ...editData, [activeTab]: newArray });
  };

  const handleAddItem = () => {
    const newItem = activeTab === 'projects' 
      ? { id: Date.now(), title: "New Project", category: "", image: "", tech: [], color: "#ffffff", demoLink: "", githubLink: "" }
      : { role: "New Role", company: "", period: "", description: "" };
      
    setEditData({ ...editData, [activeTab]: [...editData[activeTab], newItem] });
  };

  const handleRemoveItem = (index) => {
    const newArray = editData[activeTab].filter((_, i) => i !== index);
    setEditData({ ...editData, [activeTab]: newArray });
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      // Very basic size check for localStorage (approx 2MB limit recommended per item)
      if (file.size > 2 * 1024 * 1024) { 
        alert("Image is large. Consider a smaller image or enter a URL, as it's saved in browser storage which has a 5MB total limit.");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        handleArrayItemChange(index, 'image', reader.result);
      };
      reader.readAsDataURL(file);
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
    <div className="min-h-screen bg-background text-foreground pt-24 px-6 md:px-12 pb-24 lg:h-screen lg:overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <div className="flex justify-between items-center mb-8 shrink-0">
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

        <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
          {/* Sidebar */}
          <div className="lg:w-1/4 flex flex-col gap-2 shrink-0">
            {Object.keys(data).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`text-left px-4 py-3 rounded-lg capitalize font-medium transition-colors ${
                  activeTab === key ? 'bg-primary text-white' : 'glass hover:bg-white/10 text-gray-400'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Editor Area */}
          <div className="lg:w-3/4 glass p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col min-h-0 overflow-y-auto custom-scrollbar">
            <h2 className="text-2xl font-bold mb-6 capitalize border-b border-white/10 pb-4 shrink-0 flex justify-between items-center">
              <span>{activeTab} Section</span>
              <button 
                onClick={handleSave}
                className="bg-primary text-white font-bold text-sm rounded-lg px-6 py-2 hover:bg-primary/80 transition-colors"
              >
                Save Changes
              </button>
            </h2>
            
            <div className="flex-1">
              {!Array.isArray(editData[activeTab]) ? (
                // Render object (Hero, About, Footer)
                <div className="flex flex-col gap-4">
                  {Object.keys(editData[activeTab]).map(field => (
                    <div key={field} className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-400 capitalize bg-transparent">{field}</label>
                      {editData[activeTab][field].length > 50 || field.includes('desc') ? (
                        <textarea 
                          rows={4}
                          value={editData[activeTab][field]}
                          onChange={(e) => setEditData({
                            ...editData,
                            [activeTab]: { ...editData[activeTab], [field]: e.target.value }
                          })}
                          className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white resize-y"
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
                  ))}
                </div>
              ) : activeTab === 'skills' ? (
                // Render skills array
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-400">Skills (Comma separated)</label>
                  <textarea 
                    rows={6}
                    value={editData.skills.join(', ')}
                    onChange={(e) => setEditData({
                      ...editData,
                      skills: e.target.value.split(',').map(s => s.trim())
                    })}
                    className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate skills with a comma. E.g: React, Node.js, Tailwind</p>
                </div>
              ) : (
                // Render arrays of objects (Projects, Experience)
                <div className="flex flex-col gap-8 pb-8">
                  {editData[activeTab].map((item, index) => (
                    <div key={index} className="bg-black/30 p-4 md:p-6 rounded-xl border border-white/10 relative group">
                      <button 
                        onClick={() => handleRemoveItem(index)}
                        className="absolute top-4 right-4 px-3 py-1 bg-red-500/10 text-red-400 rounded hover:bg-red-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300"
                        title="Remove Item"
                      >
                        Delete
                      </button>
                      
                      <h3 className="font-bold text-lg mb-6 text-primary border-b border-white/5 pb-2">
                        {activeTab === 'projects' ? `Project: ${item.title || 'Untitled'}` : `Experience: ${item.role || 'New Role'}`}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.keys(item).filter(k => k !== 'id').map(field => (
                          <div key={field} className={field === 'description' || field === 'image' ? 'md:col-span-2' : ''}>
                            <label className="text-xs font-semibold tracking-wider text-gray-400 uppercase block mb-2">
                              {field}
                            </label>
                            
                            {field === 'image' ? (
                              <div className="flex flex-col md:flex-row gap-4 items-start bg-black/50 p-4 rounded-lg border border-white/10">
                                {item[field] && (
                                  <div className="w-full md:w-1/3 shrink-0 rounded overflow-hidden border border-white/20 aspect-video relative group/img">
                                    <img src={item[field]} alt="preview" className="w-full h-full object-cover" />
                                  </div>
                                )}
                                <div className="flex-1 w-full space-y-3">
                                  <div>
                                    <label className="block text-xs text-primary mb-1">1. Upload Image File</label>
                                    <input 
                                      type="file" 
                                      accept="image/*"
                                      onChange={(e) => handleImageUpload(index, e)}
                                      className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer"
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 h-px bg-white/10"></div>
                                    <span className="text-xs text-gray-500 uppercase font-bold">OR</span>
                                    <div className="flex-1 h-px bg-white/10"></div>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-primary mb-1">2. Paste Image URL</label>
                                    <input 
                                      type="text"
                                      placeholder="https://..."
                                      value={item[field].startsWith('data:image') ? 'Uploaded natively via Base64' : item[field]}
                                      onChange={(e) => !item[field].startsWith('data:image') && handleArrayItemChange(index, field, e.target.value)}
                                      disabled={item[field].startsWith('data:image')}
                                      className="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-sm text-white disabled:opacity-50"
                                    />
                                    {item[field].startsWith('data:image') && (
                                       <button onClick={() => handleArrayItemChange(index, field, "")} className="text-xs text-red-400 mt-2 hover:underline">Clear uploaded image</button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : field === 'description' ? (
                              <textarea 
                                rows={4}
                                value={item[field]}
                                onChange={(e) => handleArrayItemChange(index, field, e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white leading-relaxed resize-y"
                              />
                            ) : field === 'tech' ? (
                              <div>
                                <input 
                                  type="text"
                                  value={Array.isArray(item[field]) ? item[field].join(', ') : item[field]}
                                  onChange={(e) => handleArrayItemChange(index, field, e.target.value)}
                                  className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                                />
                                <p className="text-xs text-gray-500 mt-1">Comma separated</p>
                              </div>
                            ) : field === 'color' ? (
                              <div className="flex items-center gap-3 bg-black/50 border border-white/20 rounded-lg px-4 py-2">
                                <input 
                                  type="color"
                                  value={item[field]}
                                  onChange={(e) => handleArrayItemChange(index, field, e.target.value)}
                                  className="w-8 h-8 rounded shrink-0 cursor-pointer border-0 p-0 bg-transparent"
                                />
                                <input 
                                  type="text"
                                  value={item[field]}
                                  onChange={(e) => handleArrayItemChange(index, field, e.target.value)}
                                  className="flex-1 bg-transparent border-none outline-none text-white text-sm"
                                />
                              </div>
                            ) : (
                              <input 
                                type="text"
                                value={item[field]}
                                onChange={(e) => handleArrayItemChange(index, field, e.target.value)}
                                className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-primary text-white"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={handleAddItem}
                    className="w-full py-6 mt-4 border-2 border-dashed border-white/20 rounded-xl text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all font-medium flex items-center justify-center gap-2 group"
                  >
                    <span className="text-2xl group-hover:scale-125 transition-transform">+</span> 
                    Add New {activeTab === 'projects' ? 'Project' : 'Experience'}
                  </button>
                </div>
              )}
            </div>
            
            {/* Added style here for custom scrollbar in admin area so it looks good next to the form elements */}
            <style jsx="true">{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
                border-radius: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.3);
              }
            `}</style>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
