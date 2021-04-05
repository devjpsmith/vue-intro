var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        inventory: 3,
        inStock: true,
        image: './assets/vmSocks-green-onWhite.jpg',
        description: 'shit that goes on your feet',
        onSale: false,
        details: [ "80% cotton", "20% polyester", "Gender-neutral" ],
        variants: [{
            variantId: 2234,
            variantColor: 'green',
            variantImage: './assets/vmSocks-green-onWhite.jpg',
        },{
            variantId: 2235,
            variantColor: 'blue',
            variantImage: './assets/vmSocks-blue-onWhite.jpg',
        }],
        cart: 0,
        addToCart: function() {
            this.cart++;
            this.inventory--;
            this.inStock = this.inventory !== 0;
        },
        updateProduct: function(img) {
            this.image = img;
        }
    }
});