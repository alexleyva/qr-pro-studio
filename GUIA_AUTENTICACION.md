# 🔐 Guía de Autenticación y Base de Datos - QR Pro Studio

## ✅ Sistema Implementado

Se ha implementado un sistema completo de autenticación y base de datos para QR Pro Studio que incluye:

- **Backend API REST** con Node.js + Express + SQLite
- **Autenticación JWT** con bcrypt para seguridad
- **Base de datos SQLite** con 9 tablas
- **Frontend integrado** con React Context API
- **Subida de archivos** para marcos, logos e iconos personalizados

---

## 🚀 Cómo Usar el Sistema

### 1. **Iniciar el Backend**

```bash
cd server
npm run dev
```

El servidor estará disponible en: **http://localhost:5000**

### 2. **Iniciar el Frontend**

```bash
npm run dev
```

La aplicación estará disponible en: **http://localhost:3001**

---

## 👤 Registro e Inicio de Sesión

### **Registrar un Nuevo Usuario:**

1. Abre la aplicación en **http://localhost:3001**
2. Haz clic en el botón **"Registrarse"** en la esquina superior derecha
3. Completa el formulario:
   - **Nombre de usuario** (único)
   - **Email** (único)
   - **Contraseña** (mínimo 6 caracteres)
   - **Confirmar contraseña**
   - **Nombre completo** (opcional)
4. Haz clic en **"Registrarse"**
5. Si el registro es exitoso, serás redirigido automáticamente

### **Iniciar Sesión:**

1. Haz clic en el botón **"Iniciar Sesión"**
2. Ingresa tu **email** y **contraseña**
3. Haz clic en **"Iniciar Sesión"**
4. Verás tu avatar y menú de usuario en la esquina superior derecha

### **Cerrar Sesión:**

1. Haz clic en tu avatar en la esquina superior derecha
2. Selecciona **"Cerrar Sesión"**

---

## 💾 Guardar Códigos QR (Próximamente)

Una vez autenticado, podrás:

- ✅ Guardar tus códigos QR en la base de datos
- ✅ Ver historial de QR codes creados
- ✅ Editar y eliminar QR codes guardados
- ✅ Ver estadísticas de escaneos
- ✅ Hacer QR codes públicos o privados

---

## 🖼️ Galerías Personalizadas (Próximamente)

Podrás subir y gestionar:

- **Marcos personalizados** - Crea tus propios diseños de marcos
- **Logos personalizados** - Sube logos de tu empresa o marca
- **Iconos personalizados** - Agrega iconos únicos a tus QR

---

## 🔧 API Endpoints Disponibles

### **Autenticación:**
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### **QR Codes:**
- `GET /api/qr-codes` - Listar QR codes
- `POST /api/qr-codes` - Crear QR code
- `PUT /api/qr-codes/:id` - Actualizar QR code
- `DELETE /api/qr-codes/:id` - Eliminar QR code

### **Marcos:**
- `GET /api/frames` - Listar marcos
- `POST /api/frames/upload` - Subir marco
- `DELETE /api/frames/:id` - Eliminar marco

### **Logos:**
- `GET /api/logos` - Listar logos
- `POST /api/logos/upload` - Subir logo
- `DELETE /api/logos/:id` - Eliminar logo

### **Iconos:**
- `GET /api/icons` - Listar iconos
- `POST /api/icons/upload` - Subir icono
- `DELETE /api/icons/:id` - Eliminar icono

### **Usuario:**
- `GET /api/user/stats` - Estadísticas del usuario
- `GET /api/user/recent-qr-codes` - QR codes recientes

---

## 🗄️ Estructura de la Base de Datos

### **Tablas Creadas:**

1. **users** - Usuarios registrados
2. **qr_codes** - Códigos QR guardados
3. **custom_frames** - Marcos personalizados
4. **custom_logos** - Logos personalizados
5. **custom_icons** - Iconos personalizados
6. **user_favorites** - Favoritos del usuario
7. **qr_scans** - Estadísticas de escaneos
8. **user_sessions** - Sesiones activas
9. **api_keys** - Claves API (futuro)

---

## 🔒 Seguridad Implementada

- ✅ **JWT Tokens** - Autenticación segura con tokens
- ✅ **Bcrypt** - Hash de contraseñas con salt
- ✅ **Helmet** - Headers de seguridad HTTP
- ✅ **CORS** - Control de acceso entre orígenes
- ✅ **Rate Limiting** - Límite de 100 requests por 15 minutos
- ✅ **Validación de Inputs** - Validación con express-validator

---

## 📝 Próximos Pasos

Para completar la integración, se recomienda:

1. **Agregar botón "Guardar QR"** en la vista previa
2. **Crear panel "Mis QR Codes"** para gestionar QR guardados
3. **Implementar subida de marcos/logos/iconos** desde la UI
4. **Agregar dashboard de estadísticas** con gráficos
5. **Implementar sistema de favoritos**

---

## 🐛 Solución de Problemas

### **Error: Puerto 5000 en uso**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Luego reinicia el servidor
cd server
npm run dev
```

### **Error: Base de datos no encontrada**
```bash
cd server
npm run init-db
```

### **Error: Token inválido**
- Cierra sesión y vuelve a iniciar sesión
- Limpia el localStorage del navegador

---

## 📞 Soporte

Si encuentras algún problema, verifica:

1. ✅ Backend corriendo en puerto 5000
2. ✅ Frontend corriendo en puerto 3001
3. ✅ Base de datos inicializada
4. ✅ Archivos .env configurados

**Health Check:** http://localhost:5000/api/health

