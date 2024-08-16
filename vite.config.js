// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      three: path.resolve(__dirname, 'src/assets/js/three.js'),
      GLTFLoader: path.resolve(__dirname, 'src/assets/js/GLTFLoader.js')
      ,OrbitControls: path.resolve(__dirname, 'src/assets/js/OrbitControls.js')
    }
  },
  plugins: [vue()]
})
