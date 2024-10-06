import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, Text, StyleSheet, ScrollView, Modal } from 'react-native';
import CustomBottomNavbar from '@/components/BottomNavbar';

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
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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

const Shopping = ({ products, onSearch, query }) => {
  const [searchQuery, setSearchQuery] = useState(query);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      const updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
      setCart(updatedCart);
    } else {
      const newCart = [...cart, { id: product.id, name: product.name, price: product.price, qty: 1 }];
      setCart(newCart);
    }
    setShowCart(true);
    setSelectedProduct(null);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => setSelectedProduct(item)}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderProductDetails = () => {
    if (!selectedProduct) return null;

    return (
        <View style={styles.productDetailInfo}>
        <Image source={{ uri: selectedProduct.image }} style={styles.productDetailImage} />
          <Text style={styles.productName}>{selectedProduct.name}</Text>
          <Text style={styles.productDescription}>{selectedProduct.description}</Text>
          <Text style={styles.productPrice}>${selectedProduct.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(selectedProduct)}
          >
            <Text style={styles.addToCartText}>
              Add to Cart ({cart.reduce((total, item) => total + item.qty, 0)})
            </Text>
          </TouchableOpacity>
        </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          {/* Only show search input when no product is selected */}
          {!selectedProduct && (
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
          )}
        </View>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2} // Display two products per row
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false} // Disable vertical scroll indicator
          showsHorizontalScrollIndicator={false} // Disable horizontal scroll indicator
        />
        {renderProductDetails()}
        {showCart && (
        <Cart
          cart={cart}
          products={products}
          hideCart={() => setShowCart(false)}
          show={showCart}
          increaseQty={(id) => addToCart(products.find(p => p.id === id))}
          decreaseQty={(id) => setCart(cart.map(item =>
            item.id === id ? { ...item, qty: item.qty > 1 ? item.qty - 1 : item.qty } : item
          ))}
          clearCart={() => setCart([])}
        />
      )}
      </View>
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
    width: '100%',
  },
  searchInput: {
    height: 40,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  productList: {
    flexGrow: 1,
    overflow:'hidden',
    width: '100%',
    paddingBottom: 90,
  },
  productContainer: {
    marginTop: 20,
    borderRadius: 8,
    width: '48%', // Adjust width for two columns
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 16,
    marginRight: '2%', // Optional: add some spacing
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productDetails: {
    padding: 8,
  },
  productDetailImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productDetailsContainer: {
    marginBottom: 90,
    paddingBottom: 100,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 0,
  },
  productDetailInfo: {
    paddingBottom: 100,
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 14,
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  addToCartButton: {
    padding: 10,
    backgroundColor: 'black',
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'flex-end',
  },
  cartContainer: {
    backgroundColor: 'white',
    height: '50%',
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
    color: 'black',
    fontSize: 14,
  },
  scrollView: {
    maxHeight: '60%',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  qty: {
    fontSize: 16,
    width: 30,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Shopping;
