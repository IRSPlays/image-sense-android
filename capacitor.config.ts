
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.8c6d9d43fb0f4c5dbd570a56f9c434b7',
  appName: 'image-sense-android',
  webDir: 'dist',
  server: {
    url: 'https://8c6d9d43-fb0f-4c5d-bd57-0a56f9c434b7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['android.permission.CAMERA']
    }
  },
  android: {
    backgroundColor: "#121212"
  }
};

export default config;
