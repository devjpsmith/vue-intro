Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

        <div class="product-image">
            <img :src="image" alt="">
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="onSale">On Sale!</p>
            <p v-show="inventory > 10">In Stock</p>
            <p v-show="inventory <= 10 && inventory > 0">Almost sold out!</p>
            <p v-show="inventory === 0">Out of stock</p>
            <p>Shipping: {{ shipping }}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId"
                class="color-box"
                :style=" { backgroundColor: variant.variantColor }"
                @click="updateProduct(index)"
                >
            </div>

            <button v-on:click="addToCart()" 
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
                >Add To Cart</button>

            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>

        </div>
    </div>`,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            details: [ "80% cotton", "20% polyester", "Gender-neutral" ],
            variants: [{
                variantId: 2234,
                variantColor: 'green',
                variantImage: './assets/vmSocks-green-onWhite.jpg',
                variantInventory: 80,
                variantOnSale: false
            },{
                variantId: 2235,
                variantColor: 'blue',
                variantImage: './assets/vmSocks-blue-onWhite.jpg',
                variantInventory: 2,
                variantOnSale: true
            }],
            cart: 0
        };
    },
    methods: {
        addToCart: function() {
            this.cart++;
            this.variants[this.selectedVariant].variantInventory--;
            this.inStock = this.variants[this.selectedVariant].variantInventory !== 0;
        },
        updateProduct: function(index) {
            this.selectedVariant = index;
        },
    },
    computed: {
        title() { 
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inventory() {
            return this.variants[this.selectedVariant].variantInventory;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantInventory !== 0;    
        },
        onSale() {
            return this.variants[this.selectedVariant].variantOnSale;
        },
        shipping() {
            if (this.premium) {
                return 'free';
            }
            return '$2.99';
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
});

