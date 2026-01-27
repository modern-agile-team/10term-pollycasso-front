import { useCart } from '@/features/cart';
import { ShopSidebar, ShopProductList, ShopProfilePanel } from '@/widgets/shop';

const ShopPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-center w-full min-h-screen gap-[24px] font-ssrm font-bold">
      <ShopSidebar />

      <ShopProductList cart={cart} onAddToCart={addToCart} />

      <ShopProfilePanel cart={cart} onRemoveFromCart={removeFromCart} />
    </div>
  );
};

export default ShopPage;
