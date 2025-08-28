import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

export const Header = ({ cartItemsCount, onCartClick }: HeaderProps) => {
  console.log("Header renderizado, items en carrito:", cartItemsCount);

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍎</span>
          <h2 className="text-2xl font-bold text-green-800">Frutería Fresh</h2>
        </div>
        
        <Button
          onClick={onCartClick}
          variant="outline"
          className="relative hover:bg-green-50 border-green-200"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Carrito
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};