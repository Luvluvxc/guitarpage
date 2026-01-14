import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState } from 'react'
import { db } from "./data/db";

function App() {

	const [data, setData] = useState(db)
	const [cart, setCart] = useState([])

	//verificar 
	function addToCart(item) {
		const itemExists = cart.findIndex((guitar) => guitar.id === item.id)
		if (itemExists >= 0) {
			const updateCart = [...cart];
			updateCart[itemExists].quantity++;
			setCart(updateCart)
		} else {
			setCart([...cart, { ...item, quantity: 1 }])
		}
		
	}

	function removeFromCart(id) {
		setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))	
	}

	function increaseQuantity(id) {
		setCart(prevCart => prevCart.map(item =>
			item.id === id && item.quantity < 5 ?
			//...item = “todo igual, excepto lo que cambie después”.
				{ ...item, quantity: item.quantity + 1}
				: item
		)
		);
			
	}


	function decreaseQuantity(id) {
  setCart(prevCart =>
    prevCart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0)
  );
}
 
 

  return (
    <>
			<Header
				cart={cart}
				removeFromCart={removeFromCart}
				increaseQuantity={increaseQuantity}
				decreaseQuantity={decreaseQuantity}
			/>

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

				<div className="row mt-5">
					{data.map((guitar) => (
						<Guitar
							key={guitar.id}
							guitar={guitar}
							addToCart={addToCart}
						/>
					)
					)}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
