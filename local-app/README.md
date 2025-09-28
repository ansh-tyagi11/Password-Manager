# 🛡️ Password Manager (Local Storage Version)

A simple and interactive **Password Manager** built with **React + Vite** that allows users to:

- ➕ Add passwords  
- ✏️ Edit passwords  
- ❌ Delete passwords  
- ✅ Mark passwords as used/finished  
- 📂 View all saved passwords  

All data is stored in **localStorage**, so your passwords remain even after refreshing or closing the browser.  

---

## 🚀 Features

- **Add Passwords**: Quickly save username and password combinations.  
- **Edit Passwords**: Update existing entries.  
- **Delete Passwords**: Remove passwords you no longer need.  
- **Mark as Finished**: Track used or expired passwords.  
- **Copy Passwords**: Copy passwords directly with the **copy icon**.  
- **Interactive Icons**: Animated icons using **Lordicons**.  
- **Unique IDs**: Each entry has a unique ID generated with **UUID**.  

---

## 🛠️ Tech Stack

- [React](https://react.dev/) – UI library  
- [Vite](https://vite.dev/) – Fast development & build tool  
- [TailwindCSS](https://tailwindcss.com/) – Styling  
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) – Data persistence  
- [Lordicons](https://lordicon.com/) – Animated icons  
- [UUID](https://www.npmjs.com/package/uuid) – Unique identifiers  

---

## 📂 Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ansh-tyagi11/Password-Manager.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Password-Manager
   ```
3. Install dependencies:
   ```bash
   npm install
   npm install uuid
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open in your browser:
   ```arduino
   http://localhost:5173/
   ```
## Usage
- Enter the username, password, and any notes.
- Click Add to store it in localStorage.
- Use the edit button to update an entry.
- Use the delete button to remove it.
- Copy passwords directly with the copy icon.

## License

This project is licensed under the MIT License.