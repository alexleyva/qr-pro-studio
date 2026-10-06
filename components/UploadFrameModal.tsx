import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon, AlertCircle, Check, LoaderCircle } from 'lucide-react';
import { framesAPI } from '../services/api';

interface UploadFrameModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const UploadFrameModal: React.FC<UploadFrameModalProps> = ({ onClose, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('general');
  const [isPublic, setIsPublic] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validar tipo de archivo
      if (!selectedFile.type.startsWith('image/')) {
        setError('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (5MB máximo)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('El archivo es demasiado grande. Máximo 5MB');
        return;
      }

      setFile(selectedFile);
      setError('');

      // Crear preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      // Auto-llenar nombre si está vacío
      if (!name) {
        setName(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor selecciona un archivo');
      return;
    }

    if (!name.trim()) {
      setError('Por favor ingresa un nombre para el marco');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('frame', file);
      formData.append('name', name.trim());
      formData.append('description', description.trim());
      formData.append('category', category);
      formData.append('isPublic', isPublic.toString());

      const result = await framesAPI.upload(formData);
      console.log('Marco subido exitosamente:', result);

      setSuccess(true);

      // Llamar a onSuccess inmediatamente para recargar la galería
      onSuccess();

      // Cerrar el modal después de un breve delay para mostrar el mensaje de éxito
      setTimeout(() => {
        handleClose();
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Error al subir el marco');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setPreview('');
    setName('');
    setDescription('');
    setCategory('general');
    setIsPublic(false);
    setError('');
    setSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-600" />
            Subir Marco Personalizado
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Imagen del Marco *
            </label>
            <div className="relative">
              <input
                type="file"
                id="frame-file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
              />
              <label
                htmlFor="frame-file"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                  preview
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                }`}
              >
                {preview ? (
                  <img src={preview} alt="Preview" className="max-h-44 object-contain rounded" />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <ImageIcon className="w-12 h-12" />
                    <span className="text-sm font-medium">Click para seleccionar imagen</span>
                    <span className="text-xs text-gray-400">PNG, JPG, SVG (máx. 5MB)</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del Marco *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Ej: Marco Elegante"
              disabled={loading}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción (opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Describe tu marco..."
              rows={3}
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Categoría
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              disabled={loading}
            >
              <option value="general">General</option>
              <option value="business">Negocios</option>
              <option value="social">Redes Sociales</option>
              <option value="event">Eventos</option>
              <option value="creative">Creativo</option>
            </select>
          </div>

          {/* Public Toggle */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="is-public"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <label htmlFor="is-public" className="text-sm text-gray-700 cursor-pointer">
              Hacer público (otros usuarios podrán ver este marco)
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
              <Check className="w-4 h-4 flex-shrink-0" />
              <span>¡Marco subido exitosamente!</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loading || !file}
            >
              {loading ? (
                <span key="loading" className="inline-flex items-center gap-2">
                  <LoaderCircle className="w-4 h-4 animate-spin" />
                  <span>Subiendo...</span>
                </span>
              ) : (
                <span key="idle" className="inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  <span>Subir Marco</span>
                </span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

