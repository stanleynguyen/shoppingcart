import * as React from "react"
import { LoginForm, useAuthState } from "../domains/auth";

import CartItem from "./cart-item"; 
import CartLine from "./cart-line"; 

const API_URL = "https://ecomm-service.herokuapp.com/marketplace"

export default function CartPage(props) {
  // const { page, setPage, jobs } = useJobs();
  const auth = useAuthState();
  
  const PAGESIZE = 6;
  const [page, setPage] = React.useState(1);                 // initialise to page 1
  const [isLoading, setIsLoading] = React.useState(false);
  const [cartTotal, setCartTotal] = React.useState(0);

  const pageMvnt = (pmvt) => {
    loadProds(page + pmvt);
    setPage(page + pmvt);  //setPage may not finish updating page soon enough before stPostsPage begin
  }

  const getProds = (val) => 
    fetch(`${API_URL}?page=${val}&limit=${PAGESIZE}`).then((res) =>
      res.json()
  );

  const getLines = () => 
    fetch(`${API_URL}/cart/items`, {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error(res.statusText);
    });

    React.useEffect(() => {
        if (auth.status === "authenticated") {
            getLines().then((data) => setLines(data));
        } else {
            setLines([]);
        }
    },[auth.status]);


  const [prods, setProds] = React.useState([]);
  const [lines, setLines] = React.useState([]);

  
  React.useEffect(() => {
    console.log(lines);
    prods.forEach(prod => {
        console.log(prod);
        prod.canAdd = true
        const inCart = lines.filter(line => line.listing._id === prod._id).map(line => [line.listing._id, line.quantity]);
        console.log(inCart);
        if (inCart.length === 1) {
            if (prod.availability === 'single-item') {
                prod.canAdd = false
            } else {
                if ((prod.availability === 'in-stock') && (prod.numOfStock <= inCart[0][1])) {
                    prod.canAdd = false
                }
            }
        };
    });
},[lines, prods]);

      
  React.useEffect(() => {
    setCartTotal(lines.map(line => line.listing.price * line.quantity).reduce((prev, curr) => prev + curr,0))
},[lines]);

  const loadProds = (val) => {
      setIsLoading(true);
      getProds(val)
      .then((data) => setProds(data))
      .then(() => setIsLoading(false))};


  const deleLine = (id) => {  // (id) is the key to the post, delete the post
    fetch(`${API_URL}/cart/items/${id}`, {
        method: "DELETE",
        headers: {
            accept: "application/json",
                "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
        },
    })
    .then((res) => {
        if (res.ok) {
        return res.json();
        }
        throw new Error(res.statusText);
    })
    .then(() => getLines().then((data) => setLines(data)
    ));
  };  


const add2Cart = (id) => {  // (id) is the key to the post, delete the post
    fetch(`${API_URL}/cart/items`, {
        method: "POST",
        body: JSON.stringify({
            listingId: id,
            quantity: 1
        }),
        headers: {
            accept: "application/json",
                "Content-Type": "application/json",
            Authorization: `Bearer ${auth.accessToken}`,
        },
    })
    .then((res) => {
        if (res.ok) {
        return res.json();
        }
        throw new Error(res.statusText);
    })
    .then(() => getLines().then((data) => setLines(data)
    ));
};  


    return (
        <div className="bg-gray-50 lg:flex">
            {auth.status === "anonymous" && (
                <LoginForm
                onSuccess={(accessToken) => {
                    auth.login(accessToken);
                }}
                />
            )}

            <div className="flex-1">
                <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:flex-col sm:align-center mb-12">
                        <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Marketplace</h1>
                    </div>

                    <div id="pagination-btns" className="flex justify-between items-center">
                        <button id="prev-btn" type="button"
                            disabled={isLoading || page===1} 
                            onClick={() => {pageMvnt(-1);}}
                                className="
                                inline-flex
                                justify-center
                                py-2
                                px-4
                                border border-transparent
                                shadow-sm
                                text-sm
                                font-medium
                                rounded-md
                                text-white
                                bg-pink-600
                                hover:bg-pink-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-pink-500
                                ">
                            {isLoading?"Loading...":"Previous"}
                        </button>
                        <button id="page-num" type="button" 
                            disabled={isLoading} 
                            onClick={() => {pageMvnt(0);}}
                            className="
                                inline-flex
                                justify-center
                                py-2
                                px-4
                                border border-solid
                                shadow-sm
                                text-sm
                                font-medium
                                rounded-md
                                text-pink
                                bg-white-600
                                hover:bg-pink-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-pink-500
                                ">
                            {isLoading?'Loading...':(!prods?'LOAD':`Page ${page}`)}
                        </button>
                        <button id="next-btn" type="button" 
                            disabled={isLoading} 
                            onClick={() => {pageMvnt(1);}}
                            className="
                                inline-flex
                                justify-center
                                py-2
                                px-4
                                border border-transparent
                                shadow-sm
                                text-sm
                                font-medium
                                rounded-md
                                text-white
                                bg-pink-600
                                hover:bg-pink-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-pink-500
                                ">
                            {isLoading?"Loading...":"Next"}
                        </button>
                    </div>
                    <div className="
                            grid
                            md:grid-cols-2
                            gap-x-4 gap-y-8
                            xl:grid-cols-3 xl:gap-x-6
                            ">
                        {prods && prods.map((prod) => (
                            <CartItem
                                key={prod._id}
                                title={prod.title}
                                price={prod.price}
                                description={prod.description}
                                condition={prod.condition}
                                availability={prod.availability}
                                numOfStock={prod.numOfStock}
                                imageUrl={prod.imageUrl}
                                authed={auth.status==='authenticated' && prod.canAdd}
                                onAdd={() => add2Cart(prod._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>


            {auth.status === "authenticated" && (
            <div className="
                    flex-initial
                    bg-white
                    w-full
                    lg:max-w-md
                    border-b border-gray-100
                    ">
                <div className="flex flex-col h-full">
                    <div className="py-6 px-4 bg-pink-700 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-white">Your shopping cart</h2>
                        </div>
                        <div className="mt-1">
                            <p className="text-sm text-pink-300">Listing added into your shopping cart</p>
                        </div>
                    </div>

                    <ul id="cart-item-list" className="divide-y divide-gray-200">
                        {lines && lines.map((line) => (
                            <CartLine
                                key={line.listing._id}
                                title={line.listing.title}
                                imageUrl={line.listing.imageUrl}
                                price={line.listing.price}
                                quantity={line.quantity}
                                amount={line.listing.price * line.quantity}
                                onDele={() => deleLine(line.listing._id)}
                            />))}
                    </ul>
                    {lines.length!==0 && (
                    <div className="
                            flex-shrink-0
                            px-4
                            py-4
                            flex
                            justify-end
                            border-t border-gray-200
                            ">
                        <span>Total <span className="text-3xl">$<span>{cartTotal}</span></span></span>
                    </div>
                    )}
                    {lines.length===0 && (
                    <div className="px-4 sm:px-6 pb-12">
                        <div className="pt-6 pb-5">
                            <div id="no-cart-item-message">
                                <div className="p-4 text-center">
                                    <svg className="inline-block w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                </div>
                                <p className="text-center text-gray-500">There is no item in your shopping cart.</p>
                            </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>)}            
        </div>
    )
}
