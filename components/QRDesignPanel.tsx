
import React, { useState, useEffect } from 'react';
import { QRConfig, DotType, CornerType } from '../types';
import { DOT_STYLES, CORNER_STYLES, FRAME_STYLES } from '../constants';
import { framesAPI, Frame, logosAPI, Logo } from '../services/api';
import { UploadFrameModal } from './UploadFrameModal';
import { UploadLogoModal } from './UploadLogoModal';
import { Palette, Box, Image as ImageIcon, Layout, Sliders, Pipette, RotateCw, Target, Type as TypeIcon, Check, Trash2, Plus, Upload, Maximize, Layers, RefreshCw } from 'lucide-react';

interface QRDesignPanelProps {
  config: QRConfig;
  onChange: (config: QRConfig) => void;
}

const PRESET_COLORS = [
  '#000000', '#2563eb', '#7c3aed', '#db2777', '#dc2626', '#ea580c', '#16a34a', '#0891b2',
];

export const QRDesignPanel: React.FC<QRDesignPanelProps> = ({ config, onChange }) => {
  const [activeTab, setActiveTab] = useState<'frame' | 'shape' | 'logo'>('shape');
  const [frames, setFrames] = useState<Frame[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [framesLoading, setFramesLoading] = useState(true);
  const [framesError, setFramesError] = useState(false);

  const loadFrames = async () => {
    setFramesLoading(true);
    setFramesError(false);
    try {
      const data = await framesAPI.list();
      setFrames(data.frames);
    } catch (err) {
      console.error('Error al cargar marcos:', err);
      setFramesError(true);
    } finally {
      setFramesLoading(false);
    }
  };

  const [logos, setLogos] = useState<Logo[]>([]);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [logosLoading, setLogosLoading] = useState(true);
  const [logosError, setLogosError] = useState(false);

  const loadLogos = async () => {
    setLogosLoading(true);
    setLogosError(false);
    try {
      const data = await logosAPI.list();
      setLogos(data.logos);
    } catch (err) {
      console.error('Error al cargar logos:', err);
      setLogosError(true);
    } finally {
      setLogosLoading(false);
    }
  };

  useEffect(() => {
    loadFrames();
    loadLogos();
  }, []);

  const applyFrame = (frame: Frame) => {
    const newConfig = { ...config };
    newConfig.styling.frame = {
      ...(newConfig.styling.frame || {}),
      type: 'custom',
      text: newConfig.styling.frame?.text || 'SCAN ME',
      color: newConfig.styling.frame?.color || '#1a1a1a',
      textColor: newConfig.styling.frame?.textColor || '#ffffff',
      customSrc: frame.imageUrl,
      rotation: 0,
      scale: 1,
      layer: 'back',
    };
    onChange(newConfig);
  };

  const deleteFrame = async (frame: Frame) => {
    if (!window.confirm(`¿Eliminar el marco "${frame.name}"?`)) return;
    try {
      await framesAPI.delete(frame.id);
      loadFrames();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el marco');
    }
  };

  const applyLogo = (logo: Logo) => {
    updateStyling('logo', 'src', logo.imageUrl);
  };

  const deleteLogo = async (logo: Logo) => {
    if (!window.confirm(`¿Eliminar el logo "${logo.name}"?`)) return;
    try {
      await logosAPI.delete(logo.id);
      loadLogos();
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el logo');
    }
  };

  const updateStyling = (section: string, field: string, value: any) => {
    const newConfig = { ...config };
    (newConfig.styling as any)[section] = {
      ...(newConfig.styling as any)[section],
      [field]: value
    };
    onChange(newConfig);
  };

  const toggleGradient = (enabled: boolean) => {
    const newConfig = { ...config };
    if (enabled) {
      newConfig.styling.dots.gradient = {
        type: 'linear',
        color1: config.styling.dots.color,
        color2: '#3b82f6',
        rotation: 0
      };
    } else {
      delete newConfig.styling.dots.gradient;
    }
    onChange(newConfig);
  };

  const updateGradient = (field: string, value: any) => {
    if (!config.styling.dots.gradient) return;
    const newConfig = { ...config };
    newConfig.styling.dots.gradient = {
      ...config.styling.dots.gradient,
      [field]: value
    };
    onChange(newConfig);
  };

  const resetFrameEdits = () => {
    if (config.styling.frame) {
      const newConfig = { ...config };
      newConfig.styling.frame = {
        ...newConfig.styling.frame,
        rotation: 0,
        scale: 1,
        layer: 'back'
      };
      onChange(newConfig);
    }
  };

  const ensureFrame = () => {
    if (!config.styling.frame) {
      const newConfig = { ...config };
      newConfig.styling.frame = {
        type: 'none',
        text: 'SCAN ME',
        color: '#1a1a1a',
        textColor: '#ffffff',
        rotation: 0,
        scale: 1,
        layer: 'back'
      };
      return newConfig.styling.frame;
    }
    return config.styling.frame;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setActiveTab('shape')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 font-medium transition-colors ${
            activeTab === 'shape' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Diseño</span>
        </button>
        <button
          onClick={() => setActiveTab('logo')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 font-medium transition-colors ${
            activeTab === 'logo' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Logo</span>
        </button>
        <button
          onClick={() => setActiveTab('frame')}
          className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 font-medium transition-colors ${
            activeTab === 'frame' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Marco</span>
        </button>
      </div>

      <div className="p-6">
        {activeTab === 'shape' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Box className="w-4 h-4 text-blue-500" />
                Estilo de Módulos
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {DOT_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => updateStyling('dots', 'type', style.id)}
                    className={`p-3 text-sm rounded-lg border-2 transition-all ${
                      config.styling.dots.type === style.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <Pipette className="w-4 h-4 text-blue-500" />
                  Color de Módulos
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">Degradado</span>
                  <button
                    onClick={() => toggleGradient(!config.styling.dots.gradient)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-2 ring-offset-2 ring-transparent ${
                      config.styling.dots.gradient ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.styling.dots.gradient ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {!config.styling.dots.gradient ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="relative">
                      <input
                        type="color"
                        className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden bg-transparent"
                        value={config.styling.dots.color}
                        onChange={(e) => updateStyling('dots', 'color', e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-tight">Color Sólido</span>
                      <span className="text-sm font-mono text-gray-600 uppercase">{config.styling.dots.color}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color}
                        onClick={() => updateStyling('dots', 'color', color)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center ${
                          config.styling.dots.color === color ? 'border-gray-900 ring-2 ring-gray-100' : 'border-transparent'
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {config.styling.dots.color === color && (
                          <Check className={`w-4 h-4 ${color === '#ffffff' ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Color Inicio</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-8 h-8 p-0 border-0 rounded cursor-pointer overflow-hidden bg-transparent"
                          value={config.styling.dots.gradient.color1}
                          onChange={(e) => updateGradient('color1', e.target.value)}
                        />
                        <span className="text-xs font-mono text-gray-500 uppercase">{config.styling.dots.gradient.color1}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Color Fin</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          className="w-8 h-8 p-0 border-0 rounded cursor-pointer overflow-hidden bg-transparent"
                          value={config.styling.dots.gradient.color2}
                          onChange={(e) => updateGradient('color2', e.target.value)}
                        />
                        <span className="text-xs font-mono text-gray-500 uppercase">{config.styling.dots.gradient.color2}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-blue-100">
                    <label className="block text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">Tipo de Degradado</label>
                    <div className="flex gap-2 mb-4">
                      {['linear', 'radial'].map((t) => (
                        <button
                          key={t}
                          onClick={() => updateGradient('type', t)}
                          className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all capitalize ${
                            config.styling.dots.gradient?.type === t
                              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                              : 'bg-white border-blue-100 text-blue-600 hover:border-blue-300'
                          }`}
                        >
                          {t === 'linear' ? 'Lineal' : 'Radial'}
                        </button>
                      ))}
                    </div>

                    {config.styling.dots.gradient.type === 'linear' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center gap-1">
                            <RotateCw className="w-3 h-3" /> Rotación
                          </label>
                          <span className="text-xs font-bold text-blue-600">{config.styling.dots.gradient.rotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          step="15"
                          value={config.styling.dots.gradient.rotation || 0}
                          onChange={(e) => updateGradient('rotation', parseInt(e.target.value))}
                          className="w-full h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Color Fondo</label>
                <div className="flex items-center gap-2">
                   <input
                    type="color"
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer overflow-hidden bg-transparent"
                    value={config.styling.background.color}
                    disabled={config.styling.background.transparent}
                    onChange={(e) => updateStyling('background', 'color', e.target.value)}
                  />
                  <label className="flex items-center gap-2 cursor-pointer bg-gray-50 px-2 py-1 rounded-lg border border-gray-100">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500"
                      checked={config.styling.background.transparent}
                      onChange={(e) => updateStyling('background', 'transparent', e.target.checked)}
                    />
                    <span className="text-[10px] font-bold text-gray-500 uppercase">Transp.</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Color Esquinas</label>
                <div className="flex items-center gap-2">
                   <input
                    type="color"
                    className="w-10 h-10 p-0 border-0 rounded cursor-pointer overflow-hidden bg-transparent"
                    value={config.styling.corners.color}
                    onChange={(e) => updateStyling('corners', 'color', e.target.value)}
                  />
                   <span className="text-xs font-mono text-gray-500 uppercase">{config.styling.corners.color}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <h4 className="text-sm font-semibold text-gray-900">Color Centro de Esquinas</h4>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer overflow-hidden bg-transparent shadow-sm"
                    value={config.styling.cornersDot.color}
                    onChange={(e) => updateStyling('cornersDot', 'color', e.target.value)}
                  />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Centro (Eye)</span>
                    <span className="text-sm font-mono text-gray-600 uppercase">{config.styling.cornersDot.color}</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-500" />
                Estilo de Esquinas
              </h4>
              <div className="flex gap-2">
                {CORNER_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      updateStyling('corners', 'type', style.id);
                      updateStyling('cornersDot', 'type', style.id);
                    }}
                    className={`flex-1 p-2 text-xs font-semibold rounded-lg border-2 transition-all ${
                      config.styling.corners.type === style.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'logo' && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-bold text-gray-900">Librería de Logos</label>
                <button
                  onClick={() => setShowLogoModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Subir
                </button>
              </div>
              {logosLoading ? (
                <p className="text-sm text-gray-400 italic">Cargando logos...</p>
              ) : logosError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  No se pudo conectar al servidor de logos. Asegúrate de ejecutar el backend:
                  <code className="block mt-2 p-2 bg-red-100 rounded text-xs font-mono">cd server && npm run dev</code>
                </div>
              ) : logos.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No hay logos guardados todavía.</p>
              ) : (
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                  {logos.map((logo) => (
                    <div key={logo.id} className="group relative">
                      <button
                        onClick={() => applyLogo(logo)}
                        className={`aspect-square p-1.5 rounded-lg border flex items-center justify-center transition-all w-full ${
                          config.styling.logo?.src === logo.imageUrl ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-100 hover:bg-gray-50'
                        }`}
                        title={logo.name}
                      >
                        <img src={logo.imageUrl} alt={logo.name} className="w-full h-full object-contain" />
                      </button>
                      <button
                        onClick={() => deleteLogo(logo)}
                        className="absolute top-0 right-0 p-1 bg-white/80 rounded-md text-red-500 hover:bg-red-50 hidden group-hover:block transition-colors"
                        title="Eliminar logo"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {config.styling.logo?.src && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-2 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-blue-500" />
                    Ajustes de Logo
                  </span>
                  <button 
                    onClick={() => updateStyling('logo', 'src', '')}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 font-bold transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Eliminar
                  </button>
                </div>
                
                <div className="grid grid-cols-1 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Tamaño del Logo</label>
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{config.styling.logo.size}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="60"
                      step="5"
                      value={config.styling.logo.size}
                      onChange={(e) => updateStyling('logo', 'size', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Margen (Padding)</label>
                      <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{config.styling.logo.margin}px</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={config.styling.logo.margin}
                      onChange={(e) => updateStyling('logo', 'margin', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'frame' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-500" />
                Estilo de Marco
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {FRAME_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      const frame = ensureFrame();
                      updateStyling('frame', 'type', style.id);
                    }}
                    className={`p-3 text-sm rounded-lg border-2 transition-all ${
                      config.styling.frame?.type === style.id
                        ? 'border-blue-500 bg-blue-50 text-blue-700 font-bold'
                        : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-500" />
                  Librería de Marcos
                </h4>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-3 h-3" /> Subir
                </button>
              </div>
              {framesLoading ? (
                <p className="text-sm text-gray-400 italic">Cargando marcos...</p>
              ) : framesError ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                  No se pudo conectar al servidor de marcos. Asegúrate de ejecutar el backend en otra terminal:
                  <code className="block mt-2 p-2 bg-red-100 rounded text-xs font-mono">cd server && npm run dev</code>
                </div>
              ) : frames.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No hay marcos guardados todavía.</p>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {frames.map((frame) => (
                    <div
                      key={frame.id}
                      className="group relative border border-gray-200 rounded-xl overflow-hidden bg-white"
                    >
                      <button
                        onClick={() => applyFrame(frame)}
                        className="w-full aspect-square flex items-center justify-center p-2 hover:bg-gray-50 transition-colors"
                        title={frame.name}
                      >
                        <img src={frame.imageUrl} alt={frame.name} className="w-full h-full object-contain" />
                      </button>
                      <button
                        onClick={() => deleteFrame(frame)}
                        className="absolute top-1 right-1 p-1 bg-white/80 rounded-md text-red-500 hover:bg-red-50 hidden group-hover:block transition-colors"
                        title="Eliminar marco"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4">
              {config.styling.frame?.type === 'custom' && (
                <div className="space-y-6 mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Sliders className="w-3 h-3 text-blue-500" />
                      Edición Visual
                    </h4>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={resetFrameEdits}
                        className="text-[10px] text-blue-500 font-bold uppercase hover:underline flex items-center gap-1"
                        title="Restablecer valores"
                      >
                        <RefreshCw className="w-3 h-3" />
                        Reset
                      </button>
                      <button 
                        onClick={() => updateStyling('frame', 'type', 'none')}
                        className="text-[10px] text-red-500 font-bold uppercase hover:underline"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <Maximize className="w-3 h-3" /> Escalar
                        </label>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{(config.styling.frame.scale || 1).toFixed(1)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="2.5"
                        step="0.05"
                        value={config.styling.frame.scale || 1}
                        onChange={(e) => updateStyling('frame', 'scale', parseFloat(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <RotateCw className="w-3 h-3" /> Rotar
                        </label>
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">{config.styling.frame.rotation || 0}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="1"
                        value={config.styling.frame.rotation || 0}
                        onChange={(e) => updateStyling('frame', 'rotation', parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>

                    <div className="pt-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3 flex items-center gap-1">
                        <Layers className="w-3 h-3" /> Capa (Posición)
                      </label>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateStyling('frame', 'layer', 'back')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold rounded-lg border-2 transition-all uppercase ${
                            config.styling.frame.layer === 'back' 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'
                          }`}
                        >
                          <Layers className="w-3 h-3 opacity-70" />
                          Enviar Atrás
                        </button>
                        <button 
                          onClick={() => updateStyling('frame', 'layer', 'front')}
                          className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-bold rounded-lg border-2 transition-all uppercase ${
                            config.styling.frame.layer === 'front' 
                            ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                            : 'bg-white border-gray-200 text-gray-500 hover:border-blue-200'
                          }`}
                        >
                          <Layers className="w-3 h-3 rotate-180 opacity-70" />
                          Traer al Frente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {config.styling.frame?.type !== 'none' && config.styling.frame?.type !== 'custom' && (
              <div className="space-y-6 animate-in slide-in-from-top-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <TypeIcon className="w-3 h-3" /> Texto del Marco
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="SCAN ME"
                    value={config.styling.frame?.text || ''}
                    onChange={(e) => updateStyling('frame', 'text', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Color Marco</label>
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <input
                        type="color"
                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent"
                        value={config.styling.frame?.color || '#1a1a1a'}
                        onChange={(e) => updateStyling('frame', 'color', e.target.value)}
                      />
                      <span className="text-[10px] font-mono uppercase text-gray-500">{config.styling.frame?.color}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Color Texto</label>
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-100">
                      <input
                        type="color"
                        className="w-8 h-8 p-0 border-0 rounded cursor-pointer bg-transparent"
                        value={config.styling.frame?.textColor || '#ffffff'}
                        onChange={(e) => updateStyling('frame', 'textColor', e.target.value)}
                      />
                      <span className="text-[10px] font-mono uppercase text-gray-500">{config.styling.frame?.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <UploadFrameModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={loadFrames}
      />
      <UploadLogoModal
        isOpen={showLogoModal}
        onClose={() => setShowLogoModal(false)}
        onSuccess={loadLogos}
      />
    </div>
  );
};
