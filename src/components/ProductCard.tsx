import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  console.log("Renderizando ProductCard para:", product.name);

  const handleAddToCart = () => {
    console.log("Botón agregar clickeado para:", product.name);
    onAddToCart(product);
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-green-100">
      <CardHeader className="text-center pb-2">
        <div className="text-6xl mb-2 group-hover:scale-110 transition-transform duration-300">
          {product.image}
        </div>
        <CardTitle className="text-green-800">{product.name}</CardTitle>
        <Badge variant="secondary" className="w-fit mx-auto bg-green-100 text-green-700">
          {product.category}
        </Badge>
      </CardHeader>
      
      <CardContent className="text-center">
        <CardDescription className="text-gray-600 mb-3">
          {product.description}
        </CardDescription>
        <div className="text-2xl font-bold text-green-600">
          €{product.price.toFixed(2)}
          <span className="text-sm font-normal text-gray-500 ml-1">/kg</span>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
};