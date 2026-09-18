# 🖼️ Guía de Marcos Personalizados - QR Pro Studio

## ✅ Funcionalidad Implementada

Se ha implementado un sistema completo para subir, guardar y gestionar marcos personalizados en QR Pro Studio:

- **Subida de marcos** a la base de datos
- **Galería dinámica** que muestra marcos predefinidos + personalizados
- **Gestión de marcos** por usuario
- **Marcos públicos y privados**
- **Categorización** de marcos

---

## 🚀 Cómo Usar los Marcos Personalizados

### **1. Ver la Galería de Marcos**

1. Abre la aplicación en **http://localhost:3001**
2. Ve a la pestaña **"Marco"** en el panel de diseño
3. Desplázate hasta la sección **"Librería de Marcos"**
4. Verás:
   - **8 marcos predefinidos** (incluidos por defecto)
   - **Marcos personalizados** subidos por ti y otros usuarios (con badge "CUSTOM")

### **2. Subir un Marco Personalizado**

**Requisitos:**
- ✅ Debes estar **autenticado** (registrado e iniciado sesión)
- ✅ Imagen en formato: PNG, JPG, SVG o WebP
- ✅ Tamaño máximo: 5MB

**Pasos:**

1. **Inicia sesión** si no lo has hecho
2. Ve a la pestaña **"Marco"**
3. En la sección **"Librería de Marcos"**, haz clic en el botón **"+ Subir"** (esquina superior derecha)
4. Se abrirá el modal de subida:
   - **Selecciona una imagen** (click en el área de subida)
   - **Nombre del marco** (obligatorio) - Ej: "Marco Elegante"
   - **Descripción** (opcional) - Describe tu marco
   - **Categoría** - Selecciona: General, Negocios, Redes Sociales, Eventos, Creativo
   - **Hacer público** - Marca si quieres que otros usuarios vean tu marco
5. Haz clic en **"Subir Marco"**
6. ¡Listo! Tu marco aparecerá en la galería

### **3. Usar un Marco en tu QR**

1. En la galería de marcos, haz clic en cualquier marco (predefinido o personalizado)
2. El marco se aplicará automáticamente a tu código QR
3. Puedes ajustar:
   - **Escala** (0.5x - 2.5x)
   - **Rotación** (0° - 360°)
   - **Capa** (Enviar atrás / Traer al frente)

---

## 🎨 Características de los Marcos Personalizados

### **Marcos Predefinidos:**
- ✅ 8 diseños incluidos por defecto
- ✅ Disponibles para todos los usuarios
- ✅ No requieren autenticación

### **Marcos Personalizados:**
- ✅ Subidos por usuarios autenticados
- ✅ Badge "CUSTOM" para identificarlos
- ✅ Pueden ser públicos o privados
- ✅ Categorizados para fácil búsqueda
- ✅ Guardados en la base de datos
- ✅ Disponibles en todos tus proyectos

---

## 📊 Gestión de Marcos

### **Marcos Públicos vs Privados:**

**Marcos Privados:**
- Solo tú puedes verlos y usarlos
- Ideales para diseños exclusivos de tu marca
- No aparecen en la galería de otros usuarios

**Marcos Públicos:**
- Visibles para todos los usuarios
- Contribuyes a la comunidad
- Otros usuarios pueden usar tus diseños

### **Categorías Disponibles:**

1. **General** - Marcos de uso general
2. **Negocios** - Marcos profesionales y corporativos
3. **Redes Sociales** - Marcos para Instagram, Facebook, etc.
4. **Eventos** - Marcos para bodas, fiestas, conferencias
5. **Creativo** - Marcos artísticos y únicos

---

## 🔧 Detalles Técnicos

### **Almacenamiento:**
- Los marcos se guardan en: `server/uploads/frames/`
- La información se almacena en la tabla `custom_frames` de la base de datos
- Cada marco tiene: ID, nombre, descripción, URL, categoría, público/privado

### **API Endpoints:**
- `GET /api/frames` - Obtener todos los marcos (públicos + del usuario)
- `POST /api/frames/upload` - Subir nuevo marco (requiere autenticación)
- `DELETE /api/frames/:id` - Eliminar marco (solo el propietario)

### **Validaciones:**
- Tipo de archivo: Solo imágenes (JPEG, PNG, SVG, WebP)
- Tamaño máximo: 5MB
- Nombre obligatorio
- Usuario autenticado requerido para subir

---

## 💡 Consejos para Mejores Marcos

### **Diseño:**
- ✅ Usa imágenes con **fondo transparente** (PNG) para mejores resultados
- ✅ Diseña marcos con un **espacio central** para el código QR
- ✅ Mantén los **bordes limpios** y definidos
- ✅ Usa **colores contrastantes** para que el QR sea legible

### **Tamaño:**
- ✅ Resolución recomendada: **1000x1000px** o superior
- ✅ Mantén la relación de aspecto **cuadrada** (1:1)
- ✅ Optimiza el tamaño del archivo antes de subir

### **Estilo:**
- ✅ Crea marcos que complementen tu marca
- ✅ Considera el contexto de uso (impresión, digital, etc.)
- ✅ Prueba diferentes escalas y rotaciones

---

## 🎯 Ejemplos de Uso

### **Caso 1: Marco para Tarjeta de Presentación**
1. Sube un marco con el logo de tu empresa
2. Categoría: "Negocios"
3. Marca como privado (solo para tu uso)
4. Aplica al QR de tu tarjeta de presentación

### **Caso 2: Marco para Evento**
1. Diseña un marco con el tema del evento
2. Categoría: "Eventos"
3. Marca como público para que otros asistentes lo usen
4. Comparte el QR con el marco en redes sociales

### **Caso 3: Marco para Redes Sociales**
1. Crea un marco con estilo Instagram/TikTok
2. Categoría: "Redes Sociales"
3. Marca como público para la comunidad
4. Usa en tus posts y stories

---

## 🐛 Solución de Problemas

### **No veo el botón "Subir"**
- ✅ Asegúrate de estar **autenticado**
- ✅ Inicia sesión o regístrate

### **Error al subir marco**
- ✅ Verifica que el archivo sea una **imagen válida**
- ✅ Comprueba que el tamaño sea **menor a 5MB**
- ✅ Asegúrate de tener **conexión al servidor**

### **El marco no aparece en la galería**
- ✅ Recarga la página
- ✅ Verifica que el servidor backend esté corriendo
- ✅ Revisa la consola del navegador para errores

### **El marco se ve distorsionado**
- ✅ Ajusta la **escala** en los controles
- ✅ Prueba cambiar la **capa** (atrás/frente)
- ✅ Usa una imagen con mejor resolución

---

## 📞 Próximas Mejoras

Funcionalidades planeadas:

- [ ] Editar marcos subidos
- [ ] Eliminar marcos desde la UI
- [ ] Búsqueda y filtrado por categoría
- [ ] Vista previa antes de aplicar
- [ ] Marcos favoritos
- [ ] Estadísticas de uso de marcos
- [ ] Compartir marcos con otros usuarios

---

¡Disfruta creando códigos QR únicos con marcos personalizados! 🎨✨

