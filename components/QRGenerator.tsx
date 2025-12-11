import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Download, RefreshCcw, QrCode, Link as LinkIcon, AlertCircle } from 'lucide-react';

export const QRGenerator: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('الرجاء إدخال رابط صحيح');
      return;
    }

    setIsLoading(true);
    
    try {
      // Generate QR code data URL
      const dataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء إنشاء الباركود. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setQrDataUrl(null);
    setUrl('');
    setError('');
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
      {/* Header Section */}
      <div className="bg-slate-50 p-6 border-b border-slate-100 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
          <QrCode size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">مولد الباركود</h2>
        <p className="text-slate-500 text-sm">أدخل الرابط أدناه لإنشاء رمز استجابة سريعة (QR) ومشاركته بسهولة</p>
      </div>

      <div className="p-6">
        {!qrDataUrl ? (
          /* Input Form State */
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="url-input" className="block text-sm font-semibold text-slate-700">
                رابط الموقع (URL)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <LinkIcon size={18} />
                </div>
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full pr-10 pl-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-left placeholder:text-right"
                  dir="ltr"
                />
              </div>
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm mt-2 animate-pulse">
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading || !url}
              className={`w-full py-3.5 px-6 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 flex items-center justify-center gap-2
                ${isLoading || !url 
                  ? 'bg-slate-300 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:translate-y-0'
                }`}
            >
              {isLoading ? 'جاري الإنشاء...' : 'إنشاء الباركود'}
              {!isLoading && <QrCode size={20} />}
            </button>
          </form>
        ) : (
          /* Result State */
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="bg-white p-4 rounded-xl shadow-inner border border-slate-100 mb-6">
              <img 
                src={qrDataUrl} 
                alt="Generated QR Code" 
                className="w-64 h-64 object-contain rounded-lg"
              />
            </div>
            
            <p className="text-slate-500 text-sm mb-6 max-w-xs text-center truncate px-4" dir="ltr">
              {url}
            </p>

            <div className="flex flex-col w-full gap-3">
              <button
                onClick={handleDownload}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg shadow-green-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Download size={20} />
                تحميل الصورة
              </button>
              
              <button
                onClick={handleReset}
                className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <RefreshCcw size={18} />
                إنشاء باركود آخر
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};