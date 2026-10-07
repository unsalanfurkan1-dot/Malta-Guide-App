import { AppProvider, useApp } from '@/store';
import HomeScreen from '@/screens/HomeScreen';
import PlanScreen from '@/screens/PlanScreen';
import TripScreen from '@/screens/TripScreen';
import MapScreen from '@/screens/MapScreen';
import BottomNav from '@/components/BottomNav';

function AppContent() {
  const { screen, stops } = useApp();

  const showMap = screen === 'map' && stops.length > 0;

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-50">
      <div className="flex-1 overflow-hidden">
        {screen === 'home' && <HomeScreen />}
        {screen === 'plan' && <PlanScreen />}
        {screen === 'trip' && <TripScreen />}
        {showMap && <MapScreen />}
        {screen === 'map' && !showMap && <TripScreen />}
      </div>
      {screen !== 'map' && <BottomNav />}
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
