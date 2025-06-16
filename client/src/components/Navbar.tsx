import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Home, 
  Building2, 
  Users, 
  Info, 
  Mail, 
  LogOut, 
  LogIn,
  LayoutDashboard,
  UserCog,
  ChevronDown,
  Menu
} from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  useEffect(() => {
    console.log('Navbar auth state:', { isAuthenticated, user: userData });
  }, [isAuthenticated, userData]);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderAuthButtons = () => {
    console.log('Rendering auth buttons:', { isAuthenticated, userRole: userData?.role });

    if (isAuthenticated && userData) {
      return (
        <div className="flex items-center space-x-4">
          {userData.role === 'agent' && (
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link to="/agent/dashboard">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userData.profileImage} alt={userData.name} />
                  <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>{userData.name}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                  <UserCog className="w-4 h-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost">
          <Link to="/login" className="flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </Link>
        </Button>
        <Button asChild>
          <Link to="/register" className="flex items-center gap-2">
            <span>Register</span>
          </Link>
        </Button>
      </div>
    );
  };

  const renderMobileMenu = () => {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/" className={`flex items-center gap-2 ${isActiveRoute('/') ? 'text-green-600' : ''}`}>
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/properties" className={`flex items-center gap-2 ${isActiveRoute('/properties') ? 'text-green-600' : ''}`}>
              <Building2 className="w-4 h-4" />
              <span>Properties</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/agents" className={`flex items-center gap-2 ${isActiveRoute('/agents') ? 'text-green-600' : ''}`}>
              <Users className="w-4 h-4" />
              <span>Agents</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/about" className={`flex items-center gap-2 ${isActiveRoute('/about') ? 'text-green-600' : ''}`}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/contact" className={`flex items-center gap-2 ${isActiveRoute('/contact') ? 'text-green-600' : ''}`}>
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {!isAuthenticated && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="flex items-center gap-2">
                  <span>Register</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
          {isAuthenticated && userData?.role === 'agent' && (
            <DropdownMenuItem asChild>
              <Link to="/agent/dashboard" className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </DropdownMenuItem>
          )}
          {isAuthenticated && (
            <>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <UserCog className="w-4 h-4" />
                  <span>Profile Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-green-600">
            Zameen
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`${isActiveRoute('/') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'} flex items-center gap-2`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <Link 
              to="/properties" 
              className={`${isActiveRoute('/properties') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'} flex items-center gap-2`}
            >
              <Building2 className="w-4 h-4" />
              <span>Properties</span>
            </Link>
            <Link 
              to="/agents" 
              className={`${isActiveRoute('/agents') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'} flex items-center gap-2`}
            >
              <Users className="w-4 h-4" />
              <span>Agents</span>
            </Link>
            <Link 
              to="/about" 
              className={`${isActiveRoute('/about') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'} flex items-center gap-2`}
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </Link>
            <Link 
              to="/contact" 
              className={`${isActiveRoute('/contact') ? 'text-green-600 font-medium' : 'text-gray-600 hover:text-green-600'} flex items-center gap-2`}
            >
              <Mail className="w-4 h-4" />
              <span>Contact</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {renderMobileMenu()}
            <div className="hidden md:block">
              {renderAuthButtons()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 