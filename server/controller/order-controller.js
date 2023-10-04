import Orders from "../model/order-schema.js";


export const getOrders = async (request, response) => {
    try {
        const orders = await Orders.find({});
        console.log('getod',orders);
        response.status(200).json(orders);
    }catch (error) {
        response.status(500).json({message: error.message});
    }
}
const orderExample = {
  id: "123456789",
  username: "john_doe",
  status: "pending",
  products: [
      {
          title: "Product 1",
          quantity: 2,
          price: 19.99,
          description: "Description of Product 1",
          url: "https://example.com/product1",
          detailUrl: "https://example.com/product1/details"
      },
      {
          title: "Product 2",
          quantity: 1,
          price: 29.99,
          description: "Description of Product 2",
          url: "https://example.com/product2",
          detailUrl: "https://example.com/product2/details"
      }
  ]
};

const exp2= {
  id: "order18",
  username: "krushi_14",
  status: "Placed",
  products: [
      {
          "url": "https://rukminim2.flixcart.com/image/312/312/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70",
          "detailUrl": "https://rukminim2.flixcart.com/image/416/416/jfbfde80/camera/n/r/n/canon-eos-eos-3000d-dslr-original-imaf3t5h9yuyc5zu.jpeg?q=70",
          "title": {
              "shortTitle": "camera",
              "longTitle": "Canon EOS 3000D DSLR Camera 1 Camera Body, 18 - 55 mm Lens  (Black)"
          },
          "quantity": 1,
          "price": 33490,
          "description": "Self-Timer, Type C and Mini HDMI, 9 Auto Focus Points, 3x Optical Zoom, WiFi, Full HD, Video Recording at 1080 p on 30fps, APS-C CMOS sensor-which is 25 times larger than a typical Smartphone sensor"
      }
  ]
}


export const placeOrder = async (request, response) => {
  try {
    const orderData = request.body;
console.log("orderData",orderData[0]);
    if (!orderData) {
      return response.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Orders(orderData);
    console.log('new od',newOrder);
    await newOrder.save();

    response.status(201).json(newOrder);
  } catch (error) {
    console.error("Error placing order:", error);
    response.status(500).json({ message: "Internal server error" });
  }
};
