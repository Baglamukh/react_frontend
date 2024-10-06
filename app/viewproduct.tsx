import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { products } from './product'; // Ensure this file exports the products array
import Cart from './cart';
import CustomBottomNavbar from '@/components/BottomNavbar';

const ViewProduct = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const route = useRoute();
  const navigation = useNavigation();
  const productId = parseInt(route.params.id);
  const product = products.find(item => item.id === productId);

  console.log(productId)

  if (!product) {
    return <Text>Product not found!</Text>;
  }

  const relatedProducts = product.related.map(id =>
    products.find(item => item.id === id)
  );

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
  };

  const renderProductDetails = () => (
    <View style={styles.productDetails}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>${product.price}</Text>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => addToCart(product)}
        >
          <Text style={styles.addToCartText}>
            Add to Cart ({cart.reduce((total, item) => total + item.qty, 0)})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderRelatedProduct = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('viewproduct', { id: item.id })}>
      <View style={styles.relatedProduct}>
        <Image source={{ uri: item.image }} style={styles.relatedProductImage} />
        <Text style={styles.relatedProductName}>{item.name}</Text>
        <Text style={styles.relatedProductPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <FlatList
        data={[product]} // Pass product as an array to render its details
        renderItem={renderProductDetails}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <View style={styles.insightsContainer}>
              <Text style={styles.insightsTitle}>Astrological Insights</Text>
              <Text style={styles.insightsText}>
                Discover how the Celestial Charm Candle aligns with your astrological needs.
              </Text>
            </View>

            <View style={styles.relatedProductsContainer}>
              <Text style={styles.relatedTitle}>Related Products</Text>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <FlatList
            data={relatedProducts}
            renderItem={renderRelatedProduct}
            keyExtractor={item => item.id.toString()}
            horizontal
          />
        )}
      />

      {showCart && (
        <Cart
          cart={cart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          clearCart={clearCart}
          hideCart={() => setShowCart(false)}
          show={showCart}
        />
      )}
      <CustomBottomNavbar />
    </>
  );
};

const styles = StyleSheet.create({
  // ... your styles here
});

export default ViewProduct;
