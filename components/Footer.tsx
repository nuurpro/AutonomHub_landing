import React from 'react';
import { Zap } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                 <Zap className="h-4 w-4 text-black" />
               </div>
               <span className="font-bold text-white">AutonomHub</span>
            </div>
            <p className="text-gray-500 text-sm">Automating growth for the next generation of businesses.</p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary">The Animator</a></li>
              <li><a href="#" className="hover:text-primary">Caption Writer</a></li>
              <li><a href="#" className="hover:text-primary">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-primary">About</a></li>
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="#" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-4">Legal</h4>
             <ul className="space-y-2 text-sm text-gray-400">
               <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
               <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
             </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">© 2025 AutonomHub. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Designed with ⚡ by AutonomHub Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;