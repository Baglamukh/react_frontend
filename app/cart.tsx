import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal } from 'react-native';

const Cart = ({ cart, products, increaseQty, decreaseQty, clearCart, hideCart, show }) => {
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.qty * getProductById(item.id).price, 0);
  };

  const getProductById = (productId) => {
    return products.find(product => product.id === productId);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={hideCart}
    >
      <View style={styles.overlay}>
        <View style={styles.cartContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Cart</Text>
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearButton}>Clear Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.clearButton}>Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideCart}>
              <Text style={styles.clearButton}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.scrollView}>
            {cart.map(item => (
              <View key={item.id} style={styles.itemContainer}>
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    ${item.price.toFixed(2)} x {item.qty}
                  </Text>
                </View>
                <View style={styles.qtyControls}>
                  <TouchableOpacity onPress={() => decreaseQty(item.id)}>
                    <Text style={styles.qtyButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.qty}</Text>
                  <TouchableOpacity onPress={() => increaseQty(item.id)}>
                    <Text style={styles.qtyButton}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  cartContainer: {
    backgroundColor: 'white',
    height: '70%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    color: 'blue',
    fontSize: 14,
  },
  scrollView: {
    maxHeight: '60%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemName: {
    fontWeight: '600',
  },
  itemPrice: {
    color: 'gray',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  qty: {
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  totalText: {
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
