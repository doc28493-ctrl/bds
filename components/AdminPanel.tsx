import React, { useState, useEffect, useCallback } from 'react';
import { useContent } from '../context/ContentContext';
import { 
  X, Save, RotateCcw, Lock, ChevronRight, ChevronDown, 
  Image as ImageIcon, Type, LogOut, Plus, Trash2, 
  Layout, ExternalLink, CloudUpload, Settings, Check, Loader2, AlertTriangle, Copy,
  Zap, Eye, EyeOff
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper: Check if string is an image URL
const isImageUrl = (url: string) => {
    if (typeof url !== 'string') return false;
    return url.match(/^http/) && (url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.includes('images.unsplash.com') || url.includes('imgur'));
};

const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { content, updateContent, resetContent, publishContent } = useContent();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tempContent, setTempContent] = useState<any>(content);
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [expandedArrays, setExpandedArrays] = useState<{[key: string]: boolean}>({});
  const [publishStatus, setPublishStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // New States for Live Preview
  const [isLivePreview, setIsLivePreview] = useState(true); // Default to Live
  const [isHidden, setIsHidden] = useState(false); // Hide panel to see site

  // Sync when opening
  useEffect(() => {
    if (isOpen) setTempContent(JSON.parse(JSON.stringify(content)));
  }, [isOpen, content]);

  // Live Preview Logic: Auto-update context when tempContent changes
  useEffect(() => {
      if (!isLivePreview || !isAuthenticated) return;

      // Debounce to prevent performance issues during rapid typing
      const handler = setTimeout(() => {
          updateContent(tempContent);
      }, 200);

      return () => clearTimeout(handler);
  }, [tempContent, isLivePreview, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Mật khẩu sai! Gợi ý: admin');
    }
  };

  const handleSaveLocal = () => {
    updateContent(tempContent);
    alert('Đã lưu cục bộ (Local). Dữ liệu này chỉ hiển thị trên trình duyệt của bạn.');
  };

  const handlePublish = async () => {
      const url = tempContent.config?.googleSheetUrl;
      if (!url) {
          alert("Vui lòng nhập Google Web App URL trong tab 'Cấu hình' trước khi xuất bản.");
          setActiveTab('config');
          return;
      }

      setPublishStatus('loading');
      
      // 1. Save local first
      updateContent(tempContent);
      
      // 2. Push to cloud
      try {
          const startTime = Date.now();
          
          const success = await publishContent(tempContent);
          
          const elapsedTime = Date.now() - startTime;
          const minTime = 1000; 
          
          if (elapsedTime < minTime) {
              await new Promise(resolve => setTimeout(resolve, minTime - elapsedTime));
          }

          if (success) {
              setPublishStatus('success');
              setTimeout(() => setPublishStatus('idle'), 3000); 
          } else {
              setPublishStatus('error');
              setTimeout(() => setPublishStatus('idle'), 5000);
          }
      } catch (error) {
          console.error(error);
          setPublishStatus('error');
          setTimeout(() => setPublishStatus('idle'), 5000);
      }
  };

  const handleReset = () => {
    if (confirm('CẢNH BÁO: Hành động này sẽ khôi phục toàn bộ nội dung về mặc định ban đầu. Bạn có chắc chắn không?')) {
      resetContent();
      setTempContent(content); 
      window.location.reload();
    }
  };

  const copyToClipboard = (text: string) => {
      navigator.clipboard.writeText(text);
      alert("Đã sao chép mã!");
  };

  // Recursive Updater
  const updateDeepState = useCallback((path: string[], value: any) => {
      setTempContent((prev: any) => {
          const newState = JSON.parse(JSON.stringify(prev));
          let current = newState;
          for (let i = 0; i < path.length - 1; i++) {
              current = current[path[i]];
          }
          current[path[path.length - 1]] = value;
          return newState;
      });
  }, []);

  const addItemToArray = (path: string[]) => {
      setTempContent((prev: any) => {
          const newState = JSON.parse(JSON.stringify(prev));
          let current = newState;
          for (let i = 0; i < path.length - 1; i++) {
              current = current[path[i]];
          }
          const targetArray = current[path[path.length - 1]];
          
          const template = targetArray.length > 0 
              ? JSON.parse(JSON.stringify(targetArray[0])) 
              : {};
          
          const clearValues = (obj: any) => {
              Object.keys(obj).forEach(key => {
                  if (typeof obj[key] === 'string') obj[key] = "";
                  else if (typeof obj[key] === 'number') obj[key] = 0;
                  else if (Array.isArray(obj[key])) obj[key] = [];
                  else if (typeof obj[key] === 'object' && obj[key] !== null) clearValues(obj[key]);
              });
          };
          if (targetArray.length > 0) clearValues(template);
          
          targetArray.push(template);
          return newState;
      });
  };

  const removeItemFromArray = (path: string[], index: number) => {
      if(!confirm("Bạn có chắc muốn xóa mục này?")) return;
      setTempContent((prev: any) => {
          const newState = JSON.parse(JSON.stringify(prev));
          let current = newState;
          for (let i = 0; i < path.length - 1; i++) {
              current = current[path[i]];
          }
          current[path[path.length - 1]].splice(index, 1);
          return newState;
      });
  };

  const toggleArrayExpand = (id: string) => {
      setExpandedArrays(prev => ({...prev, [id]: !prev[id]}));
  };

  // --- RECURSIVE RENDERER ---
  const renderField = (key: string, value: any, path: string[]) => {
      const fieldId = path.join('.');
      const isArray = Array.isArray(value);
      const isObject = typeof value === 'object' && value !== null && !isArray;

      // 1. ARRAY RENDERER
      if (isArray) {
          const isExpanded = expandedArrays[fieldId] ?? true; // Default expanded
          return (
              <div key={fieldId} className="mb-8 bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  <div 
                      className="bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors"
                      onClick={() => toggleArrayExpand(fieldId)}
                  >
                      <div className="flex items-center gap-2 font-bold text-brand-dark uppercase text-xs tracking-widest">
                          <Layout size={14} />
                          Danh sách: {key} ({value.length})
                      </div>
                      <div className="flex items-center gap-2">
                          <button 
                              onClick={(e) => {
                                  e.stopPropagation();
                                  addItemToArray(path);
                              }}
                              className="bg-brand-primary text-white p-1 rounded hover:bg-brand-gold transition-colors"
                              title="Thêm mục mới"
                          >
                              <Plus size={14} />
                          </button>
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                  </div>
                  
                  {isExpanded && (
                      <div className="p-4 space-y-4">
                          {value.map((item: any, index: number) => (
                              <div key={`${fieldId}-${index}`} className="bg-white border border-gray-200 rounded-md p-4 relative group">
                                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                      <button 
                                          onClick={() => removeItemFromArray(path, index)}
                                          className="text-red-400 hover:text-red-600 bg-white p-1 rounded shadow-sm"
                                          title="Xóa mục này"
                                      >
                                          <Trash2 size={14} />
                                      </button>
                                  </div>
                                  
                                  {/* Item Index Label */}
                                  <div className="absolute -left-3 -top-3 w-6 h-6 bg-brand-dark text-brand-gold rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                                      {index + 1}
                                  </div>

                                  {typeof item === 'object' ? (
                                      <div className="grid grid-cols-1 gap-4 pt-2">
                                          {Object.entries(item).map(([k, v]) => renderField(k, v, [...path, index.toString(), k]))}
                                      </div>
                                  ) : (
                                      renderField(`Item ${index + 1}`, item, [...path, index.toString()])
                                  )}
                              </div>
                          ))}
                          {value.length === 0 && (
                              <div className="text-center py-4 text-gray-400 text-xs italic">Danh sách trống</div>
                          )}
                      </div>
                  )}
              </div>
          );
      }

      // 2. OBJECT RENDERER (NESTED)
      if (isObject) {
          return (
              <div key={fieldId} className="mb-6 border-l-2 border-brand-gold/20 pl-4 ml-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-widest">{key}</h4>
                  <div className="grid grid-cols-1 gap-4">
                      {Object.entries(value).map(([k, v]) => renderField(k, v, [...path, k]))}
                  </div>
              </div>
          );
      }

      // 3. PRIMITIVE RENDERER (String, Number)
      const isImg = key.toLowerCase().includes('image') || key.toLowerCase().includes('img') || key.toLowerCase().includes('src') || key.toLowerCase().includes('url') || isImageUrl(value);
      const isLongText = typeof value === 'string' && (value.length > 60 || key.toLowerCase().includes('desc'));

      return (
          <div key={fieldId} className="w-full">
              <label className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  {isImg ? <ImageIcon size={12} className="text-brand-primary" /> : <Type size={12} />}
                  {key}
              </label>
              
              {isLongText ? (
                  <textarea
                      value={value}
                      onChange={(e) => updateDeepState(path, e.target.value)}
                      className="w-full bg-white border border-gray-200 p-3 rounded text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all min-h-[100px] font-sans text-brand-dark"
                  />
              ) : (
                  <div className="relative">
                      <input
                          type={typeof value === 'number' ? 'number' : 'text'}
                          value={value}
                          onChange={(e) => updateDeepState(path, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                          className="w-full bg-white border border-gray-200 p-2.5 rounded text-sm focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/50 transition-all font-sans text-brand-dark pr-8"
                      />
                      {isImg && value && (
                           <a href={value} target="_blank" rel="noreferrer" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-gold">
                               <ExternalLink size={14} />
                           </a>
                      )}
                  </div>
              )}

              {/* Image Preview */}
              {isImg && typeof value === 'string' && value.length > 10 && (
                  <div className="mt-2 w-24 h-24 rounded-md overflow-hidden border border-gray-200 bg-gray-50 relative group shadow-sm hover:shadow-md transition-all">
                      <img src={value} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] text-white font-bold">
                          PREVIEW
                      </div>
                  </div>
              )}
          </div>
      );
  };

  // APPS SCRIPT CODE TEMPLATE
  const appsScriptCode = `function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var action = e.parameter.action;

    // 1. ACTION: LƯU CẤU HÌNH (Admin Publish)
    if (action == 'saveConfig') {
      var rawData = e.parameter.data;
      
      // A. Lưu Raw JSON vào sheet 'Database' (BẮT BUỘC ĐỂ WEBSITE ĐỌC)
      var dbSheet = sheet.getSheetByName('Database');
      if (!dbSheet) dbSheet = sheet.insertSheet('Database');
      dbSheet.clear();
      dbSheet.getRange('A1').setValue(rawData);
      dbSheet.getRange('A2').setValue(new Date()); // Timestamp

      // B. Lưu Dữ liệu dạng Bảng vào sheet 'CMS_View' (ĐỂ NGƯỜI DÙNG ĐỌC)
      var viewSheet = sheet.getSheetByName('CMS_View');
      if (!viewSheet) viewSheet = sheet.insertSheet('CMS_View');
      viewSheet.clear();
      
      // Header cho bảng dễ đọc
      viewSheet.appendRow(['PHÂN KHU (Section)', 'MÃ TRƯỜNG (Key)', 'NỘI DUNG (Value)']);
      viewSheet.getRange('A1:C1').setFontWeight('bold').setBackground('#D4AF37').setFontColor('white');
      viewSheet.setColumnWidth(1, 150); // Cột Section
      viewSheet.setColumnWidth(2, 250); // Cột Key
      viewSheet.setColumnWidth(3, 500); // Cột Value

      var jsonData = JSON.parse(rawData);
      var rows = [];

      // Hàm đệ quy làm phẳng Object thành các dòng
      function processObject(obj, prefix, sectionName) {
        for (var key in obj) {
           if (key === 'config') continue; // Bỏ qua config kỹ thuật
           
           var value = obj[key];
           var currentKey = prefix ? prefix + '.' + key : key;
           var currentSection = sectionName || key; // Lấy root key làm section

           if (Array.isArray(value)) {
              value.forEach(function(item, index) {
                 if (typeof item === 'object') {
                    processObject(item, currentKey + '[' + (index + 1) + ']', currentSection);
                 } else {
                    rows.push([currentSection, currentKey + '[' + (index + 1) + ']', item]);
                 }
              });
           } else if (typeof value === 'object' && value !== null) {
              processObject(value, currentKey, currentSection);
           } else {
              // Giá trị cuối cùng (String/Number)
              rows.push([currentSection, currentKey, value]);
           }
        }
      }

      processObject(jsonData, '', '');

      // Ghi dữ liệu vào bảng CMS_View
      if (rows.length > 0) {
        viewSheet.getRange(2, 1, rows.length, 3).setValues(rows);
      }
      
      return ContentService.createTextOutput(JSON.stringify({result: 'success', type: 'config_saved'}))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. ACTION: LƯU LEAD (Khách hàng đăng ký)
    if (action == 'contact') {
      var leadSheet = sheet.getSheetByName('Leads');
      if (!leadSheet) {
        leadSheet = sheet.insertSheet('Leads');
        leadSheet.appendRow(['Thời gian', 'Họ tên', 'Số điện thoại', 'Email', 'Sản phẩm quan tâm']);
        leadSheet.getRange('A1:E1').setFontWeight('bold').setBackground('#0D4138').setFontColor('white');
      }
      
      leadSheet.appendRow([
        new Date(),
        e.parameter.name,
        e.parameter.phone,
        e.parameter.email,
        e.parameter.interest
      ]);
      
      return ContentService.createTextOutput(JSON.stringify({result: 'success', type: 'lead_saved'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
  } catch (e) {
    return ContentService.createTextOutput(JSON.stringify({result: 'error', error: e.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  // Trả về dữ liệu cấu hình từ Sheet 'Database' để Website load nội dung
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Database');
  var data = "{}";
  if (sheet) {
     data = sheet.getRange('A1').getValue();
  }
  return ContentService.createTextOutput(data).setMimeType(ContentService.MimeType.JSON);
}`;

  if (!isOpen) return null;

  // If Hidden Mode is active, just show the restore eye button
  if (isHidden) {
      return (
          <div className="fixed bottom-8 right-8 z-[201]">
              <button 
                  onClick={() => setIsHidden(false)}
                  className="bg-brand-gold text-brand-dark p-4 rounded-full shadow-2xl hover:scale-110 transition-transform border-4 border-white animate-pulse"
                  title="Hiện lại Admin Panel"
              >
                  <Eye size={24} />
              </button>
          </div>
      );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm animate-fade-in p-4 cursor-default">
      <div className="bg-gray-50 w-full max-w-[1400px] h-[90vh] rounded-2xl shadow-2xl flex overflow-hidden ring-1 ring-white/10 relative">
        
        {/* Action Bar - Top Right */}
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
            {isAuthenticated && (
                <>
                   {/* Toggle Live Preview */}
                   <button 
                        onClick={() => setIsLivePreview(!isLivePreview)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-lg
                            ${isLivePreview ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}
                        `}
                        title={isLivePreview ? "Đang bật: Thay đổi sẽ cập nhật ngay lập tức" : "Đang tắt: Cần nhấn Lưu Nháp để cập nhật"}
                   >
                       <Zap size={14} fill={isLivePreview ? "currentColor" : "none"} />
                       {isLivePreview ? "Live ON" : "Live OFF"}
                   </button>

                   {/* Hide Panel */}
                   <button 
                        onClick={() => setIsHidden(true)}
                        className="bg-white hover:bg-gray-100 text-gray-600 rounded-full p-2 transition-all shadow-lg border border-gray-200"
                        title="Ẩn Panel để xem Website"
                   >
                        <EyeOff size={20} />
                   </button>
                </>
            )}
            
            {/* Close */}
            <button onClick={onClose} className="bg-white hover:bg-red-500 hover:text-white text-gray-500 rounded-full p-2 transition-all shadow-lg border border-gray-200">
                <X size={20} />
            </button>
        </div>

        {!isAuthenticated ? (
          // LOGIN SCREEN
          <div className="w-full flex items-center justify-center bg-brand-dark relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
             <div className="w-full max-w-md p-10 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                   <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-brand-dark">
                       <Lock size={32} />
                   </div>
                   <h2 className="text-3xl font-serif text-white">CMS Quản Trị</h2>
                   <p className="text-gray-300 mt-2 text-sm">Hệ thống quản lý nội dung tập trung</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/20 border border-white/20 p-4 rounded-lg focus:outline-none focus:border-brand-gold text-center text-white text-xl tracking-widest placeholder-white/30 transition-all"
                        placeholder="••••••"
                        autoFocus
                    />
                    <button type="submit" className="w-full bg-brand-gold text-brand-dark font-bold py-4 rounded-lg hover:bg-white transition-all shadow-lg uppercase tracking-widest">
                        Truy Cập
                    </button>
                </form>
             </div>
          </div>
        ) : (
          // MAIN DASHBOARD
          <>
            {/* Sidebar */}
            <div className="w-72 bg-brand-dark text-gray-300 flex flex-col border-r border-white/10 shadow-xl relative z-20">
              <div className="p-6 border-b border-white/10 bg-[#01201b]">
                 <h2 className="font-display text-xl text-white tracking-tight">Green <span className="text-brand-gold">Paradise</span></h2>
                 <p className="text-gray-500 mt-1 flex items-center gap-1 text-[10px] uppercase tracking-widest">
                    <div className={`w-2 h-2 rounded-full ${publishStatus === 'loading' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`}></div>
                    System Online
                 </p>
              </div>
              <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
                {/* Special Config Tab */}
                <button
                    onClick={() => setActiveTab('config')}
                    className={`w-full text-left px-6 py-4 flex items-center justify-between transition-all border-l-4 mb-2 ${
                      activeTab === 'config' 
                        ? 'bg-blue-900/50 text-blue-300 border-blue-400' 
                        : 'border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="uppercase text-xs font-bold tracking-widest flex items-center gap-2">
                        <Settings size={14}/>
                        Cấu hình Sync
                    </span>
                    {activeTab === 'config' && <ChevronRight size={14} />}
                </button>

                <div className="w-full h-px bg-white/10 my-2"></div>

                {/* Content Tabs */}
                {Object.keys(tempContent).filter(k => k !== 'config').map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`w-full text-left px-6 py-4 flex items-center justify-between transition-all border-l-4 ${
                      activeTab === key 
                        ? 'bg-white/5 text-brand-gold border-brand-gold' 
                        : 'border-transparent hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="uppercase text-xs font-bold tracking-widest flex items-center gap-2">
                        {Array.isArray(tempContent[key]) ? <Layout size={14}/> : <Type size={14}/>}
                        {key}
                    </span>
                    {activeTab === key && <ChevronRight size={14} />}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-white/10 bg-[#01201b]">
                  <button onClick={() => setIsAuthenticated(false)} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors">
                      <LogOut size={16} /> Đăng xuất
                  </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col bg-[#f8f9fa] relative z-10">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shadow-sm sticky top-0 z-30">
                    <div>
                        <h3 className="text-2xl font-serif text-brand-dark font-bold capitalize flex items-center gap-3">
                            {activeTab}
                            {Array.isArray(tempContent[activeTab]) && (
                                <span className="bg-brand-gold/20 text-brand-dark text-xs px-2 py-1 rounded-full font-sans font-bold">
                                    {tempContent[activeTab].length} items
                                </span>
                            )}
                        </h3>
                    </div>
                    <div className="flex gap-3 pr-16"> {/* Padding right for absolute buttons */}
                         <button onClick={handleReset} className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors border border-transparent hover:border-red-100">
                             <RotateCcw size={14} /> Khôi phục gốc
                         </button>
                         
                         {!isLivePreview && (
                             <button onClick={handleSaveLocal} className="px-6 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all">
                                 <Save size={14} /> Lưu Nháp
                             </button>
                         )}
                         
                         {/* PUBLISH BUTTON - NEW STATE LOGIC */}
                         <button 
                             onClick={handlePublish} 
                             disabled={publishStatus === 'loading'}
                             className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg hover:shadow-xl transition-all min-w-[200px] justify-center
                                 ${publishStatus === 'loading' ? 'bg-brand-dark text-brand-gold cursor-wait border border-brand-gold' : ''}
                                 ${publishStatus === 'success' ? 'bg-green-600 text-white' : ''}
                                 ${publishStatus === 'error' ? 'bg-red-600 text-white' : ''}
                                 ${publishStatus === 'idle' ? 'bg-brand-primary text-white hover:bg-brand-gold hover:text-brand-dark' : ''}
                             `}
                         >
                             {publishStatus === 'idle' && <><CloudUpload size={14} /> Xuất Bản (Sync Cloud)</>}
                             {publishStatus === 'loading' && <><Loader2 size={16} className="animate-spin" /> Đang đồng bộ Sheet...</>}
                             {publishStatus === 'success' && <><Check size={16} /> Đã lưu thành công!</>}
                             {publishStatus === 'error' && <><AlertTriangle size={16} /> Lỗi kết nối!</>}
                         </button>
                    </div>
                </div>

                {/* Dynamic Form */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-32">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        {activeTab === 'config' ? (
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Google Web App URL</label>
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={tempContent.config?.googleSheetUrl || ''}
                                            onChange={(e) => updateDeepState(['config', 'googleSheetUrl'], e.target.value)}
                                            className="flex-1 bg-white border border-gray-300 p-3 rounded focus:border-brand-primary focus:outline-none font-mono text-sm"
                                            placeholder="https://script.google.com/macros/s/.../exec"
                                        />
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-1">Dán URL từ bước Deployment của Google Apps Script vào đây.</p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
                                    <h4 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                                        <Settings size={16} />
                                        Hướng dẫn Cài đặt Google Apps Script (Backend)
                                    </h4>
                                    
                                    <ol className="list-decimal list-inside text-sm text-blue-900 space-y-3 mb-6">
                                        <li>Tạo một <b>Google Sheet</b> mới.</li>
                                        <li>Vào menu <b>Tiện ích mở rộng (Extensions)</b> → chọn <b>Apps Script</b>.</li>
                                        <li>Xóa toàn bộ code cũ và dán đoạn mã bên dưới vào.</li>
                                        <li>Nhấn <b>Lưu (Save)</b>.</li>
                                        <li>Nhấn nút <b>Triển khai (Deploy)</b> (màu xanh góc phải) → chọn <b>Tùy chọn triển khai mới (New deployment)</b>.</li>
                                        <li>Chọn loại: <b>Ứng dụng web (Web app)</b>.</li>
                                        <li>Cấu hình: 
                                            <ul className="list-disc list-inside ml-6 mt-1 opacity-80">
                                                <li>Mô tả: Tùy ý (VD: Vinhomes Backend)</li>
                                                <li>Thực thi dưới dạng: <b>Tôi (Me)</b></li>
                                                <li>Ai có quyền truy cập: <b>Bất kỳ ai (Anyone)</b> (QUAN TRỌNG)</li>
                                            </ul>
                                        </li>
                                        <li>Nhấn <b>Triển khai</b> → Cấp quyền truy cập nếu được hỏi.</li>
                                        <li>Copy <b>URL ứng dụng web</b> (có đuôi <code>/exec</code>) và dán vào ô bên trên.</li>
                                    </ol>

                                    <div className="relative">
                                        <div className="absolute top-2 right-2">
                                            <button 
                                                onClick={() => copyToClipboard(appsScriptCode)}
                                                className="bg-white/20 hover:bg-white/40 text-blue-900 p-2 rounded transition-colors flex items-center gap-2 text-xs font-bold"
                                            >
                                                <Copy size={14} /> Sao chép Code
                                            </button>
                                        </div>
                                        <pre className="bg-[#1e293b] text-blue-100 p-4 rounded-lg overflow-x-auto text-xs font-mono border border-blue-900/20 shadow-inner">
                                            {appsScriptCode}
                                        </pre>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            tempContent[activeTab] && (
                                Array.isArray(tempContent[activeTab]) ? (
                                    // Root Array Handling
                                    renderField(activeTab, tempContent[activeTab], [activeTab])
                                ) : (
                                    // Root Object Handling
                                    <div className="grid grid-cols-1 gap-6">
                                        {Object.entries(tempContent[activeTab]).map(([key, value]) => 
                                            renderField(key, value, [activeTab, key])
                                        )}
                                    </div>
                                )
                            )
                        )}
                    </div>
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;