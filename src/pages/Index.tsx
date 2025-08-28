import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const fruits: Product[] = [
  {
    id: 1,
    name: "Manzanas Rojas",
    price: 3.50,
    image: "🍎",
    description: "Manzanas rojas frescas y crujientes",
    category: "Manzanas"
  },
  {
    id: 2,
    name: "Plátanos",
    price: 2.20,
    image: "🍌",
    description: "Plátanos maduros y dulces",
    category: "Tropical"
  },
  {
    id: 3,
    name: "Naranjas",
    price: 4.00,
    image: "🍊",
    description: "Naranjas jugosas llenas de vitamina C",
    category: "Cítricos"
  },
  {
    id: 4,
    name: "Fresas",
    price: 5.50,
    image: "🍓",
    description: "Fresas frescas y aromáticas",
    category: "Berries"
  },
  {
    id: 5,
    name: "Uvas",
    price: 6.00,
    image: "🍇",
    description: "Uvas dulces y jugosas",
    category: "Uvas"
  },
  {
    id: 6,
    name: "Piña",
    price: 4.50,
    image: "🍍",
    description: "Piña tropical dulce y refrescante",
    category: "Tropical"
  },
  {
    id: 7,
    name: "Sandía",
    price: 3.00,
    image: "🍉",
    description: "Sandía fresca perfecta para el verano",
    category: "Melones"
  },
  {
    id: 8,
    name: "Melocotones",
    price: 4.80,
    image: "🍑",
    description: "Melocotones jugosos y aromáticos",
    category: "Frutas de hueso"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  console.log("Tienda de frutas iniciada");
  console.log("Productos disponibles:", fruits.length);

  const addToCart = (product: Product) => {
    console.log("Agregando al carrito:", product.name);
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        console.log("Producto ya existe, incrementando cantidad");
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        console.log("Nuevo producto agregado al carrito");
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    toast({
      title: "¡Producto agregado!",
      description: `${product.name} se agregó al carrito`,
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Eliminando del carrito, ID:", productId);
    
    setCartItems(prevItems => {
      const updatedItems = prevItems.filter(item => item.id !== productId);
      console.log("Items restantes en carrito:", updatedItems.length);
      return updatedItems;
    });

    toast({
      title: "Producto eliminado",
      description: "El producto se eliminó del carrito",
    });
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    console.log("Actualizando cantidad, ID:", productId, "Nueva cantidad:", newQuantity);
    
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalItems = () => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    console.log("Total de items en carrito:", total);
    return total;
  };

  const getTotalPrice = () => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    console.log("Precio total del carrito:", total);
    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <Header 
        cartItemsCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            🍎 Frutería Fresh 🍊
          </h1>
          <p className="text-xl text-green-600 max-w-2xl mx-auto">
            Las frutas más frescas y deliciosas directamente a tu mesa. 
            Calidad premium, sabores auténticos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fruits.map((fruit) => (
            <ProductCard
              key={fruit.id}
              product={fruit}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Index;