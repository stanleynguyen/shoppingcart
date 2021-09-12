import * as React from "react"

import ProdItem from "./prod-item";          // list item for each post

const API_URL = "https://ecomm-service.herokuapp.com/marketplace"

export default function ProdForm(props) {

  const PAGESIZE = 9;
  const [page, setPage] = React.useState(1);                 // initialise to page 1
  const [isLoading, setIsLoading] = React.useState(false);

  const pageMvnt = (pmvt) => {
    loadProds(page + pmvt);
    setPage(page + pmvt);  //setPage may not finish updating page soon enough before stPostsPage begin
  }

  const getProds = (val) => 
    fetch(`${API_URL}?page=${val}&limit=${PAGESIZE}`).then((res) =>
      res.json()
  );
    
  const [prods, setProds] = React.useState(undefined);

  const loadProds = (val) => {setIsLoading(true);getProds(val)
            .then((data) => setProds(data))
            .then(() => setIsLoading(false))};

  const [key, setKey] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [description, setDescription] = React.useState('');
  const [condition, setCondition] = React.useState('');
  const [availability, setAvailability] = React.useState('');
  const [numOfStock, setNumOfStock] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState('');

  const titleInputRef = React.useRef();

  const clearForm = (clearAll) => {
    setKey('');
    setTitle('');
    setPrice(0);
    setDescription('');
    setCondition("new");
    setAvailability("in-stock");
    setNumOfStock(0);
    setImageUrl('');
    if (clearAll) {
      setTitle('');
      setDescription('');
    } 
    if (titleInputRef.current) {titleInputRef.current.focus();}
  }

  
  const editProd = (key) => {  // (key) is the key of the prod: pull out the prod from array and put info Form for editing
    let i = 0;
    for (i=0;i<prods.length;i++) {
        if (prods[i]._id === key) {
            setKey(prods[i]._id);
            setTitle(prods[i].title);
            setPrice(prods[i].price);
            setDescription(prods[i].description);
            setCondition(prods[i].condition);
            setAvailability(prods[i].availability);
            if (prods[i].availability === "in-stock") {
                setNumOfStock(prods[i].numOfStock);
            } else {
                setNumOfStock(1);
             }
            setImageUrl(prods[i].imageUrl);
            break;
        }
    }
  };  

  const saveProd = (data) => {   // (data) is the prod from the Form, save it to API
    setIsLoading(true);
    let newProd = {title:data.title, description:data.description, price:data.price, condition:data.condition, 
                   imageUrl:data.imageUrl, availability:data.availability};
    if (data.availability === 'in-stock') {  // numOfStock is optional
        newProd.numOfStock = data.numOfStock;
    }
    if (data._id === "") {    // if key of the prod is empty, this is a new prod...
        fetch(`${API_URL}`, {
            method: "POST",
            body: JSON.stringify(newProd),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()
          .then(() => {
                pageMvnt(0);
           })
        );
    } else {
        fetch(`${API_URL}/${data._id}`, {
            method: "PATCH",
            body: JSON.stringify(newProd),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json()
          .then(() => {
            pageMvnt(0);
          })
        );
    }     
  };  



  const deleProd = (title, id) => {  // (id) is the key to the post, delete the post
      setIsLoading(true);
      if (window.confirm(`Proceed to delete the listing ${title}?`)) {
          fetch(`${API_URL}/${id}`, {
              method: "DELETE",
          }).then((res) => res.json()
          .then(() => {
              pageMvnt(0);
        }));
    }
  };  


    return (
        <div className="bg-gray-50 lg:flex">
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
                            {isLoading?'Loading...':(!prods?'LOAD':`page ${page}`)}
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
                            <ProdItem
                                key={prod._id}
                                title={prod.title}
                                price={prod.price}
                                description={prod.description}
                                condition={prod.condition}
                                availability={prod.availability}
                                numOfStock={prod.numOfStock}
                                imageUrl={prod.imageUrl}
                                onEdit={() => editProd(prod._id)}
                                onDele={() => deleProd(prod.title,prod._id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
                <form id="prod-form" className="flex flex-col h-full" 
                    onSubmit={
                        (ev) => {
                        ev.preventDefault();
                        saveProd({_id:key, title, price, description, condition, availability, numOfStock, imageUrl});
                        clearForm(false);
                        }
                    }>
                    <div className="py-6 px-4 bg-pink-700 sm:px-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium text-white">New Listing</h2>
                        </div>
                        <div className="mt-1">
                            <p className="text-sm text-pink-300">
                                Get started by filling in the information below to create your new listing.
                            </p>
                        </div>
                    </div>
                    <div className="px-4 sm:px-6 pb-12">
                        <div className="space-y-6 pt-6 pb-5">
                            <input type="text" name="key" id="key" readOnly hidden value={key} />

                            <div>
                                <label for="listing-title" className="block text-sm font-medium text-gray-900">
                                    Title
                                </label>
                                <div className="mt-1">
                                    <input type="text" name="listing-title" id="listing-title" required className="
                                            block
                                            w-full
                                            shadow-sm
                                            sm:text-sm
                                            focus:ring-pink-500 focus:border-pink-500
                                            border-gray-300
                                            rounded-md
                                        "
                                        value={title} ref={titleInputRef}
                                        onChange={(ev) => {setTitle(ev.target.value)}} />
                                </div>
                            </div>

                            <div>
                                <label for="listing-price" className="block text-sm font-medium text-gray-900">
                                    Price
                                </label>
                                <div className="mt-1">
                                    <input type="number" name="listing-price" id="listing-price" required="" className="
                                            block
                                            w-full
                                            shadow-sm
                                            sm:text-sm
                                            focus:ring-pink-500 focus:border-pink-500
                                            border-gray-300
                                            rounded-md
                                        "
                                        value={price}
                                        onChange={(ev) => {setPrice(Number(ev.target.value))}} />
                                </div>
                            </div>
                            <div>
                                <label for="description" className="block text-sm font-medium text-gray-900">Description</label>
                                <div className="mt-1">
                                    <textarea id="description" name="description" rows="4" required="" className="
                                            block
                                            w-full
                                            shadow-sm
                                            sm:text-sm
                                            focus:ring-pink-500 focus:border-pink-500
                                            border border-gray-300
                                            rounded-md
                                            " value={description} 
                                        onChange={(ev) => {setDescription(ev.target.value)}}></textarea>
                                </div>
                            </div>
                            <div>
                                <label for="listing-condition" className="block text-sm font-medium text-gray-900">
                                    Condition
                                </label>
                                <div className="mt-1">
                                    <select id="listing-condition" name="listing-condition" required="" className="
                                                block
                                                w-full
                                                pl-3
                                                pr-10
                                                py-2
                                                text-base
                                                border-gray-300
                                                focus:outline-none
                                                focus:ring-pink-500
                                                focus:border-pink-500
                                                sm:text-sm
                                                rounded-md
                                            " value={condition} 
                                            onChange={(ev) => {setCondition(ev.target.value)}} >
                                        <option value="new">New</option>
                                        <option value="used_like-new">Used (like new)</option>
                                        <option value="used_good">Used (good)</option>
                                        <option value="used_fair">Used (fair)</option>
                                    </select>
                                </div>
                            </div>


                            <div>
                                <label for="listing-availability" className="block text-sm font-medium text-gray-900">
                                    Availability
                                </label>
                                <div className="mt-1">
                                    <select id="listing-availability" name="listing-availability" required="" className="
                                                block
                                                w-full
                                                pl-3
                                                pr-10
                                                py-2
                                                text-base
                                                border-gray-300
                                                focus:outline-none
                                                focus:ring-pink-500
                                                focus:border-pink-500
                                                sm:text-sm
                                                rounded-md
                                            " value={availability} 
                                            onChange={(ev) => {setAvailability(ev.target.value)}} >
                                        <option value="in-stock">In Stock</option>
                                        <option value="single-item">Single Item</option>
                                    </select>
                                </div>
                            </div>

                            {availability!=='single-item' && (<div>
                                <label for="num-of-stock" className="block text-sm font-medium text-gray-900">
                                    Number of Available Stock
                                </label>
                                <div className="mt-1">
                                    <input type="number" name="num-of-stock" id="num-of-stock" required="" className="
                                            block
                                            w-full
                                            shadow-sm
                                            sm:text-sm
                                            focus:ring-pink-500 focus:border-pink-500
                                            border-gray-300
                                            rounded-md
                                        "
                                        value={numOfStock}
                                        onChange={(ev) => {setNumOfStock(Number(ev.target.value))}} />
                                </div>
                            </div>)}

                            <div>
                                <label for="listing-imageUrl" className="block text-sm font-medium text-gray-900">
                                    Image Url
                                </label>
                                <div className="mt-1">
                                    <input type="text" name="listing-imageUrl" id="listing-imageUrl" required className="
                                            block
                                            w-full
                                            shadow-sm
                                            sm:text-sm
                                            focus:ring-pink-500 focus:border-pink-500
                                            border-gray-300
                                            rounded-md
                                        "
                                        value={imageUrl}
                                        onChange={(ev) => {setImageUrl(ev.target.value)}} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="
                            flex-shrink-0
                            px-4
                            py-4
                            flex
                            justify-end
                            border-t border-gray-200
                        ">
                        <button onClick={(ev) => {ev.preventDefault(); clearForm(true);}}
                            className=" inline-flex
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
                            CLEAR
                        </button>

                        <button type="submit" className="
                                ml-4
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
                          {key===''?'ADD':'UPDATE'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}
