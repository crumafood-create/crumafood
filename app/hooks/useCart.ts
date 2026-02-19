import { useState } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])

  function addToCart(product, quantity = 1) {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  function updateQuantity(id, quantity) {
    if (quantity < 1) return;
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  function getCartSubtotal() {
    return cart.reduce((total, item) => {
      // Aplica precio de mayoreo si hay 5 o más unidades
      const unitPrice = item.quantity >= 5 ? item.precio_mayoreo : item.precio_menudeo
      return total + unitPrice * item.quantity
    }, 0)
  }

  function isMayoreo() {
    return cart.some(item => item.quantity >= 5)
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