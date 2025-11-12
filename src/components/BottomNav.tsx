import { Home, History, User } from 'lucide-react';

interface BottomNavProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'history', label: 'History', icon: History },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-border shadow-2xl">
      <div className="max-w-md mx-auto flex justify-around items-center h-20 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all duration-200 rounded-2xl ${
                isActive ? 'text-emerald-600' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {/* Active indicator background */}
              {isActive && (
                <div className="absolute inset-2 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl -z-10" />
              )}
              
              {/* Icon with animation */}
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'scale-100'}`}>
                <Icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
              </div>
              
              {/* Label */}
              <span className={`text-xs transition-all ${isActive ? '' : ''}`}>
                {item.label}
              </span>
              
              {/* Active dot indicator */}
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-emerald-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
