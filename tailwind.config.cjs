module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // 如果你的程式碼都在 src 裡
    "./pages/**/*.{js,ts,jsx,tsx}", // 如果有 pages
    "./components/**/*.{js,ts,jsx,tsx}", // 如果有 components
    "./app/**/*.{js,ts,jsx,tsx}", // 如果有 app router
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}