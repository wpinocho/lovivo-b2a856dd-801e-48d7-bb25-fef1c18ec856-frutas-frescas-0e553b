import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { CartItem } from "@/pages/Index";
import { useToast } from "@/hooks/use-toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  totalPrice: number;
}

export const Cart = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemoveItem, 
  onUpdateQuantity, 
  totalPrice 
}: CartProps) => {
  const { toast } = useToast();

  console.log("Cart renderizado, isOpen:", isOpen, "items:", items.length);

  const handleCheckout = () => {
    console.log("Procesando compra, total:", totalPrice);
    toast({
      title: "¡Compra realizada!",
      description: `Gracias por tu compra de €${totalPrice.toFixed(2)}`,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-green-800 flex items-center">
              <ShoppingBag className="h-6 w-6 mr-2" />
              Tu Carrito
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
              <p className="text-gray-400 text-sm mt-2">
                Agrega algunas frutas deliciosas
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <Card key={item.id} className="border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-green-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">€{item.price.toFixed(2)}/kg</p>
                          <Badge variant="outline" className="text-xs mt-1">
                            {item.category}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-2 mb-2">
                            <Button
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-semibold min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="font-bold text-green-600">
                            €{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            onClick={() => onRemoveItem(item.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-1"
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-green-600">
                    €{totalPrice.toFixed(2)}
                  </span>
                </div>
                
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                  size="lg"
                >
                  Finalizar Compra
                </Button>
                
                <p className="text-xs text-gray-500 text-center mt-2">
                  Envío gratuito en pedidos superiores a €25
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};