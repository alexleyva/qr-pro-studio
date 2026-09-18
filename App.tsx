
import React, { useState } from 'react';
import { QRType, QRConfig } from './types';
import { QR_TYPES } from './constants';
import { QRForms } from './components/QRForms';
import { QRDesignPanel } from './components/QRDesignPanel';
import { QRPreview } from './components/QRPreview';
import { LoginModal } from './components/Auth/LoginModal';
import { RegisterModal } from './components/Auth/RegisterModal';
import { UserMenu } from './components/Auth/UserMenu';
import { useAuth } from './context/AuthContext';
import { Sparkles, History, HelpCircle, Layers, Save } from 'lucide-react';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [config, setConfig] = useState<QRConfig>({
    type: QRType.URL,
    content: { url: 'https://qrprostudio.app' },
    styling: {
      dots: {
        color: '#1a1a1a',
        type: 'square'
      },
      background: {
        color: '#ffffff',
        transparent: false
      },
      corners: {
        color: '#1a1a1a',
        type: 'square'
      },
      cornersDot: {
        color: '#1a1a1a',
        type: 'square'
      },
      logo: {
        src: '',
        size: 35,
        margin: 5
      }
    }
  });

  const handleTypeChange = (type: QRType) => {
    setConfig({ ...config, type, content: {} });
  };

  const handleContentChange = (content: any) => {
    setConfig({ ...config, content });
  };

  const handleStylingChange = (newConfig: QRConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Layers className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                QR Pro Studio
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Diseña & Genera</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Generar</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-2">
              <History className="w-4 h-4" /> Historial
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Precios</a>

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  Registrarse
                </button>
              </>
            )}
          </nav>

          <button className="md:hidden p-2 text-gray-600">
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Input & Design */}
          <div className="flex-1 space-y-8">
            
            {/* Section 1: Content Type */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                <h2 className="text-2xl font-bold text-gray-900">Selecciona el tipo de QR</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {QR_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all group ${
                      config.type === type.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600 ring-4 ring-blue-50'
                        : 'border-gray-100 hover:border-blue-300 hover:bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className={`transition-transform group-hover:scale-110 ${config.type === type.id ? 'scale-110' : ''}`}>
                      {type.icon}
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap">{type.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Section 2: Input Form */}
            <section className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 font-bold">2</div>
                   <h3 className="text-xl font-bold text-gray-900">Ingresa el contenido</h3>
                </div>
                <span className="text-xs font-bold text-gray-400 uppercase bg-gray-50 px-3 py-1 rounded-full">
                  {config.type}
                </span>
              </div>
              <QRForms type={config.type} data={config.content} onChange={handleContentChange} />
            </section>

            {/* Section 3: Design */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600 font-bold">3</div>
                <h2 className="text-2xl font-bold text-gray-900">Diseña tu código QR</h2>
              </div>
              <QRDesignPanel config={config} onChange={handleStylingChange} />
            </section>
          </div>

          {/* Right Column: Preview & Download */}
          <div className="lg:w-96">
            <QRPreview config={config} />
            
            <div className="mt-8 p-6 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl text-white shadow-xl shadow-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold">Modo Premium</span>
              </div>
              <p className="text-sm text-blue-100 leading-relaxed">
                Desbloquea QRs dinámicos, estadísticas de escaneo en tiempo real y descarga masiva de códigos.
              </p>
              <button className="w-full mt-6 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Probar Gratis 7 días
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Meta */}
      <footer className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm gap-4">
        <p>© 2024 QR Pro Studio. Hecho con ❤️ para creadores digitales.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-gray-600 transition-colors">Términos</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-gray-600 transition-colors">Cookies</a>
        </div>
      </footer>

      {/* Modales de autenticación */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default App;
