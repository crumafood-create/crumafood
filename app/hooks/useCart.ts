import { useState } from 'react'

export function useCart() {
  // Añadimos "any[]" para que TypeScript no se queje por ahora
  const [cart, setCart] = useState<any[]>([])

  function addToCart(product: any, quantity: number = 1) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  function getCartSubtotal() {
    return cart.reduce((total, item) => {
      const unitPrice = item.quantity >= 5 ? item.precio_mayoreo : item.precio_menudeo
      return total + unitPrice * item.quantity
    }, 0)
  }

  function isMayoreo() {
    return cart.some((item) => item.quantity >= 5)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    getCartSubtotal,
    isMayoreo,
  }
}