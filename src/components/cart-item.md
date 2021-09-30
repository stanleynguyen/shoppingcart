```jsx
  <div className="bg-gray-50 lg:flex">
    <div className="flex-1">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
          <CartItem
                key={"Bike"}
                title={"Bike"}
                price={938}
                description={"Juice Drink Concept"}
                condition={"new"}
                availability={"single-item"}
                numOfStock={1}
                imageUrl={"https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?ixid=MnwyNDY1NjJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjYyNDYyMDc&ixlib=rb-1.2.1&fit=crop&w=543&h=384&q=80"}
                authed={true}
                onAdd={() => alert(`Item Bike will be added to Cart`)}
            />
        </div>
      </div>
    </div>
  </div>
```
